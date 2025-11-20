CREATE TABLE discounts (
    id              uuid PRIMARY KEY,
    code            text NOT NULL UNIQUE,
    name            text NOT NULL,
    description     text,
    discount_type   smallint NOT NULL DEFAULT 0,
    discount_value  integer NOT NULL,
    min_order_value integer NOT NULL DEFAULT 0,
    max_discount    integer,
    start_date      timestamptz NOT NULL,
    end_date        timestamptz NOT NULL,
    image_url       text,
    public_id       text,
    is_active       boolean NOT NULL DEFAULT true,
    is_deleted      boolean NOT NULL DEFAULT false,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now()
);
