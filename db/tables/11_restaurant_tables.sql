CREATE TABLE restaurant_tables (
    id          uuid PRIMARY KEY,
    code        text NOT NULL UNIQUE,
    name        text,
    capacity    integer NOT NULL DEFAULT 2,
    status      smallint NOT NULL DEFAULT 0,
    note        text,
    is_deleted  boolean NOT NULL DEFAULT false,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now()
);