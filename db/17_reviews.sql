CREATE TABLE reviews (
    id           uuid PRIMARY KEY,
    user_id      uuid NOT NULL,
    order_id     uuid,
    menu_item_id uuid,
    rating       smallint NOT NULL,
    comment      text,
    is_public    boolean NOT NULL DEFAULT true,
    is_deleted   boolean NOT NULL DEFAULT false,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

CREATE INDEX ix_reviews_menu_item
    ON reviews(menu_item_id);
