import express, { Router } from 'express';
import authMiddleware from '../middleware/auth';

const router: Router = express.Router();

// Rutas de suscripciones
router.get('/plans', (req, res) => {
  res.json({
    plans: [
      { id: 'free', name: 'Gratis', price: 0 },
      { id: 'premium', name: 'Premium', price: 9.99 }
    ]
  });
});

router.post('/subscribe', authMiddleware, (req, res) => {
  res.json({ message: 'Suscripción creada' });
});

module.exports = router;
