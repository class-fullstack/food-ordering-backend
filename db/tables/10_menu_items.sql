CREATE TABLE menu_items (
    id             uuid PRIMARY KEY,
    category_id    uuid NOT NULL,
    name           text NOT NULL,
    slug           text UNIQUE,
    description    text,
    price          integer NOT NULL DEFAULT 0,
    main_image_id  uuid,
    is_available   boolean NOT NULL DEFAULT true,
    is_combo       boolean NOT NULL DEFAULT false,
    is_deleted     boolean NOT NULL DEFAULT false,
    created_at     timestamptz NOT NULL DEFAULT now(),
    updated_at     timestamptz NOT NULL DEFAULT now()
);