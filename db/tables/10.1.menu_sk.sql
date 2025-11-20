-- FK: image thuộc về menu_item
ALTER TABLE menu_item_images
ADD CONSTRAINT fk_menu_item_images_menu_item
FOREIGN KEY (menu_item_id) REFERENCES menu_items(id);

CREATE INDEX ix_menu_item_images_item
    ON menu_item_images (menu_item_id);

-- FK: main_image_id trỏ về ảnh trong bảng images
ALTER TABLE menu_items
ADD CONSTRAINT fk_menu_items_main_image
FOREIGN KEY (main_image_id) REFERENCES menu_item_images(id);

CREATE INDEX ix_menu_items_category
    ON menu_items(category_id);
