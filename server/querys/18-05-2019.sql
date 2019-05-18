CREATE OR REPLACE FUNCTION public.__func_01_get_data_scraper(
	__id_mascota INTEGER,
	__recomendacion INTEGER,
	__filtros JSONB
	)
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
	   )
	   SELECT ARRAY_TO_JSON(ARRAY_AGG(tab))::JSONB
		 INTO __data
		 FROM datos_filtrados tab;
	-- Combos por data de scrapper
		__combos := JSONB_BUILD_OBJECT(
			'mascas', '[]'::JSONB,
			'webs', '[]'::JSONB
		);
	-- Respuesta
		__result := JSONB_BUILD_OBJECT(
			'data', __data,
			'combos' , __combos
		);
    RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'MASCO' THEN
        RETURN JSONB_BUILD_OBJECT('status', 400, 'msj', SQLERRM);
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msj_excep = PG_EXCEPTION_CONTEXT;
        RETURN JSONB_BUILD_OBJECT('status', 500, 'msj', 'Hubo un error desconocido.', 'stack_error', CONCAT(SQLERRM, ' ', __msj_excep));
END;

$BODY$;
