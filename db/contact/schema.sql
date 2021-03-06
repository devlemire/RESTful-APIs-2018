-- DDL generated by Postico 1.4.2
-- Not all database features are supported. Do not use for backup.

-- Table Definition ----------------------------------------------

CREATE TABLE contact (
    contact_id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text,
    company text,
    phone text,
    created_at timestamp without time zone DEFAULT now()
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX contact_pkey ON contact(contact_id int4_ops);
