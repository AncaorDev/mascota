CREATE OR REPLACE FUNCTION public.__get_arry_nombre_mark(
	__nombre character varying,
	__values character varying[])
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$

DECLARE
	--CONSTANTES
		__MSJ_ERROR CONSTANT CHARACTER VARYING DEFAULT 'Hubo un error';

	--VARIABLES
	__result    JSONB;
	__msj_excep CHARACTER VARYING;
	__nombre_mark JSONB;
	__rec character varying;
	
	

BEGIN
	-- Marcar en la cadena las coincidencias encontradas
		FOR __rec IN 
			SELECT UNNEST(__values)
		LOOP
			SELECT regexp_replace(
					__nombre,
					__rec,
					CONCAT('|',__rec,'|')
				   )
			  INTO __nombre;

		END LOOP;
	-- Armar el array de json con con un flg para marcar esas coincidencias
		SELECT ARRAY_TO_JSON(
			       ARRAY_AGG(
				       JSONB_BUILD_OBJECT(
						   'desc', tab.desc,
						   'flg_mark', (CASE WHEN tab.desc = ANY(__values) THEN TRUE ELSE FALSE END)
					   )
				   )
			   )::JSONB
		  INTO __nombre_mark
		  FROM (SELECT UNNEST((STRING_TO_ARRAY(__nombre,'|'))) AS desc) tab;
	
	__result := COALESCE(__nombre_mark,'[]'::JSONB);
	RETURN __result;
EXCEPTION
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msj_excep = PG_EXCEPTION_CONTEXT;
        __result := COALESCE(__nombre_mark,'[]'::JSONB);
        RETURN __result;  
END;

$BODY$;
