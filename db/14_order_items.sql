CREATE TABLE order_items (
    id              uuid PRIMARY KEY,
    order_id        uuid NOT NULL,
    menu_item_id    uuid NOT NULL,
    quantity        integer NOT NULL DEFAULT 1,
    unit_price      integer NOT NULL DEFAULT 0,
    discount_amount integer NOT NULL DEFAULT 0,
    total_price     integer NOT NULL DEFAULT 0,
    note            text,
    is_deleted      boolean NOT NULL DEFAULT false,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

CREATE INDEX ix_order_items_order ON order_items(order_id);
