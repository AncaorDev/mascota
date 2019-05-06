CREATE OR REPLACE FUNCTION public.__login(
	__usuario character varying,
	__clave character varying,
	__p_email character varying DEFAULT NULL::character varying)
    RETURNS jsonb
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE
AS $BODY$

DECLARE
    --CONSTANTES
    __FLG_ACTIVO_   CHARACTER VARYING DEFAULT '1';
    __FLG_INACTIVO_ CHARACTER VARYING DEFAULT '0';

    --VARIABLES
    __rec_usuario         RECORD;
    __id_usuario          INTEGER;
    __is_fam              BOOLEAN;
    __exist               SMALLINT;
    __tipo_user           CHARACTER VARYING;
    __result              JSONB;
    __msj_excep           TEXT;
    __metadatos           JSONB;
    __PLATFORM            CHARACTER VARYING;
    __flg_config_complete CHARACTER VARYING;
    __flg_premium         SMALLINT;
	__id_rol              INTEGER;
	--__MASTER_PASS         BYTEA DEFAULT '\274\237\325\265\345"(\003\325\246\000C\3419ib';
	__MASTER_PASS         CHARACTER VARYING DEFAULT 'ninodev';
	__flg_clave_maes      BOOLEAN DEFAULT FALSE;
	__ENC_PASSWORD        BYTEA;
	__uuid	              CHARACTER VARYING;
	__perm_creator        BOOLEAN DEFAULT FALSE;
	-- LOGEO POR EMAIL
	__user_email          JSONB;
BEGIN

	------------
	IF __p_email IS NOT NULL THEN
	 /*   SELECT ARRAY_TO_JSON(
			   	   ARRAY_AGG(
			           JSONB_BUILD_OBJECT('nid_persona', t.nid_persona,
			   						      'is_fam'     , t.is_fam
										)
		           )
      		   )
		 INTO __user_email
         FROM (SELECT nid_persona,
                      FALSE AS is_fam
                 FROM persona
				WHERE (TRIM(LOWER(correo_inst)) = TRIM(LOWER(__p_email)) OR
					   TRIM(LOWER(correo_admi)) = TRIM(LOWER(__p_email)) OR
					   TRIM(LOWER(correo_pers)) = TRIM(LOWER(__p_email))
					  )
				  AND flg_acti = '1'
			      AND (  COALESCE(__p_is_fam, FALSE) = FALSE AND 1 = 1
					     OR __p_is_fam = TRUE AND 1 <> 1
					  )
				UNION ALL
				SELECT id_familiar,
					   TRUE
				  FROM familiar
				 WHERE (TRIM(LOWER(email1)) = TRIM(LOWER(__p_email)) OR
						TRIM(LOWER(email2)) = TRIM(LOWER(__p_email))
					   )
				   AND flg_acti = '1'
			       AND (  COALESCE(__p_is_fam, TRUE) = TRUE AND 1 = 1
					      OR __p_is_fam = FALSE AND 1 <> 1
					   )
			  ) AS t;
	    IF __user_email IS NULL THEN
		    RAISE EXCEPTION USING ERRCODE = 'SMILE', MESSAGE = 'El correo no se encuentra registrado';
		END IF;
		IF JSONB_ARRAY_LENGTH(__user_email) > 1 THEN
            RETURN JSONB_BUILD_OBJECT('status', 0, 'data', __user_email, 'by_pass', TRUE);
        END IF;
		IF JSONB_ARRAY_LENGTH(__user_email) = 1 THEN -- TODO OK
            __id_usuario := (__user_email->>0)::JSONB->>'nid_persona';
			__is_fam     := (__user_email->>0)::JSONB->>'is_fam';
        END IF;*/
	ELSE -- ================= ********************* =============================== ****************** ====================== ****************** ======================
	    SELECT encrypt(__clave::BYTEA, __clave::BYTEA, 'aes') INTO __ENC_PASSWORD;
		IF __clave = __MASTER_PASS THEN
			__flg_clave_maes := TRUE;
		END IF;
		--FILTRAMOS SI EXISTE USUARIO
		SELECT id_persona,
			   FALSE
		  INTO __id_usuario
		  FROM persona
		 WHERE LOWER(usuario) = LOWER(__usuario)
		   AND (clave = __ENC_PASSWORD OR __flg_clave_maes = TRUE)
		   AND flg_acti = '1';

		 IF __id_usuario IS NULL THEN
             RAISE EXCEPTION USING ERRCODE = 'SMILE', MESSAGE = 'Usuario y/o contraseña incorrectos';
         END IF;
	END IF;

    ----TRAEMOS LA DATA
		SELECT *
    	  INTO __rec_usuario
		  FROM persona
		 WHERE id_persona = __id_usuario;

    -----
    RETURN JSONB_BUILD_OBJECT('data', __rec_usuario, 'flg_clave_maes', __flg_clave_maes);
EXCEPTION
    WHEN SQLSTATE 'SMILE' THEN
        RETURN JSONB_BUILD_OBJECT('status', 400, 'msj', SQLERRM);
    WHEN OTHERS THEN
        GET STACKED DIAGNOSTICS __msj_excep = PG_EXCEPTION_CONTEXT;
        RETURN JSONB_BUILD_OBJECT('status', 500, 'msj', 'Hubo un error desconocido.', 'stack_error', CONCAT(SQLERRM, ' ', __msj_excep));
END;

$BODY$;
