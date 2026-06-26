import express, { Router } from 'express';
import authMiddleware from '../middleware/auth';

const router: Router = express.Router();

// Rutas de livestream
router.get('/', (req, res) => {
  res.json({ message: 'Obtener transmisiones en vivo' });
});

router.post('/start', authMiddleware, (req, res) => {
  res.json({ message: 'Iniciar transmisión' });
});

router.post('/:id/stop', authMiddleware, (req, res) => {
  res.json({ message: `Detener transmisión ${req.params.id}` });
});

module.exports = router;
