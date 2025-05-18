CREATE SCHEMA public;

-- Définition des types ENUM utilisés dans la base.
-- Permet de restreindre les valeurs possibles pour certains champs.
CREATE TYPE public.car_energy_enum AS ENUM (
    'gasoline',
    'diesel',
    'hybrid',
    'electric',
    'unknown'
);

CREATE TYPE public.ride_status_enum AS ENUM (
    'upcoming',
    'ongoing',
    'completed',
    'cancelled'
);

CREATE TYPE public.user_type_enum AS ENUM (
    'driver',
    'passenger',
    'both',
    'app'
);

-- Table principale des utilisateurs.
-- Contient les informations d'identification, de profil, de rôle, de préférences, de statut d'invitation, de CGU et de crédit.
CREATE TABLE public."user" (
    id uuid NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    avatar_url text,
    type public.user_type_enum DEFAULT 'passenger'::public.user_type_enum NOT NULL,
    accepts_smoking boolean DEFAULT false NOT NULL,
    accepts_pets boolean DEFAULT false NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    is_staff boolean DEFAULT false NOT NULL,
    is_blocked boolean DEFAULT false NOT NULL,
    custom_rules jsonb DEFAULT '[]'::jsonb NOT NULL,
    credits integer NOT NULL,
    is_invitation_pending boolean DEFAULT false NOT NULL,
    terms_accepted_at timestamp without time zone,
    terms_accepted boolean DEFAULT false NOT NULL,
    rate numeric(10,2)
);

-- Table des véhicules.
-- Chaque véhicule est lié à un utilisateur propriétaire et dispose de caractéristiques propres.
CREATE TABLE public.car (
    id uuid NOT NULL,
    plate_number character varying NOT NULL,
    registration_date date NOT NULL,
    color character varying NOT NULL,
    brand character varying NOT NULL,
    model character varying NOT NULL,
    seats integer NOT NULL,
    energy public.car_energy_enum DEFAULT 'unknown'::public.car_energy_enum NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    owner_id uuid
);

-- Table des trajets proposés sur la plateforme.
-- Contient les données de planification, de géolocalisation, de tarification et de statut.
CREATE TABLE public.ride (
    id uuid NOT NULL,
    reserved_seats integer,
    price integer NOT NULL,
    balance integer NOT NULL,
    departure_date timestamp without time zone NOT NULL,
    arrival_date timestamp without time zone NOT NULL,
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    arrival_point public.geometry(Point,4326) NOT NULL,
    departure_point public.geometry(Point,4326) NOT NULL,
    arrival_location jsonb NOT NULL,
    departure_location jsonb NOT NULL,
    status public.ride_status_enum DEFAULT 'upcoming'::public.ride_status_enum NOT NULL,
    service_paid boolean DEFAULT false NOT NULL,
    driver_id uuid,
    car_id uuid
);

-- Table des réservations de passagers.
-- Lie un utilisateur à un trajet avec possibilité d’annulation, suivi des dates et consentement au partage d’email.
CREATE TABLE public.ride_passenger (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    canceled boolean DEFAULT false NOT NULL,
    email_share_accepted boolean,
    email_share_accepted_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid,
    ride_id uuid
);

-- Table de liaison many-to-many entre utilisateurs et trajets.
-- Utilisée pour retrouver les passagers associés à un trajet.
CREATE TABLE public.ride_user_passenger (
    ride_id uuid NOT NULL,
    user_id uuid NOT NULL
);

-- Table des crédits perçus par la plateforme.
-- Chaque entrée correspond à une commission prélevée sur un trajet.
CREATE TABLE public.platform_credit (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    credit integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    ride_id uuid
);

-- Table technique utilisée par TypeORM pour le suivi des migrations de schéma.
CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);

-- Contraintes de clé primaire, étrangère et unique pour garantir l'intégrité référentielle.
-- Clé primaire sur la table "user" (id utilisateur unique)
ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);

-- Clé primaire sur la table "car" (id véhicule unique)
ALTER TABLE ONLY public.car
    ADD CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY (id);

-- Clé primaire sur la table "ride" (id trajet unique)
ALTER TABLE ONLY public.ride
    ADD CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY (id);

-- Clé primaire sur la table "ride_passenger" (id de réservation unique)
ALTER TABLE ONLY public.ride_passenger
    ADD CONSTRAINT "PK_24be7bdcedfd682e9aa053329a2" PRIMARY KEY (id);

