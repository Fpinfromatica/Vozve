# VozVE - Plataforma de Noticias sin Censura

## 📋 Tabla de Contenidos
1. [Descripción General](#descripción-general)
2. [Características](#características)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Instalación](#instalación)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [API Documentation](#api-documentation)
7. [Contribuir](#contribuir)

## 🎯 Descripción General

VozVE es una **plataforma de noticias en tiempo real** dedicada a Venezuela que permite a periodistas y ciudadanos compartir información veraz sin censura. La aplicación proporciona un espacio seguro, descentralizado y resistente para la libertad de expresión.

### Misión
Provocar un cambio positivo en Venezuela a través de periodismo independiente, transparencia y acceso a información veraz.

### Visión
Ser la plataforma de noticias más confiable y accesible para los venezolanos en el mundo.

## ✨ Características

### Para Usuarios
- 📰 **Noticias en Tiempo Real** - Acceso a información actualizada constantemente
- 🎥 **Transmisiones en Vivo** - Cobertura en directo de eventos importantes
- 💬 **Foros Comunitarios** - Espacios para debate constructivo
- 📊 **Encuestas** - Participación en sondeos de opinión pública
- 🔔 **Notificaciones Push** - Alertas personalizadas
- 🌙 **Modo Oscuro** - Interfaz adaptable
- 🗣️ **Multiidioma** - Soporte para ES, EN, PT

### Para Periodistas
- ✍️ **Editor de Noticias Avanzado** - Herramientas profesionales
- 📹 **Streaming Integrado** - Transmisiones en vivo sin herramientas externas
- 📈 **Analytics Dashboard** - Métricas de alcance y engagement
- 🔐 **Verificación de Identidad** - Sistema de acreditación
- 💾 **Almacenamiento Seguro** - Backup automático de contenido

### Seguridad
- 🔐 **Autenticación JWT** - Tokens seguros
- 👆 **Autenticación Biométrica** - Face ID / Touch ID
- 🔒 **Encriptación End-to-End** - Para mensajes privados
- 🌍 **Servidor Propio** - Control total de datos
- 🛡️ **Rate Limiting** - Protección contra ataques
- 🔏 **Contraseñas Hasheadas** - bcryptjs con 10 salts

## 🚀 Stack Tecnológico

### Backend
- **Node.js 18+** - Runtime de JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipado fuerte
- **PostgreSQL 15** - Base de datos relacional
- **Redis 7** - Cache y sesiones
- **Socket.io** - WebSockets para tiempo real
- **JWT** - Autenticación
- **Firebase Admin** - Notificaciones push
- **AWS S3** - Almacenamiento multimedia

### Frontend Web
- **React 18** - Interfaz de usuario
- **TypeScript** - Tipado
- **Redux Toolkit** - Estado global
- **Material-UI** - Componentes UI
- **Vite** - Build tool
- **React Router** - Enrutamiento
- **Axios** - HTTP Client
- **Chart.js** - Gráficos
- **i18next** - Internacionalización

### Apps Nativas
- **React Native** - Desarrollo multiplataforma
- **Expo** - Desarrollo ágil
- **React Navigation** - Navegación
- **Firebase** - Autenticación biométrica
- **Socket.io-client** - Conexión en tiempo real
- **AsyncStorage** - Almacenamiento local

### DevOps
- **Docker** - Contenedores
- **Docker Compose** - Orquestación
- **GitHub Actions** - CI/CD
- **PostgreSQL** - Base de datos
- **Redis** - Cache

## 💻 Instalación

### Requisitos Previos
```bash
Node.js 18+
Docker & Docker Compose
PostgreSQL 15
Redis 7
git
```

### Clonar Repositorio
```bash
git clone https://github.com/Fpinfromatica/VozVE.git
cd VozVE
```

### Setup con Docker (Recomendado)
```bash
# Iniciar servicios
docker-compose up -d

# Verificar servicios
docker-compose ps
```

### Setup Manual

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con valores correctos
npm run migrate
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
# Accesible en http://localhost:3001
```

**Mobile:**
```bash
cd mobile
npm install
npm start
# Escanear QR con Expo Go
```

## 📁 Estructura del Proyecto

```
VozVE/
├── backend/                    # API REST y WebSockets
│   ├── src/
│   │   ├── config/            # Configuración (DB, Redis)
│   │   ├── controllers/        # Lógica de negocio
│   │   ├── models/            # Modelos de datos
│   │   ├── routes/            # Definición de rutas
│   │   ├── middleware/        # Middlewares (auth, etc)
│   │   └── utils/             # Funciones auxiliares
│   ├── package.json
│   └── Dockerfile
│
├── frontend/                   # Aplicación Web React
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── pages/             # Páginas principales
│   │   ├── store/             # Redux store
│   │   ├── theme/             # Configuración de temas
│   │   ├── i18n/              # Internacionalización
│   │   └── styles/            # Estilos globales
│   ├── package.json
│   └── vite.config.ts
│
├── mobile/                     # Apps Nativas (React Native)
│   ├── src/
│   │   ├── screens/           # Pantallas
│   │   ├── components/        # Componentes
│   │   ├── navigation/        # Configuración de navegación
│   │   ├── store/             # Estado global (Zustand)
│   │   └── utils/             # Funciones auxiliares
│   ├── ios/                   # Configuración iOS
│   ├── android/               # Configuración Android
│   ├── App.tsx
│   └── package.json
│
├── database/
│   ├── schema.sql             # Estructura de BD
│   ├── seed.sql               # Datos de prueba
│   └── migrate.sh             # Script de migración
│
├── .github/
│   └── workflows/             # GitHub Actions
│
├── docker-compose.yml         # Orquestación de servicios
├── package.json               # Root package (workspaces)
├── README.md                  # Este archivo
├── CONTRIBUTING.md            # Guía de contribución
└── LICENSE                    # Licencia MIT
```

## 📚 API Documentation

### Autenticación

**Registro:**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password_123",
  "fullName": "Juan Pérez",
  "phoneNumber": "+58 412 1234567"
}

Response: 201
{
  "token": "eyJhbGc...",
  "user": { "id": "...", "email": "..." }
}
```

**Login:**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password_123"
}

Response: 200
{
  "token": "eyJhbGc...",
  "user": { "id": "...", "email": "..." }
}
```

**Autenticación Biométrica:**
```bash
POST /api/auth/biometric
Content-Type: application/json

{
  "userId": "uuid-here",
  "biometricData": "base64-encoded-data"
}

Response: 200
{
  "token": "eyJhbGc..."
}
```

### Noticias

**Obtener todas las noticias:**
```bash
GET /api/news?page=1&limit=20&category=economia

Response: 200
{
  "data": [
    {
      "id": "uuid",
      "title": "Título de la noticia",
      "content": "Contenido...",
      "author": "Carlos Mendoza",
      "category": "Economía",
      "createdAt": "2024-01-10T12:30:00Z",
      "viewsCount": 5420,
      "likesCount": 234
    }
  ],
  "pagination": { "page": 1, "limit": 20, "total": 450 }
}
```

**Crear noticia (requiere autenticación y ser periodista):**
```bash
POST /api/news
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "title": "Nueva noticia importante",
  "content": "Contenido completo de la noticia...",
  "category": "Política",
  "imageUrl": "https://..."
}

Response: 201
{
  "id": "uuid-nuevo",
  "title": "...",
  "status": "published"
}
```

### Transmisiones en Vivo

**Obtener transmisiones activas:**
```bash
GET /api/livestream?status=active

Response: 200
{
  "data": [
    {
      "id": "uuid",
      "title": "Transmisión Especial",
      "broadcaster": "Carlos Mendoza",
      "viewersCount": 5420,
      "status": "live",
      "streamUrl": "rtmp://..."
    }
  ]
}
```

**Iniciar transmisión:**
```bash
POST /api/livestream/start
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "title": "Cobertura en Vivo",
  "description": "Descripción de la transmisión"
}

