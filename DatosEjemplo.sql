USE iliberp;

INSERT INTO inventario_producto (nombre, descripcion, precio, especificaciones, precio_descuento, tipo, destacado, foto) VALUES
('Portátil Dell XPS', 'Portátil Dell XPS con pantalla InfinityEdge y procesador Intel i9', 1800.00, '{"procesador": "Intel i9", "RAM": "32GB", "almacenamiento": "1TB SSD"}', 1700.00, 'portatil', 1, NULL),
('Placa Base MSI', 'Placa base MSI con chipset Z490 para Intel y soporte para SLI', 200.00, '{"chipset": "Z490", "RAM": "DDR4", "puertos": "USB 3.1, HDMI"}', NULL, 'placa', 0, NULL),
('Teclado Logitech', 'Teclado inalámbrico Logitech con teclas silenciosas y batería de larga duración', 50.00, '{"tipo": "membrana", "conexión": "inalámbrico", "batería": "1 año"}', 45.00, 'teclado', 1, NULL),
('Ratón Logitech G502', 'Ratón Logitech G502 con sensor HERO y 11 botones programables', 90.00, '{"sensor": "HERO", "DPI": "16000", "botones": "11 programables"}', 85.00, 'raton', 0, NULL),
('Tablet Apple iPad', 'Apple iPad con pantalla Retina de 10.2 pulgadas y 128GB de almacenamiento', 400.00, '{"pantalla": "10.2 pulgadas", "almacenamiento": "128GB", "batería": "8827mAh"}', 380.00, 'tablet', 1, NULL),
('Portátil HP Envy', 'Portátil HP Envy con procesador AMD Ryzen 7 y gráfica integrada Vega', 1100.00, '{"procesador": "AMD Ryzen 7", "RAM": "16GB", "almacenamiento": "512GB SSD"}', 1050.00, 'portatil', 0, NULL),
('Placa Base Gigabyte', 'Placa base Gigabyte con chipset B450 para AMD y soporte para CrossFire', 130.00, '{"chipset": "B450", "RAM": "DDR4", "puertos": "USB 3.0, HDMI"}', 120.00, 'placa', 1, NULL),
('Teclado Corsair K95', 'Teclado mecánico Corsair K95 RGB Platinum con switches Cherry MX Brown', 200.00, '{"tipo": "mecánico", "switches": "Cherry MX Brown", "retroiluminación": "RGB"}', 190.00, 'teclado', 0, NULL),
('Ratón Razer DeathAdder', 'Ratón Razer DeathAdder V2 con sensor óptico de 20000 DPI y 8 botones programables', 70.00, '{"sensor": "óptico", "DPI": "20000", "botones": "8 programables"}', 65.00, 'raton', 1, NULL),
('Tablet Huawei MediaPad', 'Huawei MediaPad T5 con pantalla de 10.1 pulgadas y 32GB de almacenamiento', 220.00, '{"pantalla": "10.1 pulgadas", "almacenamiento": "32GB", "batería": "5100mAh"}', 210.00, 'tablet', 0, NULL),
('Portátil Acer Predator', 'Portátil Acer Predator con procesador Intel i7 y gráfica NVIDIA RTX 3060', 1500.00, '{"procesador": "Intel i7", "RAM": "16GB", "almacenamiento": "1TB SSD"}', 1400.00, 'portatil', 1, NULL),
('Placa Base ASRock', 'Placa base ASRock con chipset X570 para AMD y soporte para PCIe 4.0', 250.00, '{"chipset": "X570", "RAM": "DDR4", "puertos": "USB 3.1, HDMI"}', NULL, 'placa', 0, NULL),
('Teclado Razer BlackWidow', 'Teclado mecánico Razer BlackWidow con switches Razer Green y retroiluminación RGB', 150.00, '{"tipo": "mecánico", "switches": "Razer Green", "retroiluminación": "RGB"}', 140.00, 'teclado', 1, NULL),
('Ratón Microsoft Surface', 'Ratón Microsoft Surface Arc con diseño plegable y conexión Bluetooth', 80.00, '{"sensor": "óptico", "DPI": "1000", "botones": "2"}', 75.00, 'raton', 0, NULL),
('Tablet Amazon Fire', 'Amazon Fire HD 10 con pantalla de 10.1 pulgadas y 64GB de almacenamiento', 150.00, '{"pantalla": "10.1 pulgadas", "almacenamiento": "64GB", "batería": "6300mAh"}', 140.00, 'tablet', 1, NULL);


INSERT INTO inventario_pedido (fecha, direccion, estado, subtotal, IVA, total, cliente_id) VALUES
('2024-05-01', '123 Main St, Springfield', 0, 100.00, 21.00, 121.00, 1),
('2024-05-02', '456 Elm St, Shelbyville', 1, 150.00, 31.50, 181.50, 1),
('2024-05-03', '789 Oak St, Ogdenville', 2, 200.00, 42.00, 242.00, 1),
('2024-05-04', '321 Maple St, Capital City', 3, 250.00, 52.50, 302.50, 1),
('2024-05-05', '654 Pine St, North Haverbrook', 4, 300.00, 63.00, 363.00, 1),
('2024-05-06', '987 Birch St, Springfield', 0, 350.00, 73.50, 423.50, 1),
('2024-05-07', '159 Cedar St, Shelbyville', 1, 400.00, 84.00, 484.00, 1);

INSERT INTO inventario_linea (unidades, articulo_id, pedido_id) VALUES
(2, 1, 1),
(1, 2, 1),
(3, 3, 2),
(2, 4, 2),
(1, 5, 3),
(4, 6, 3),
(1, 7, 4),
(2, 8, 4),
(3, 9, 5),
(1, 10, 5),
(2, 11, 6),
(1, 12, 6),
(2, 13, 7),
(3, 14, 7),
(1, 15, 7);