-- Clé primaire composée sur la table "ride_user_passenger" (association unique entre un trajet et un passager)
ALTER TABLE ONLY public.ride_user_passenger
    ADD CONSTRAINT "PK_7ad771efd372a82e7321e171b38" PRIMARY KEY (ride_id, user_id);

-- Clé primaire sur la table "platform_credit" (id crédit unique)
ALTER TABLE ONLY public.platform_credit
    ADD CONSTRAINT "PK_b07a3479208c49369fb4f6110a5" PRIMARY KEY (id);

-- Clé primaire sur la table "migrations" (id de migration technique)
ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);

-- Contrainte d’unicité : un trajet ne peut générer qu’une seule ligne dans "platform_credit"
ALTER TABLE ONLY public.platform_credit
    ADD CONSTRAINT "REL_ca9de458bf77c2fa71cddf9418" UNIQUE (ride_id);

-- Lien entre un véhicule et son propriétaire (utilisateur)
ALTER TABLE ONLY public.car
    ADD CONSTRAINT "FK_0fb8ff3175d6e5ee61d00424c74" FOREIGN KEY (owner_id) REFERENCES public."user"(id) ON DELETE CASCADE;

-- Lien entre un trajet et le véhicule utilisé
ALTER TABLE ONLY public.ride
    ADD CONSTRAINT "FK_114f0ac09128843a3221fda182a" FOREIGN KEY (car_id) REFERENCES public.car(id);

-- Réservation liée à un trajet
ALTER TABLE ONLY public.ride_passenger
    ADD CONSTRAINT "FK_1260fb2aa90e44aa11426e5fb26" FOREIGN KEY (ride_id) REFERENCES public.ride(id) ON DELETE CASCADE;

-- Liaison entre un trajet et un passager (relation many-to-many)
ALTER TABLE ONLY public.ride_user_passenger
    ADD CONSTRAINT "FK_4396093bcd7db1665d778f16571" FOREIGN KEY (ride_id) REFERENCES public.ride(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Liaison entre un trajet et un passager (relation many-to-many)
ALTER TABLE ONLY public.ride_user_passenger
    ADD CONSTRAINT "FK_6413e40b2f3434304c034ca77b3" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Lien entre un trajet et le conducteur
ALTER TABLE ONLY public.ride
    ADD CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e" FOREIGN KEY (driver_id) REFERENCES public."user"(id);

-- Crédit plateforme lié à un trajet spécifique
ALTER TABLE ONLY public.platform_credit
    ADD CONSTRAINT "FK_ca9de458bf77c2fa71cddf94182" FOREIGN KEY (ride_id) REFERENCES public.ride(id);

-- Réservation liée à un passager
ALTER TABLE ONLY public.ride_passenger
    ADD CONSTRAINT "FK_d9bccd61cec12b7e01618531321" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;

-- Index pour améliorer les performances des requêtes.
-- Inclut des index géospatiaux (GIST), des index uniques, et des index sur les colonnes fréquemment filtrées.
CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON public."user" USING btree (username);
CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON public."user" USING btree (email);
CREATE INDEX "IDX_a9e2b048ebf6301a13ae76727d" ON public.ride USING gist (arrival_point);
CREATE INDEX "IDX_ca9e5465f78af8c51f2da45fa8" ON public.ride USING gist (departure_point);
CREATE UNIQUE INDEX "IDX_ca9de458bf77c2fa71cddf9418" ON public.platform_credit USING btree (ride_id);
CREATE INDEX is_deleted_index ON public.car (is_deleted);
CREATE INDEX "IDX_4396093bcd7db1665d778f1657" ON public.ride_user_passenger USING btree (ride_id);
CREATE INDEX "IDX_6413e40b2f3434304c034ca77b3" ON public.ride_user_passenger USING btree (user_id);
CREATE INDEX "IDX_e7d5ca3e30159832fc5ef8f386" ON public.platform_credit USING btree (created_at);
CREATE INDEX ride_arrival_location_index ON public.ride USING btree (arrival_location);
CREATE INDEX ride_departure_date_index ON public.ride USING btree (departure_date);
CREATE INDEX ride_departure_location_index ON public.ride USING btree (departure_location);
CREATE INDEX ride_driver_index ON public.ride USING btree (driver_id);
CREATE UNIQUE INDEX ride_passenger_user_ride_index ON public.ride_passenger USING btree (user_id, ride_id);
CREATE INDEX ride_status_index ON public.ride USING btree (status);