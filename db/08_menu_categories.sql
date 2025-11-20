CREATE TABLE menu_categories (
    id          uuid PRIMARY KEY,
    name        text NOT NULL,
    description text,
    sort_order  integer NOT NULL DEFAULT 0,
    is_deleted  boolean NOT NULL DEFAULT false,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now()
);