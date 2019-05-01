-- Database: mascota

-- DROP DATABASE mascota;

CREATE DATABASE mascota
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Peru.1252'
    LC_CTYPE = 'Spanish_Peru.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Table: public.animal

-- DROP TABLE public.animal;

CREATE TABLE public.animal
(
    id_animal integer NOT NULL,
    desc_animal character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT pk_animal__01 PRIMARY KEY (id_animal)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

COMMENT ON COLUMN public.animal.id_animal
    IS 'id del animal';

COMMENT ON COLUMN public.animal.desc_animal
    IS 'Nombre del animal';

-- Table: public.alimento

-- DROP TABLE public.alimento;

CREATE TABLE public.alimento
(
    _id_animal integer NOT NULL,
    correlativo integer NOT NULL,
    desc_alimento character varying(120) COLLATE pg_catalog."default",
    CONSTRAINT pk_alimento__01 PRIMARY KEY (_id_animal, correlativo)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

-- Table: public.combo_tipo

-- DROP TABLE public.combo_tipo;

CREATE TABLE public.combo_tipo
(
    grupo integer NOT NULL,
    valor character varying(1) COLLATE pg_catalog."default" NOT NULL,
    desc_combo character varying(120) COLLATE pg_catalog."default",
    orden integer,
    CONSTRAINT pk_combo_tipo__01 PRIMARY KEY (grupo, valor)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

-- Table: public.edades

-- DROP TABLE public.edades;

CREATE TABLE public.edades
(
    _id_animal integer NOT NULL,
    correlativo integer NOT NULL,
    desc_edad character varying(120) COLLATE pg_catalog."default",
    CONSTRAINT pk_edades__01 PRIMARY KEY (_id_animal, correlativo)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

-- Table: public.persona

-- DROP TABLE public.persona;

CREATE TABLE public.persona
(
    id_persona integer NOT NULL DEFAULT nextval('persona_id_persona_seq'::regclass),
    nom_persona character varying(60) COLLATE pg_catalog."default",
    ape_pate_pers character varying(60) COLLATE pg_catalog."default",
    ape_mate_pers character varying(60) COLLATE pg_catalog."default",
    foto_persona character varying(120) COLLATE pg_catalog."default",
    fec_naci date,
    tipo_documento character varying(1) COLLATE pg_catalog."default",
    nro_documento character varying(20) COLLATE pg_catalog."default",
    correo_pers character varying(120) COLLATE pg_catalog."default",
    celular character varying(15) COLLATE pg_catalog."default",
    telefono character varying(15) COLLATE pg_catalog."default",
    usuario character varying(50) COLLATE pg_catalog."default",
    clave bytea,
    CONSTRAINT pk_persona__01 PRIMARY KEY (id_persona)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;


-- Table: public.raza

-- DROP TABLE public.raza;

CREATE TABLE public.raza
(
    _id_animal integer NOT NULL,
    correlativo integer NOT NULL,
    desc_raza character varying(120) COLLATE pg_catalog."default",
    CONSTRAINT pk_raza__01 PRIMARY KEY (_id_animal, correlativo)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

-- Table: public.size

-- DROP TABLE public.size;

CREATE TABLE public.size
(
    _id_animal integer NOT NULL,
    correlativo integer NOT NULL,
    desc_size character varying(120) COLLATE pg_catalog."default",
    CONSTRAINT pk_size__01 PRIMARY KEY (_id_animal, correlativo)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;



INSERT INTO animal(id_animal, desc_animal)
VALUES
(1,'Perro'),
(2,'Gato');

INSERT 
  INTO alimento
VALUES (1,1,'Casera'),
(1,2,'Mixta (Casera y Balanceado)'),
(1,3,'Balanceado - Dog Chow'),
(1,4,'Balanceado - Royal Canin'),
(1,5,'Balanceado - Eukanuba'),
(1,6,'Balanceado - Science Diet'),
(1,7,'Balanceado - Proplan'),
(1,8,'Balanceado - Ricocan'),
(1,9,'Balanceado- Mimaskot'),
(1,10,'Balanceado- Varios - Cambio constantemente'),
(1,11,'Alimento húmedo en latas'),
(1,12,'Balanceado Holístico');

INSERT 
  INTO edades
VALUES
(1,1,'Cachorro (0 a 2 meses)'),
(1,2,'Cachorro (2 a 4 meses)'),
(1,3,'Cachorro (4 a 6 meses)'),
(1,4,'Cachorro (6 a 12 meses)'),
(1,5,'Maduro Senior Adulto( 7 años a más)'),
(1,6,'Preñada');

INSERT 
  INTO raza
VALUES
(1,1,'Mestizo'),
(1,2,'Beagle'),
(1,3,'Bichón maltés'),
(1,4,'Boxer'),
(1,5,'Bulldog francés'),
(1,6,'Bulldog ingles');

INSERT 
  INTO size
VALUES
(1,1,'Raza Pequeña (1 -10 Kilos)'),
(1,2,'Raza Mediana (11-25 kg)'),
(1,3,'Raza Grande( 26 -44 kg)'),
(1,4,'Raza Gigante (más de 45 Kilos)'),
(1,5,'Raza Pequeña (1 -10 Kilos)');