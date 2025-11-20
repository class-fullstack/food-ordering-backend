CREATE TABLE user_roles (
    id          uuid PRIMARY KEY,
    user_id     uuid        NOT NULL,
    role_id     uuid        NOT NULL,
    is_deleted  boolean     NOT NULL DEFAULT false,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE UNIQUE INDEX ux_user_roles_user_role
    ON user_roles (user_id, role_id)
    WHERE is_deleted = false;
