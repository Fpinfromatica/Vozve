import express, { Router } from 'express';
import authMiddleware from '../middleware/auth';

const router: Router = express.Router();

// Rutas de foros
router.get('/', (req, res) => {
  res.json({ message: 'Obtener temas de foro' });
});

router.post('/', authMiddleware, (req, res) => {
  res.json({ message: 'Crear tema en foro' });
});

router.post('/:id/comments', authMiddleware, (req, res) => {
  res.json({ message: `Agregar comentario al tema ${req.params.id}` });
});

module.exports = router;
