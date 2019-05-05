CREATE TABLE public.sabor
(
    id_sabor serial NOT NULL,
    desc_sabor character varying(60),
    descripcion character varying(200),
	abvr character varying(20),
	imagen character varying(60),
	flg_acti character varying(1),
    CONSTRAINT pk__id_sabor_01 PRIMARY KEY (id_sabor)
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public.sabor_x_animal
(
    _id_sabor integer NOT NULL,
    _id_animal integer NOT NULL,
    CONSTRAINT pk__sabor_x_animal_01 PRIMARY KEY (_id_sabor, _id_animal),
    CONSTRAINT fk___id_sabor_01 FOREIGN KEY (_id_sabor)
        REFERENCES public.sabor (id_sabor) MATCH SIMPLE
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
  INTO sabor
       (desc_sabor, abvr,imagen,flg_acti)
VALUES 
('Carne y Hueso','carne','carne_hueso.svg','1'),
('Carne fresca vacuno','res','carne_fresca_vacuno.svg','1'),
('Pollo','pollo','pollo_pierna.svg','1'),
('Visceras','carne','visceras.svg','1'),
('Pescado','pescado','pescado.png','1'),
('Cordero','cordero','cordero.svg','1'),
('Vegetariano','vegetal','ensalada.svg','1');


INSERT INTO sabor_x_animal
(_id_sabor,_id_animal)
SELECT id_sabor,
		1
FROM sabor;