CREATE TABLE user_addresses (
    id              uuid PRIMARY KEY,
    user_id         uuid NOT NULL,
    label           text,
    receiver_name   text NOT NULL,
    receiver_phone  text NOT NULL,
    address_line    text NOT NULL,
    ward            text,
--    district        text,
    city            text,
    note            text,
    is_default      boolean NOT NULL DEFAULT false,
    is_deleted      boolean NOT NULL DEFAULT false,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX ix_user_addresses_user
    ON user_addresses(user_id);
