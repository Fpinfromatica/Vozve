-- Insertar usuarios de prueba
INSERT INTO users (email, password_hash, full_name, phone_number, is_journalist, is_verified) VALUES
('periodista1@vozve.app', '$2a$10$...', 'Carlos Mendoza', '+58 412 1234567', true, true),
('periodista2@vozve.app', '$2a$10$...', 'María González', '+58 414 2345678', true, true),
('usuario1@vozve.app', '$2a$10$...', 'Juan Pérez', '+58 416 3456789', false, true),
('usuario2@vozve.app', '$2a$10$...', 'Ana Rodríguez', '+58 424 4567890', false, true);

-- Insertar noticias de prueba
INSERT INTO news (title, content, author_id, category, status) VALUES
('Crisis Económica Agravada en Venezuela', 'Los datos más recientes muestran un empeoramiento significativo...', 
 (SELECT id FROM users WHERE email = 'periodista1@vozve.app'), 'Economía', 'published'),
('Manifestaciones Ciudadanas: Miles Exigen Cambios', 'Miles de ciudadanos se reúnen en las calles para exigir cambios políticos...',
 (SELECT id FROM users WHERE email = 'periodista2@vozve.app'), 'Política', 'published');

-- Insertar encuestas de prueba
INSERT INTO polls (question, creator_id) VALUES
('¿Cuál crees que es el principal problema de Venezuela?',
 (SELECT id FROM users WHERE email = 'usuario1@vozve.app'));

-- Insertar opciones de encuesta
INSERT INTO poll_options (poll_id, label, votes_count) 
SELECT id, 'Economía', 4500 FROM polls LIMIT 1;
INSERT INTO poll_options (poll_id, label, votes_count) 
SELECT id, 'Salud', 2100 FROM polls LIMIT 1;
INSERT INTO poll_options (poll_id, label, votes_count) 
SELECT id, 'Educación', 1800 FROM polls LIMIT 1;
INSERT INTO poll_options (poll_id, label, votes_count) 
SELECT id, 'Seguridad', 1600 FROM polls LIMIT 1;
