CREATE TABLE roles (
    id          uuid PRIMARY KEY,
    code        integer     NOT NULL UNIQUE,
    name        text        NOT NULL,
    description text,
    is_system   boolean     NOT NULL DEFAULT true,
    is_deleted  boolean     NOT NULL DEFAULT false,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now()
);