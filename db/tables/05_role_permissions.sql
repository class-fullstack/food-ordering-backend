CREATE TABLE role_permissions (
    id             uuid PRIMARY KEY,
    role_id        uuid NOT NULL,
    permission_id  uuid NOT NULL,
    is_deleted     boolean NOT NULL DEFAULT false,
    created_at     timestamptz NOT NULL DEFAULT now(),
    updated_at     timestamptz NOT NULL DEFAULT now(),

    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE UNIQUE INDEX ux_role_permissions_role_perm
    ON role_permissions (role_id, permission_id)
    WHERE is_deleted = false;

-- add more
ALTER TABLE role_permissions
ADD CONSTRAINT unique_role_permission UNIQUE (role_id, permission_id);
