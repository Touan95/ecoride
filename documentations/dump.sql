--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.12 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: car_energy_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.car_energy_enum AS ENUM (
    'gasoline',
    'diesel',
    'hybrid',
    'electric',
    'unknown'
);


--
-- Name: ride_status_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.ride_status_enum AS ENUM (
    'upcoming',
    'ongoing',
    'completed',
    'cancelled'
);


--
-- Name: user_type_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.user_type_enum AS ENUM (
    'driver',
    'passenger',
    'both',
    'app'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: car; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.car (
    id uuid NOT NULL,
    plate_number character varying NOT NULL,
    registration_date date NOT NULL,
    color character varying NOT NULL,
    brand character varying NOT NULL,
    model character varying NOT NULL,
    seats integer NOT NULL,
    energy public.car_energy_enum DEFAULT 'unknown'::public.car_energy_enum NOT NULL,
    owner_id uuid
);


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: platform_credit; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.platform_credit (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    credit integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    ride_id uuid
);


--
-- Name: ride; Type: TABLE; Schema: public; Owner: -
--

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


--
-- Name: ride_passenger; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ride_passenger (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    canceled boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid,
    ride_id uuid
);


--
-- Name: ride_user_passenger; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ride_user_passenger (
    ride_id uuid NOT NULL,
    user_id uuid NOT NULL
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

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
    rate numeric(10,2)
);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: ride_passenger PK_24be7bdcedfd682e9aa053329a2; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride_passenger
    ADD CONSTRAINT "PK_24be7bdcedfd682e9aa053329a2" PRIMARY KEY (id);


--
-- Name: car PK_55bbdeb14e0b1d7ab417d11ee6d; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY (id);


--
-- Name: ride_user_passenger PK_7ad771efd372a82e7321e171b38; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride_user_passenger
    ADD CONSTRAINT "PK_7ad771efd372a82e7321e171b38" PRIMARY KEY (ride_id, user_id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: platform_credit PK_b07a3479208c49369fb4f6110a5; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform_credit
    ADD CONSTRAINT "PK_b07a3479208c49369fb4f6110a5" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: ride PK_f6bc30c4dd875370bafcb54af1b; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT "PK_f6bc30c4dd875370bafcb54af1b" PRIMARY KEY (id);


--
-- Name: platform_credit REL_ca9de458bf77c2fa71cddf9418; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform_credit
    ADD CONSTRAINT "REL_ca9de458bf77c2fa71cddf9418" UNIQUE (ride_id);


--
-- Name: IDX_4396093bcd7db1665d778f1657; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_4396093bcd7db1665d778f1657" ON public.ride_user_passenger USING btree (ride_id);


--
-- Name: IDX_6413e40b2f3434304c034ca77b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_6413e40b2f3434304c034ca77b" ON public.ride_user_passenger USING btree (user_id);


--
-- Name: IDX_78a916df40e02a9deb1c4b75ed; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON public."user" USING btree (username);


--
-- Name: IDX_a9e2b048ebf6301a13ae76727d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_a9e2b048ebf6301a13ae76727d" ON public.ride USING gist (arrival_point);


--
-- Name: IDX_ca9de458bf77c2fa71cddf9418; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "IDX_ca9de458bf77c2fa71cddf9418" ON public.platform_credit USING btree (ride_id);


--
-- Name: IDX_ca9e5465f78af8c51f2da45fa8; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_ca9e5465f78af8c51f2da45fa8" ON public.ride USING gist (departure_point);


--
-- Name: IDX_e12875dfb3b1d92d7d7c5377e2; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON public."user" USING btree (email);


--
-- Name: IDX_e7d5ca3e30159832fc5ef8f386; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_e7d5ca3e30159832fc5ef8f386" ON public.platform_credit USING btree (created_at);


--
-- Name: ride_arrival_location_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ride_arrival_location_index ON public.ride USING btree (arrival_location);


--
-- Name: ride_departure_date_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ride_departure_date_index ON public.ride USING btree (departure_date);


--
-- Name: ride_departure_location_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ride_departure_location_index ON public.ride USING btree (departure_location);


--
-- Name: ride_driver_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ride_driver_index ON public.ride USING btree (driver_id);


--
-- Name: ride_passenger_user_ride_index; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ride_passenger_user_ride_index ON public.ride_passenger USING btree (user_id, ride_id);


--
-- Name: ride_status_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ride_status_index ON public.ride USING btree (status);


--
-- Name: car FK_0fb8ff3175d6e5ee61d00424c74; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.car
    ADD CONSTRAINT "FK_0fb8ff3175d6e5ee61d00424c74" FOREIGN KEY (owner_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: ride FK_114f0ac09128843a3221fda182a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT "FK_114f0ac09128843a3221fda182a" FOREIGN KEY (car_id) REFERENCES public.car(id);


--
-- Name: ride_passenger FK_1260fb2aa90e44aa11426e5fb26; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride_passenger
    ADD CONSTRAINT "FK_1260fb2aa90e44aa11426e5fb26" FOREIGN KEY (ride_id) REFERENCES public.ride(id) ON DELETE CASCADE;


--
-- Name: ride_user_passenger FK_4396093bcd7db1665d778f16571; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride_user_passenger
    ADD CONSTRAINT "FK_4396093bcd7db1665d778f16571" FOREIGN KEY (ride_id) REFERENCES public.ride(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ride_user_passenger FK_6413e40b2f3434304c034ca77b3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride_user_passenger
    ADD CONSTRAINT "FK_6413e40b2f3434304c034ca77b3" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ride FK_90a1ac5467b49859d4ed9637f2e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT "FK_90a1ac5467b49859d4ed9637f2e" FOREIGN KEY (driver_id) REFERENCES public."user"(id);


--
-- Name: platform_credit FK_ca9de458bf77c2fa71cddf94182; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.platform_credit
    ADD CONSTRAINT "FK_ca9de458bf77c2fa71cddf94182" FOREIGN KEY (ride_id) REFERENCES public.ride(id);


--
-- Name: ride_passenger FK_d9bccd61cec12b7e01618531321; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride_passenger
    ADD CONSTRAINT "FK_d9bccd61cec12b7e01618531321" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

