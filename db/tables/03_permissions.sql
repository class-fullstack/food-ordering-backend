CREATE TABLE permissions (
    id          uuid PRIMARY KEY,
    code        text        NOT NULL UNIQUE,
    name        text        NOT NULL,
    description text,
    module      smallint,
    is_deleted  boolean     NOT NULL DEFAULT false,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE permissions DROP COLUMN module;
