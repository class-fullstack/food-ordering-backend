CREATE TABLE user_devices (
    id              uuid PRIMARY KEY,
    user_id         uuid        NOT NULL,
    device_name     text,
    device_type     text,
    device_os       text,
    device_model    text,
    last_ip_address inet,
    last_login_at   timestamptz,
    is_trusted      boolean     NOT NULL DEFAULT false,
    is_deleted      boolean     NOT NULL DEFAULT false,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX ix_user_devices_user
    ON user_devices (user_id);

---
ALTER TABLE user_devices
ADD COLUMN device_fingerprint text,
ADD COLUMN is_inactive boolean NOT NULL DEFAULT false;
