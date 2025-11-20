CREATE TABLE order_status_logs (
    id          uuid PRIMARY KEY,
    order_id    uuid NOT NULL,
    from_status smallint,
    to_status   smallint NOT NULL,
    changed_by  uuid,
    note        text,
    created_at  timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (changed_by) REFERENCES users(id)
);

CREATE INDEX ix_order_status_logs_order
    ON order_status_logs(order_id);
