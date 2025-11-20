-- Lấy tất cả vùng
SELECT * FROM administrative_regions;

-- Lấy tất cả đơn vị hành chính
SELECT * FROM administrative_units;

-- Lấy tất cả tỉnh/thành
SELECT * FROM provinces;

-- Lấy tất cả xã/phường
SELECT * FROM wards;


-- 1️⃣ Lấy list tỉnh cho dropdown đầu tiên
SELECT 
    code,       -- dùng làm value
    full_name   -- dùng làm text hiển thị
FROM provinces
ORDER BY full_name;

-- 2️⃣ Khi user chọn 1 tỉnh → load các huyện/xã của tỉnh đó
SELECT 
    w.code,
    w.full_name
FROM wards w
WHERE w.province_code = '56'
ORDER BY w.full_name;

-- 3️⃣ Nếu user chọn theo tên tỉnh (vd: “Khánh Hòa”), không dùng code
SELECT 
    w.code,
    w.full_name
FROM wards w
JOIN provinces p 
    ON p.code = w.province_code
WHERE p.name ILIKE '%Khánh Hòa%'   -- hoặc p.full_name = 'Tỉnh Khánh Hòa'
ORDER BY w.full_name;