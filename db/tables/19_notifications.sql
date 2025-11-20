CREATE TABLE notifications (
    id          uuid PRIMARY KEY,
    title       text NOT NULL,
    message     text NOT NULL,
    type        smallint NOT NULL DEFAULT 0,
    image_url   text,
    public_id   text,
    sender_id   uuid,
    is_active   boolean NOT NULL DEFAULT true,
    is_deleted  boolean NOT NULL DEFAULT false,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (sender_id) REFERENCES users(id)
);
