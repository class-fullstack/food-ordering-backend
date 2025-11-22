CREATE TABLE email_verifications (
    id              uuid PRIMARY KEY,
    user_id         uuid        NOT NULL,
    email           citext      NOT NULL,
    token           text        NOT NULL,
    expired_at      timestamptz NOT NULL,
    verified_at     timestamptz,
    is_used         boolean     NOT NULL DEFAULT false,
    is_deleted      boolean     NOT NULL DEFAULT false,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX ix_email_verifications_user
    ON email_verifications(user_id);

CREATE INDEX ix_email_verifications_email
    ON email_verifications(email);

CREATE UNIQUE INDEX ux_email_verifications_token
    ON email_verifications(token)
    WHERE is_deleted = false;
