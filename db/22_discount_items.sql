CREATE TABLE discount_items (
    id           uuid PRIMARY KEY,
    discount_id  uuid NOT NULL,
    menu_item_id uuid NOT NULL,
    is_deleted   boolean NOT NULL DEFAULT false,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (discount_id) REFERENCES discounts(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

CREATE INDEX ix_discount_items_discount
    ON discount_items(discount_id);
