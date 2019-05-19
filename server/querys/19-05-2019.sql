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