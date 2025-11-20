CREATE TABLE payments (
    id               uuid PRIMARY KEY,
    order_id         uuid NOT NULL,
    method           smallint NOT NULL DEFAULT 0,
    amount           integer NOT NULL DEFAULT 0,
    status           smallint NOT NULL DEFAULT 0,
    transaction_code text,
    raw_response     jsonb,
    paid_at          timestamptz,
    is_deleted       boolean NOT NULL DEFAULT false,
    created_at       timestamptz NOT NULL DEFAULT now(),
    updated_at       timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE INDEX ix_payments_order ON payments(order_id);
