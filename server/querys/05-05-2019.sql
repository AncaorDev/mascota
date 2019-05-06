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
    ADD COLUMN descripcion character varying(500)

ALTER TABLE public.scraper_x_site
    ADD COLUMN key_word character varying(300)

