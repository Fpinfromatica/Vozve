# VozVE Backend

API RESTful para la plataforma VozVE.

## Instalación

```bash
npm install
npm run dev
```

## Estructura

- `src/config/` - Configuración de base de datos y Redis
- `src/controllers/` - Lógica de negocio
- `src/routes/` - Definición de rutas
- `src/middleware/` - Middlewares (autenticación, etc)

## Endpoints

### Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `POST /api/auth/biometric` - Autenticación biométrica

### Noticias
- `GET /api/news` - Obtener todas las noticias
- `GET /api/news/:id` - Obtener noticia específica
- `POST /api/news` - Crear noticia

### Transmisiones
- `GET /api/livestream` - Obtener transmisiones activas
- `POST /api/livestream/start` - Iniciar transmisión
- `POST /api/livestream/:id/stop` - Detener transmisión

### Foros
- `GET /api/forums` - Obtener temas
- `POST /api/forums` - Crear tema
- `POST /api/forums/:id/comments` - Agregar comentario

### Encuestas
- `GET /api/polls` - Obtener encuestas
- `POST /api/polls` - Crear encuesta
- `POST /api/polls/:id/vote` - Votar

## Autenticación

Todos los endpoints protegidos requieren un token JWT en el header:
```
Authorization: Bearer <token>
```
