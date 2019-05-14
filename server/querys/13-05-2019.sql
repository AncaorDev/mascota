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