Response: 201
{
  "id": "uuid",
  "streamUrl": "rtmp://...",
  "streamKey": "key-secret"
}
```

### Foros

**Obtener temas:**
```bash
GET /api/forums?category=politica&page=1

Response: 200
{
  "data": [
    {
      "id": "uuid",
      "title": "Crisis Económica: ¿Qué soluciones ves?",
      "creator": "Usuario123",
      "repliesCount": 45,
      "viewsCount": 1200
    }
  ]
}
```

**Crear tema:**
```bash
POST /api/forums
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "title": "Nuevo tema de discusión",
  "description": "Descripción del tema",
  "category": "Política"
}

Response: 201
```

### Encuestas

**Obtener encuestas:**
```bash
GET /api/polls?status=active

Response: 200
{
  "data": [
    {
      "id": "uuid",
      "question": "¿Cuál es el principal problema?",
      "options": [
        { "label": "Economía", "votes": 4500, "percent": 45 },
        { "label": "Salud", "votes": 2100, "percent": 21 }
      ],
      "totalVotes": 10000
    }
  ]
}
```

**Votar en encuesta:**
```bash
POST /api/polls/:id/vote
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "optionId": "uuid-option"
}

Response: 200
{
  "message": "Voto registrado"
}
```

### Analytics

**Dashboard del editor:**
```bash
GET /api/analytics/dashboard
Authorization: Bearer eyJhbGc...

