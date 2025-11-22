CREATE TABLE qr_login_requests (
    id          uuid PRIMARY KEY,
    code        text        NOT NULL UNIQUE, -- token hiển thị dạng QR
    status      smallint    NOT NULL DEFAULT 0, -- 0: PENDING, 1: APPROVED, 2: DENIED, 3: EXPIRED
    user_id     uuid,
    client_info text,
    expired_at  timestamptz NOT NULL,
    approved_at timestamptz,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX ix_qr_login_requests_status
    ON qr_login_requests(status);
