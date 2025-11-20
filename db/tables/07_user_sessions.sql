CREATE TABLE user_sessions (
    id                  uuid PRIMARY KEY,
    user_id             uuid NOT NULL,
    device_id           uuid,
    refresh_token_hash  text NOT NULL,
    user_agent          text,
    ip_address          inet,
    auth_type           smallint NOT NULL DEFAULT 0,
    provider            text,
    expired_at          timestamptz NOT NULL,
    is_revoked          boolean NOT NULL DEFAULT false,
    is_deleted          boolean NOT NULL DEFAULT false,
    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (device_id) REFERENCES user_devices(id)
);

CREATE INDEX ix_user_sessions_user
    ON user_sessions (user_id);
