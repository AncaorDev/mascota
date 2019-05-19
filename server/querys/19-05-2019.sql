CREATE TABLE public.recomendacion
(
    id_recomendacion serial NOT NULL,
    desc_recomendacion character varying NOT NULL,
    img_recomendacion character varying,
    class_recomendacion character varying,
    id_sec_recomedacion integer,
    PRIMARY KEY (id_recomendacion)
)
WITH (
    OIDS = FALSE
);

INSERT INTO recomendacion (desc_recomendacion, img_recomendacion, class_recomendacion, id_sec_recomedacion)
                   VALUES ('Sabor'           , 'sabor.png'      , 'card__top'        , 2),
				          ('Beneficios'      , 'beneficios.png' , ''                 , 3),
						  ('Costos'          , 'money.png'      , 'card__bottom'     , 4);



ALTER TABLE public.alimento
 ADD COLUMN tags CHARACTER VARYING[];

ALTER TABLE public.raza
 ADD COLUMN tags CHARACTER VARYING[];

ALTER TABLE public.size
 ADD COLUMN tags CHARACTER VARYING[];

CREATE OR REPLACE FUNCTION public.__func_01_get_data_scraper(
	__id_mascota integer,
	__recomendacion integer,
	__filtros jsonb)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
    --CONSTANTES
		__FLG_ACTI        CHARACTER VARYING DEFAULT '1';
		__FLG_INACTI      CHARACTER VARYING DEFAULT '0';
		__RECOM_SABOR     INTEGER           DEFAULT 1;
		__RECOM_BENEFICIO INTEGER           DEFAULT 2;
		__RECOM_COSTO     INTEGER           DEFAULT 3;

    --VARIABLES
		__result              JSONB;
		__msj_excep           TEXT;
		__data                JSONB;
		__combos              JSONB;
		__select_recomendacion CHARACTER VARYING[];
		__tag_feeding CHARACTER VARYING[];
        __tag_race CHARACTER VARYING[];
        __tag_size CHARACTER VARYING[];
        __tag_age CHARACTER VARYING[];
BEGIN
	-- Datos
		__select_recomendacion := CONCAT('{',__filtros->>'selected','}')::CHARACTER VARYING[];
		-- TAG DE EDADES
			SELECT COALESCE(tags,'{}'::CHARACTER VARYING[])
			  INTO __tag_age
			  FROM edades
			 WHERE _id_animal  = __id_mascota
			   AND correlativo = (__filtros->>'age')::INTEGER;
		-- TAG DE ALIMENTACION
			SELECT COALESCE(tags,'{}'::CHARACTER VARYING[])
			  INTO __tag_feeding
			  FROM alimento
			 WHERE _id_animal  = __id_mascota
			   AND correlativo = (__filtros->>'feeding')::INTEGER;
		-- TAG DE RAZA
			SELECT COALESCE(tags,'{}'::CHARACTER VARYING[])
			  INTO __tag_race
			  FROM raza
			 WHERE _id_animal  = __id_mascota
			   AND correlativo = (__filtros->>'race')::INTEGER;
		-- TAG DE TAMAÑO
			SELECT COALESCE(tags,'{}'::CHARACTER VARYING[])
			  INTO __tag_size
			  FROM size
			 WHERE _id_animal  = __id_mascota
			   AND correlativo = (__filtros->>'size')::INTEGER;
	-- Datos por recomendación
		WITH scraper AS (
			WITH filtro_1 AS (
				SELECT sxs.*
		  	  	  FROM scraper_x_site sxs,
			           (SELECT UNNEST(__select_recomendacion) AS rec) tab
		     	 WHERE LOWER(sxs.nombre) ILIKE LOWER(CONCAT('%',tab.rec,'%')) OR LOWER(sxs.descripcion) ILIKE LOWER(CONCAT('%',tab.rec,'%'))
			), filtro_2 AS (
				SELECT *
	              FROM filtro_1
                 WHERE TRUE = ((SELECT __func_02_exist_value_in_tags(LOWER(nombre), __tag_age)) OR (SELECT __func_02_exist_value_in_tags(LOWER(descripcion), __tag_age)))
			), filtro_3 AS (
				SELECT *
	              FROM filtro_2
                 WHERE TRUE = ((SELECT __func_02_exist_value_in_tags(LOWER(nombre), __tag_feeding)) OR (SELECT __func_02_exist_value_in_tags(LOWER(descripcion), __tag_feeding)))
			), filtro_4 AS (
				SELECT *
	              FROM filtro_3
                 WHERE TRUE = ((SELECT __func_02_exist_value_in_tags(LOWER(nombre), __tag_race)) OR (SELECT __func_02_exist_value_in_tags(LOWER(descripcion), __tag_race)))
			)
			SELECT *
	          FROM filtro_4
             WHERE TRUE = ((SELECT __func_02_exist_value_in_tags(LOWER(nombre), __tag_size)) OR (SELECT __func_02_exist_value_in_tags(LOWER(descripcion), __tag_size)))
		    
	   ), datos_filtrados AS(
			SELECT *,
				  (SELECT __get_arry_nombre_mark(LOWER(s.nombre),(SELECT ARRAY_AGG(LOWER(tab.val))::CHARACTER VARYING[]
																	FROM (SELECT UNNEST(__select_recomendacion || __tag_age || __tag_feeding || __tag_race || __tag_size) AS val) tab
																 )
												)
				  ) AS arry_nombre,
				  (SELECT __get_arry_nombre_mark(LOWER(s.descripcion),(SELECT ARRAY_AGG(LOWER(tab.val))::CHARACTER VARYING[]
																	     FROM (SELECT UNNEST(__select_recomendacion || __tag_age || __tag_feeding || __tag_race || __tag_size) AS val) tab
																      )
												)
				  ) AS arry_descrip,
				  st.desc_site
			 FROM scraper s,
				  site st
			WHERE st.id_site = s._id_site
	   ), data_scraper AS (
		   SELECT ARRAY_TO_JSON(ARRAY_AGG(tab))::JSONB
		     FROM datos_filtrados tab
	   ), webs AS (
			WITH desc_sites AS(
			 SELECT s.desc_site
			  FROM site s,
			       scraper sc
			 WHERE s.id_site = sc._id_site
			 GROUP BY s.desc_site
			 ORDER BY s.desc_site
			)
			SELECT ARRAY_AGG(tab.desc_site)
			  FROM desc_sites tab
	   ), marcas AS (
		   WITH desc_marcas AS(
			 SELECT marca
			   FROM scraper
			  GROUP BY marca
			  ORDER BY marca
			)
			SELECT ARRAY_AGG(tab.marca)
			  FROM desc_marcas tab
	   )
	   SELECT JSONB_BUILD_OBJECT(
		          'data'   , COALESCE((SELECT * FROM data_scraper), '[]'::JSONB),
		          'marcas' , COALESCE((SELECT * FROM marcas), '{}'::TEXT[]),
		          'webs'   , COALESCE((SELECT * FROM webs), '{}'::TEXT[])
	        )
	   INTO __result;
	
    RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'MASCO' THEN
        RETURN JSONB_BUILD_OBJECT('status', 400, 'msj', SQLERRM);
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msj_excep = PG_EXCEPTION_CONTEXT;
        RETURN JSONB_BUILD_OBJECT('status', 500, 'msj', 'Hubo un error desconocido.', 'stack_error', CONCAT(SQLERRM, ' ', __msj_excep));
END;

$BODY$;