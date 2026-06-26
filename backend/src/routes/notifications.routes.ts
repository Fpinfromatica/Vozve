import express, { Router } from 'express';
import authMiddleware from '../middleware/auth';

const router: Router = express.Router();

// Rutas de notificaciones
router.get('/', authMiddleware, (req, res) => {
  res.json({ message: 'Obtener notificaciones' });
});

router.post('/subscribe', authMiddleware, (req, res) => {
  res.json({ message: 'Suscripción a notificaciones registrada' });
});

module.exports = router;
