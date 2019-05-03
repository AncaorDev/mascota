CREATE TABLE public.site
(
    id_site serial,
    desc_site character varying(50),
    flg_acti character varying(1),
    CONSTRAINT pk__site_01 PRIMARY KEY (id_site)
)
WITH (
    OIDS = FALSE
);

CREATE TABLE public.scraper_x_site
(
    id_scraper serial NOT NULL,
    _id_site integer NOT NULL,
    web_scraper_order character varying(30),
    web_scraper_start_url character varying(200),
    categorias character varying(100),
    categorias_href character varying(200),
    productos character varying(200),
    enlace character varying(200),
    nombre character varying(200),
    precio character varying(20),
    peso character varying(20),
    marca character varying(50),
    imagen character varying(250),
    PRIMARY KEY (id_scraper, _id_site),
    CONSTRAINT fk__id_site_01 FOREIGN KEY (_id_site)
        REFERENCES public.site (id_site) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
);

INSERT INTO site (desc_site,flg_acti)
VALUES('SuperPet', '1');