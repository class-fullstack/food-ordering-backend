CREATE TABLE otp_codes (
    id              uuid PRIMARY KEY,
    user_id         uuid,
    channel         smallint    NOT NULL,  -- 0: SMS, 1: EMAIL, 2: APP
    destination     text        NOT NULL,  -- email hoặc số điện thoại
    code            text        NOT NULL,
    purpose         smallint    NOT NULL,  -- 0: VERIFY_EMAIL, 1: LOGIN, 2: FORGOT_PASSWORD
    expired_at      timestamptz NOT NULL,
    verified_at     timestamptz,
    attempt_count   integer     NOT NULL DEFAULT 0,
    is_used         boolean     NOT NULL DEFAULT false,
    is_deleted      boolean     NOT NULL DEFAULT false,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX ix_otp_codes_user
    ON otp_codes(user_id);

CREATE INDEX ix_otp_codes_destination
    ON otp_codes(destination);

CREATE UNIQUE INDEX ux_otp_codes_active
    ON otp_codes(destination, purpose, code)
    WHERE is_deleted = false AND is_used = false;
