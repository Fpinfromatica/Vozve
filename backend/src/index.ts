import express, { Express, Request, Response } from 'express';
import cors from 'express-cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app: Express = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.API_PORT || 3000;
const HOST = process.env.API_HOST || 'localhost';

// Middleware de seguridad
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 requests por ventana
});
app.use('/api/', limiter);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));
app.use('/api/news', require('./routes/news.routes'));
app.use('/api/livestream', require('./routes/livestream.routes'));
app.use('/api/forums', require('./routes/forums.routes'));
app.use('/api/polls', require('./routes/polls.routes'));
app.use('/api/subscriptions', require('./routes/subscriptions.routes'));
app.use('/api/analytics', require('./routes/analytics.routes'));
app.use('/api/notifications', require('./routes/notifications.routes'));

// WebSocket events para transmisiones en vivo
io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on('join_livestream', (streamId) => {
    socket.join(`livestream_${streamId}`);
    console.log(`Usuario ${socket.id} unido al livestream ${streamId}`);
  });

  socket.on('send_comment', (data) => {
    io.to(`livestream_${data.streamId}`).emit('new_comment', data);
  });

  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });
});

// Error handling
app.use((err: any, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});

httpServer.listen(PORT, () => {
  console.log(`✅ VozVE Backend ejecutándose en http://${HOST}:${PORT}`);
  console.log(`📊 WebSocket escuchando en ws://${HOST}:${PORT}`);
});

module.exports = app;
