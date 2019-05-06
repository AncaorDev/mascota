CREATE TABLE public.beneficio
(
    id_beneficio serial NOT NULL,
    desc_beneficio character varying(60),
    descripcion character varying(200),
	abvr character varying(20),
	imagen character varying(60),
	flg_acti character varying(1),
    CONSTRAINT pk__id_beneficio_01 PRIMARY KEY (id_beneficio)
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public.beneficio_x_animal
(
    _id_beneficio integer NOT NULL,
    _id_animal integer NOT NULL,
    CONSTRAINT pk__beneficio_x_animal_01 PRIMARY KEY (_id_beneficio, _id_animal),
    CONSTRAINT fk___id_beneficio_01 FOREIGN KEY (_id_beneficio)
        REFERENCES public.beneficio (id_beneficio) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk___id_animal_01 FOREIGN KEY (_id_animal)
        REFERENCES public.animal (id_animal) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
);

INSERT
  INTO beneficio
       (desc_beneficio, abvr,imagen,flg_acti)
VALUES
('Pelaje y Piel','pelaje','pelaje_piel.svg','1'),
('Soporte Digestivo','digestivo','estomago.svg','1'),
('Soporte Inmunológico','Inmunológico','diente.svg','1'),
('Soporte Renal','Renal','rinon.svg','1'),
('Heces Mas pequeñas','heces','heces.png','1'),
('Musculos y Huesos fuertes','musculos','musculos_huesos.svg','1'),
('Corazón Sano','corazon','heart.svg','1'),
('Dientes Sanos','dientes','diente.svg','1'),
('Antienvejecimiento','Antienvejecimiento','mascota.svg','1');

INSERT INTO beneficio_x_animal
(_id_beneficio,_id_animal)
SELECT id_beneficio,
		1
FROM beneficio;


ALTER TABLE public.scraper_x_site
    ADD COLUMN descripcion character varying(5000)

ALTER TABLE public.scraper_x_site
    ADD COLUMN key_word character varying(300);


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


