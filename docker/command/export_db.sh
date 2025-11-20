# 1. Xuất toàn bộ DB (schema + data) — FULL BACKUP
docker exec -t postgresql \
  pg_dump -U teacher -d food_ordering -F p > backup_full.sql

# 2 Xuất chỉ Schema (không data)
docker exec -t postgresql \
  pg_dump -U teacher -d food_ordering -s > backup_schema.sql

#3 Xuất chỉ Data (không schema)
docker exec -t postgresql \
  pg_dump -U teacher -d food_ordering -a > backup_data.sql

#4. Xuất 1 bảng + data
docker exec -t postgresql \
  pg_dump -U teacher -d food_ordering -t menu_items > menu_items.sql

#5. Xuất nhiều bảng
docker exec -t postgresql \
  pg_dump -U teacher -d food_ordering \
  -t menu_items -t menu_item_images -t menu_categories > menu_tables.sql

#6. Import lại file backup vào Docker
docker exec -i postgresql \
  psql -U teacher -d food_ordering < backup_full.sql
