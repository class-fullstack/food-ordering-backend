CREATE TABLE users (
    id              uuid PRIMARY KEY,
    full_name       text        NOT NULL,
    phone           varchar(20) UNIQUE,
    email           citext      NOT NULL UNIQUE,
    gender          smallint,
    date_of_birth   date,
    password_hash   text        NOT NULL,
    public_id       text,
    avatar_url      text,
    is_active       boolean     NOT NULL DEFAULT false,
    is_deleted      boolean     NOT NULL DEFAULT false,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now()
);
