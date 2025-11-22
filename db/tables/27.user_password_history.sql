CREATE TABLE user_password_history (
    id             uuid PRIMARY KEY,
    user_id        uuid        NOT NULL,
    password_hash  text        NOT NULL,
    created_at     timestamptz NOT NULL DEFAULT now(),
    is_deleted     boolean     NOT NULL DEFAULT false,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX ix_user_password_history_user
    ON user_password_history(user_id);