Response: 200
{
  "totalUsers": 125430,
  "activeUsers": 42100,
  "totalNews": 8540,
  "livestreams": 320,
  "growth": {
    "daily": 1250,
    "weekly": 12500,
    "monthly": 45000
  }
}
```

## 🔐 Seguridad

### Mejores Prácticas Implementadas
1. **Validación de entrada** - Todas las entradas se validan
2. **Rate limiting** - 100 requests/15 min por IP
3. **CORS configurado** - Solo dominios autorizados
4. **HTTPS en producción** - Comunicación cifrada
5. **JWT con refresh tokens** - Tokens de corta duración
6. **Contraseñas hasheadas** - bcryptjs con 10 salts
7. **SQL Injection prevention** - Prepared statements
8. **XSS protection** - Validación de contenido
9. **CSRF tokens** - Protección en formularios
10. **Biometric auth** - Autenticación sin contraseña

## 🌍 Configuración de Producción

### Variables de Entorno Críticas
```bash
# Base de Datos
DATABASE_URL=postgresql://user:pass@host:5432/vozve

# Redis
REDIS_URL=redis://host:6379

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRATION=7d

# Firebase
FIREBASE_API_KEY=...
FIREBASE_PROJECT_ID=...

# AWS S3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=vozve-media
AWS_REGION=us-east-1

# Email
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=...

# SSL
SSL_CERT_PATH=/etc/ssl/certs/cert.pem
SSL_KEY_PATH=/etc/ssl/private/key.pem

# Node
NODE_ENV=production
API_PORT=443
```

## 📊 Modelos de Negocio

### Freemium
- **Gratis**: Acceso a noticias básicas, 1 encuesta/día
- **Premium**: Contenido exclusivo, análisis profundo, sin publicidad
- **Publicidad**: Banner y video ads para usuarios free

### Monetización
1. **Suscripciones Premium** - $9.99/mes o $99.99/año
2. **Publicidad Programática** - CPM $5-15
3. **Patrocinios Editoriales** - Contenido patrocinado claramente marcado
4. **Datos Agregados** - Venta de estadísticas anónimas

## 🤝 Contribuir

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para detalles.

## 📝 Licencia

MIT License - ver [LICENSE](./LICENSE) para más detalles.

## 📞 Contacto

- **Email**: support@vozve.app
- **Telegram**: @VozVEApp
- **Twitter**: @VozVEApp
- **Discord**: discord.gg/vozve

## 🙏 Agradecimientos

Este proyecto es posible gracias a:
- La comunidad de desarrolladores venezolanos
- Periodistas independientes comprometidos
- Todos los que creen en la libertad de expresión

---

**Hecho con ❤️ para la libertad de expresión en Venezuela**
