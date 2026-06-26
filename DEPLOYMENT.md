# Deployments de VozVE

## 🌐 Opciones de Deploy

### 1. DigitalOcean (Recomendado)

**Ventajas:**
- Pricing accesible ($5-20/mes)
- Droplets configurables
- App Platform para deploy automático
- Managed Database
- CDN incluido

**Setup:**
```bash
# 1. Crear Droplet Ubuntu 22.04
# 2. SSH al servidor
ssh root@your_droplet_ip

# 3. Instalar dependencias
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 4. Clone repositorio
cd /var/www
git clone https://github.com/Fpinfromatica/VozVE.git
cd VozVE

# 5. Configurar variables
cp .env.example .env
# Editar .env

# 6. Deploy con Docker
docker-compose -f docker-compose.prod.yml up -d

# 7. Configurar Nginx
sudo apt install nginx
# Copiar configuración nginx

# 8. SSL con Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d vozve.app
```

### 2. AWS (Producción a Escala)

**Servicios:**
- **EC2** - Instancias de aplicación
- **RDS** - PostgreSQL managed
- **ElastiCache** - Redis managed
- **S3** - Almacenamiento de multimedia
- **CloudFront** - CDN global
- **Route 53** - DNS
- **Lambda** - Funciones serverless
- **SES** - Email service

**Arquitectura:**
```
Route53 (DNS)
    ↓
CloudFront (CDN)
    ↓
ALB (Load Balancer)
    ↓
ECS/EC2 (App Servers)
    ↓
├─ RDS (PostgreSQL)
├─ ElastiCache (Redis)
└─ S3 (Media)
```

### 3. Heroku (Rápido pero Caro)

```bash
# Login
heroku login

# Create app
heroku create vozve-app

# Set environment variables
heroku config:set DATABASE_URL=...
heroku config:set REDIS_URL=...

# Deploy
git push heroku main

# Ver logs
heroku logs --tail
```

### 4. Vercel (Frontend)

```bash
# Deploy frontend
cd frontend
npm i -g vercel
vercel
```

## 📊 Comparativa de Hosting

| Proveedor | Backend | DB | Redis | Precio | Escala | Facilidad |
|-----------|---------|----|----- -|--------|--------|----------|
| DigitalOcean | ✅ | ✅ | ✅ | $20+ | Media | ⭐⭐⭐⭐ |
| AWS | ✅ | ✅ | ✅ | $50+ | Alto | ⭐⭐⭐ |
| Heroku | ✅ | ✅ | ✅ | $50+ | Bajo | ⭐⭐⭐⭐⭐ |
| Render | ✅ | ✅ | ⭐ | $20+ | Media | ⭐⭐⭐⭐ |
| Railway | ✅ | ✅ | ✅ | $5+ | Bajo | ⭐⭐⭐⭐ |

## 🔧 CI/CD con GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy VozVE

on:
  push:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to DigitalOcean
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.DEPLOY_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh -i ~/.ssh/id_rsa root@${{ secrets.SERVER_IP }} 'cd /var/www/VozVE && git pull && docker-compose up -d'
```

## 📱 Deploy Apps Nativas

### iOS (TestFlight → App Store)

```bash
# Build para iOS
cd mobile
eas build --platform ios

# Upload a TestFlight
eas submit --platform ios --latest

# Después de testing:
# 1. Ir a App Store Connect
# 2. Crear nueva versión
# 3. Upload build
# 4. Llenar metadata
# 5. Enviar para review
```

### Android (Google Play Store)

```bash
# Build APK/AAB
eas build --platform android

# Upload a Play Store
eas submit --platform android --latest
```

## 🔐 Certificados SSL

### Let's Encrypt (Gratuito)
```bash
sudo apt install certbot
sudo certbot certonly --standalone -d vozve.app -d www.vozve.app

# Auto-renew
sudo certbot renew --dry-run
```

### Cloudflare SSL (Gratuito)
1. Cambiar nameservers a Cloudflare
2. Activar SSL/TLS
3. Seleccionar Full (strict) mode

## 📈 Monitoreo y Alertas

### UptimeRobot (Gratuito)
- Monitoreo cada 5 minutos
- Alertas por email
- Status page pública

### Sentry (Errors)
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

### DataDog/New Relic (APM)
```bash
# Instalar agent
npm install datadog-browser-rum

# Monitorear performance
```

## 🚨 Checklist Pre-Deploy

- [ ] Variables de entorno configuradas
- [ ] BD migrada completamente
- [ ] Certificados SSL válidos
- [ ] Backups automáticos configurados
- [ ] Logs centralizados
- [ ] Rate limiting activado
- [ ] CORS configurado correctamente
- [ ] Tests pasando
- [ ] Load testing realizado
- [ ] DDoS protection activo
- [ ] Monitoring activo
- [ ] Plan de rollback
