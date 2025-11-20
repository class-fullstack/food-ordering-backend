CREATE TABLE notification_users (
    id               uuid PRIMARY KEY,
    notification_id  uuid NOT NULL,
    user_id          uuid NOT NULL,
    is_read          boolean NOT NULL DEFAULT false,
    read_at          timestamptz,
    is_deleted       boolean NOT NULL DEFAULT false,
    created_at       timestamptz NOT NULL DEFAULT now(),
    updated_at       timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (notification_id) REFERENCES notifications(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX ix_notification_users_user
    ON notification_users(user_id);
