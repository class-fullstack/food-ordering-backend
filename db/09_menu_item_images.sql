CREATE TABLE menu_item_images (
    id           uuid PRIMARY KEY,
    menu_item_id uuid NOT NULL,
    public_id    text,
    image_url    text NOT NULL,
    is_main      boolean NOT NULL DEFAULT false,
    sort_order   integer NOT NULL DEFAULT 0,
    is_deleted   boolean NOT NULL DEFAULT false,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

CREATE INDEX ix_menu_item_images_item
    ON menu_item_images (menu_item_id);
