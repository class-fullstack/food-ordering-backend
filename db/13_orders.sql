CREATE TABLE orders (
    id              uuid PRIMARY KEY,
    user_id         uuid,
    table_id        uuid,
    order_type      smallint NOT NULL DEFAULT 0,
    order_source    smallint NOT NULL DEFAULT 0,
    total_amount    integer NOT NULL DEFAULT 0,
    discount_amount integer NOT NULL DEFAULT 0,
    final_amount    integer NOT NULL DEFAULT 0,
    status          smallint NOT NULL DEFAULT 0,
    note            text,
    is_deleted      boolean NOT NULL DEFAULT false,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (table_id) REFERENCES restaurant_tables(id)
);

CREATE INDEX ix_orders_user ON orders(user_id);
CREATE INDEX ix_orders_status ON orders(status);
