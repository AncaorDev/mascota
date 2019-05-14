-- Extensión para encriptar
create extension pgcrypto;
-- Verificar si ya tienes la extension activa
select * from pg_available_extensions;



-- FUNCTION: public.trg_crypt_users_pass()

-- DROP FUNCTION public.trg_crypt_users_pass();

CREATE FUNCTION public.trg_crypt_users_pass()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF 
AS $BODY$

DECLARE
BEGIN
   -- If New.clave <> Old.clave Then
      New.clave := encrypt(New.clave,New.clave,'aes');
   -- End If;
    RETURN New;
END;

$BODY$;

CREATE TRIGGER tr_clave
    BEFORE INSERT OR UPDATE OF clave
    ON public.persona
    FOR EACH ROW
    EXECUTE PROCEDURE public.trg_crypt_users_pass();



CREATE OR REPLACE FUNCTION __auth__01_registrar_usuario(
	__datos JSONB)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$


DECLARE
--CONSTANTES
	__MSJ_INSERT       CONSTANT CHARACTER VARYING DEFAULT 'Se registró';
	__MSJ_ERROR        CONSTANT CHARACTER VARYING DEFAULT 'Hubo un problema';

--VARIABLES
    __result          JSONB;
    __msj_excep       CHARACTER VARYING;
	__nom_persona CHARACTER VARYING;
	__ape_pate_pers CHARACTER VARYING;
	__ape_mate_pers CHARACTER VARYING;
	__username CHARACTER VARYING;
	__password CHARACTER VARYING;
	__affected_rows    INTEGER;

BEGIN
	-- Datos
		__nom_persona   := __datos->>'nom_persona';
		__ape_pate_pers := __datos->>'ape_pate_pers';
		__ape_mate_pers := __datos->>'ape_mate_pers';
		__username      := __datos->>'username';
		__password      := __datos->>'password';
		
	-- Insertar
		INSERT INTO PERSONA
					(nom_persona   , ape_pate_pers   , ape_mate_pers   , usuario    , clave)
			 VALUES (__nom_persona , __ape_pate_pers , __ape_mate_pers , __username , (__password)::BYTEA);
		GET DIAGNOSTICS __affected_rows = ROW_COUNT;
		
		IF __affected_rows = 0 THEN
			RAISE EXCEPTION USING ERRCODE = 'MASCO', MESSAGE = 'No se puedo insertar';
		END IF;
		
	--Respuesta
		__result := JSONB_BUILD_OBJECT(
			'msj' , __MSJ_INSERT
		);
    RETURN __result;
EXCEPTION
    WHEN SQLSTATE 'MASCO' THEN
        __result = JSONB_BUILD_OBJECT('status', 400, 'msj' , __MSJ_ERROR, 'stack_error', SQLERRM);
        RETURN __result;
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msj_excep = PG_EXCEPTION_CONTEXT;
        __result = JSONB_BUILD_OBJECT('status', 500, 'msj' , __MSJ_ERROR, 'stack_error' , CONCAT(SQLERRM,' - ',__msj_excep));
        RETURN __result;
END;

$BODY$;
