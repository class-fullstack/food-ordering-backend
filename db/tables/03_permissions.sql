CREATE TABLE permissions (
    id          uuid PRIMARY KEY,
    code        text        NOT NULL UNIQUE,
    name        text        NOT NULL,
    description text,
    module      smallint,
    is_deleted  boolean     NOT NULL DEFAULT false,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now()
);
-- Lúc mình nghĩ nó sẽ làm cái dynamic nhưng bây giờ chúng ta làm static
ALTER TABLE permissions DROP COLUMN module; 


-- Bây giờ đã thêm lại
ALTER TABLE permissions
ADD COLUMN module VARCHAR(100);


-- Không cần field này nữa vì bản chất tên không đầy đủ bằng description
ALTER TABLE permissions
DROP COLUMN name;
