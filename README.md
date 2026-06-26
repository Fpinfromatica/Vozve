# VozVE - Periodismo Sin Censura

![VozVE](https://img.shields.io/badge/VozVE-News%20App-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-In%20Development-yellow)

## 📱 Descripción

VozVE es una plataforma de noticias en tiempo real sobre Venezuela que permite a periodistas y ciudadanos compartir información veraz sin censura. La app proporciona:

- 📰 Noticias en tiempo real
- 🎥 Transmisiones en directo (Live Streaming)
- 💬 Foros y debates activos
- 📊 Encuestas de opinión pública
- 📈 Análisis y estadísticas
- 🔐 Autenticación biométrica segura
- 🌍 Soporte multiidioma
- 💳 Sistema de suscripciones premium
- 📲 Notificaciones push personalizadas

## 🚀 Stack Tecnológico

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL** (Base de datos principal)
- **Redis** (Cache y sesiones)
- **Socket.io** (WebSockets para transmisiones en vivo)
- **JWT** (Autenticación)
- **Firebase Cloud Messaging** (Push Notifications)

### Frontend Web
- **React 18**
- **TypeScript**
- **Redux Toolkit** (State Management)
- **Material-UI** (Componentes UI)
- **Axios** (HTTP Client)
- **Chart.js** (Gráficos y Analytics)

### Apps Nativas
- **React Native**
- **Expo** (para desarrollo rápido)
- **React Navigation** (Navegación)
- **Firebase** (Autenticación biométrica)
- **react-native-video** (Streaming)

## 📁 Estructura del Proyecto

```
VozVE/
├── backend/              # API RESTful
│   ├── src/
│   │   ├── config/      # Configuración
│   │   ├── controllers/ # Lógica de negocio
│   │   ├── models/      # Modelos de datos
│   │   ├── routes/      # Rutas API
│   │   ├── middleware/  # Middlewares
│   │   └── utils/       # Funciones auxiliares
│   └── package.json
├── frontend/            # App Web (React)
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas
│   │   ├── store/       # Redux Store
│   │   ├── hooks/       # Custom Hooks
│   │   └── styles/      # Estilos
│   └── package.json
├── mobile/              # Apps Nativas (React Native)
│   ├── ios/            # Configuración iOS
│   ├── android/        # Configuración Android
│   └── src/
│       ├── screens/    # Pantallas
│       ├── components/ # Componentes
│       └── navigation/ # Navegación
└── docker-compose.yml  # Orquestación de servicios
```

## 🔧 Instalación

### Requisitos
- Node.js 18+
- Docker y Docker Compose
- PostgreSQL 15
- Redis 7

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/Fpinfromatica/VozVE.git
cd VozVE
```

2. **Levantar servicios con Docker**
```bash
docker-compose up -d
```

3. **Configurar Backend**
```bash
cd backend
npm install
npm run migrate
npm start
```

4. **Configurar Frontend**
```bash
cd ../frontend
npm install
npm start
```

5. **Configurar Mobile**
```bash
cd ../mobile
npm install
npx expo start
```

## 📚 Documentación

See detailed documentation in:
- [Backend API Docs](./backend/README.md)
- [Frontend Setup](./frontend/README.md)
- [Mobile Setup](./mobile/README.md)

## 🔐 Seguridad

- Autenticación JWT con refresh tokens
- Biometría (Face ID / Touch ID)
- Encriptación end-to-end para mensajes privados
- Rate limiting en API
- CORS configurado

## 💳 Monetización

### Modelo Freemium
- **Gratis**: Acceso a noticias básicas, 1 encuesta/día
- **Premium**: Contenido exclusivo, análisis profundo, sin publicidad
- **Publicidad**: Banner y video ads para usuarios free

## 🤝 Contribuir

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para detalles.

## 📄 Licencia

MIT License - ver [LICENSE](./LICENSE) para más detalles.

## 📞 Soporte

- Email: support@vozve.app
- Telegram: @VozVEApp
- WhatsApp: +58 XXXX XXXX

---

**Hecho con ❤️ para la libertad de expresión en Venezuela**
