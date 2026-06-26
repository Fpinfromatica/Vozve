-- Insertar personas desaparecidas de prueba
INSERT INTO missing_persons (
    first_name, last_name, date_of_birth, gender, height, weight,
    disappearance_date, disappearance_location, reporter_id,
    reporter_relationship, contact_phone, contact_email, case_status
) VALUES (
    'Carlos', 'González', '1995-05-15', 'M', 1.75, 70,
    NOW() - INTERVAL '30 days', 'Calle 5, San Cristóbal, Tachira',
    (SELECT id FROM users WHERE email = 'usuario1@vozve.app'),
    'Hermano', '+58 412 1234567', 'familia@example.com', 'active'
);

INSERT INTO missing_persons (
    first_name, last_name, date_of_birth, gender, height, weight,
    disappearance_date, disappearance_location, reporter_id,
    reporter_relationship, contact_phone, contact_email, case_status
) VALUES (
    'María', 'Rodríguez', '1988-03-22', 'F', 1.62, 58,
    NOW() - INTERVAL '15 days', 'Avenida Bolívar, Caracas, Distrito Capital',
    (SELECT id FROM users WHERE email = 'usuario2@vozve.app'),
    'Madre', '+58 414 2345678', 'buscar.maria@example.com', 'active'
);
