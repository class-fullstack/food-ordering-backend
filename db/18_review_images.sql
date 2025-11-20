CREATE TABLE review_images (
    id          uuid PRIMARY KEY,
    review_id   uuid NOT NULL,
    public_id   text,
    image_url   text NOT NULL,
    sort_order  integer NOT NULL DEFAULT 0,
    is_deleted  boolean NOT NULL DEFAULT false,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE INDEX ix_review_images_review
    ON review_images(review_id);
