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
		__select_recomendacion TEXT[];
		__edad INTEGER;
BEGIN
	-- Datos
		__select_recomendacion := CONCAT('{',__filtros->>'selected','}')::TEXT[];
		__edad := (__filtros->>'age')::INTEGER;
	-- Datos por recomendación
		WITH scraper AS (
			SELECT sxs.*
		  	  FROM scraper_x_site sxs,
			      (SELECT UNNEST(__select_recomendacion) AS rec) tab
		     WHERE LOWER(sxs.nombre) ILIKE LOWER(CONCAT('%',tab.rec,'%')) OR LOWER(sxs.descripcion) ILIKE LOWER(CONCAT('%',tab.rec,'%'))
	   ), datos_filtrados AS(
			SELECT *,
				  (SELECT __get_arry_nombre_mark(LOWER(s.nombre),(SELECT ARRAY_AGG(LOWER(tab.val))::CHARACTER VARYING[]
																	FROM (SELECT UNNEST(__select_recomendacion || (SELECT tags::TEXT[]
																													 FROM edades
																													WHERE _id_animal  = __id_mascota
																													  AND correlativo = __edad)
																				 ) AS val
																		 ) tab
																 )
												)
				  ) AS arry_nombre,
				  (SELECT __get_arry_nombre_mark(LOWER(s.descripcion),(SELECT ARRAY_AGG(LOWER(tab.val))::CHARACTER VARYING[]
																		 FROM (SELECT UNNEST(__select_recomendacion || (SELECT tags::TEXT[]
																														  FROM edades
																														 WHERE _id_animal  = __id_mascota
																														   AND correlativo = __edad)
																					  ) AS val
																			  ) tab
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
	   ), marcas AS (
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
	   ), webs AS (
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
		          'data'   , (SELECT * FROM data_scraper),
		          'marcas' , (SELECT * FROM marcas),
		          'webs'   , (SELECT * FROM webs)
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