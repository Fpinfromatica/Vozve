import express, { Router } from 'express';
import authMiddleware from '../middleware/auth';

const router: Router = express.Router();

// Rutas de encuestas
router.get('/', (req, res) => {
  res.json({ message: 'Obtener encuestas' });
});

router.post('/', authMiddleware, (req, res) => {
  res.json({ message: 'Crear encuesta' });
});

router.post('/:id/vote', authMiddleware, (req, res) => {
  res.json({ message: `Votar en encuesta ${req.params.id}` });
});

module.exports = router;
