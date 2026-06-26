-- Tabla de personas desaparecidas
CREATE TABLE missing_persons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20),
    height DECIMAL(5, 2),
    weight DECIMAL(5, 2),
    skin_color VARCHAR(50),
    hair_color VARCHAR(50),
    distinctive_marks TEXT,
    photo_url VARCHAR(500),
    disappearance_date TIMESTAMP NOT NULL,
    disappearance_location VARCHAR(500) NOT NULL,
    disappearance_location_lat DECIMAL(10, 8),
    disappearance_location_lng DECIMAL(11, 8),
    last_known_outfit TEXT,
    case_status VARCHAR(50) DEFAULT 'active',
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reporter_relationship VARCHAR(100),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    additional_info TEXT,
    reward_offered BOOLEAN DEFAULT FALSE,
    reward_amount DECIMAL(10, 2),
    media_files JSONB,
    case_number VARCHAR(50) UNIQUE,
    shared_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    tips_received INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    case_resolved_date TIMESTAMP,
    resolution_details TEXT
);

-- Tabla de pistas/tips sobre personas desaparecidas
CREATE TABLE missing_person_tips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    missing_person_id UUID NOT NULL REFERENCES missing_persons(id) ON DELETE CASCADE,
    provider_id UUID REFERENCES users(id) ON DELETE SET NULL,
    tip_title VARCHAR(255) NOT NULL,
    tip_description TEXT NOT NULL,
    tip_location VARCHAR(500),
    tip_location_lat DECIMAL(10, 8),
    tip_location_lng DECIMAL(11, 8),
    tip_date TIMESTAMP,
    tip_type VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    is_credible BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'pending',
    attachments JSONB,
    anonymous BOOLEAN DEFAULT TRUE,
    contact_phone VARCHAR(20),
    contact_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de actualizaciones de casos
CREATE TABLE missing_person_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    missing_person_id UUID NOT NULL REFERENCES missing_persons(id) ON DELETE CASCADE,
    updated_by_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    update_title VARCHAR(255) NOT NULL,
    update_description TEXT NOT NULL,
    update_type VARCHAR(50),
    attachment_urls JSONB,
    is_official BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de voluntarios en búsqueda
CREATE TABLE search_volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    missing_person_id UUID NOT NULL REFERENCES missing_persons(id) ON DELETE CASCADE,
    volunteer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    search_location VARCHAR(500),
    search_date DATE,
    hours_volunteered DECIMAL(5, 2),
    search_description TEXT,
    photos_found JSONB,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de organizaciones de búsqueda
CREATE TABLE search_organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    missing_person_id UUID NOT NULL REFERENCES missing_persons(id) ON DELETE CASCADE,
    organization_name VARCHAR(255) NOT NULL,
    organization_phone VARCHAR(20),
    organization_email VARCHAR(255),
    contact_person VARCHAR(255),
    support_type VARCHAR(100),
    resources_offered TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de mapas de zonas de búsqueda
CREATE TABLE search_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    missing_person_id UUID NOT NULL REFERENCES missing_persons(id) ON DELETE CASCADE,
    area_name VARCHAR(255),
    area_description TEXT,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    radius_km DECIMAL(5, 2),
    search_status VARCHAR(50),
    searched_by_count INTEGER DEFAULT 0,
    last_searched TIMESTAMP,
    priority_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de notificaciones de búsqueda
CREATE TABLE missing_person_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    missing_person_id UUID NOT NULL REFERENCES missing_persons(id) ON DELETE CASCADE,
    alert_type VARCHAR(50),
    alert_radius_km DECIMAL(5, 2),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    sent_to_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_missing_persons_reporter_id ON missing_persons(reporter_id);
CREATE INDEX idx_missing_persons_status ON missing_persons(case_status);
CREATE INDEX idx_missing_persons_disappearance_date ON missing_persons(disappearance_date);
CREATE INDEX idx_missing_persons_location ON missing_persons(disappearance_location);
CREATE INDEX idx_missing_person_tips_missing_id ON missing_person_tips(missing_person_id);
CREATE INDEX idx_missing_person_tips_status ON missing_person_tips(status);
CREATE INDEX idx_search_volunteers_missing_id ON search_volunteers(missing_person_id);
CREATE INDEX idx_search_areas_missing_id ON search_areas(missing_person_id);
CREATE INDEX idx_missing_person_alerts_created_at ON missing_person_alerts(created_at);
