import express, { Router } from 'express';
import authMiddleware from '../middleware/auth';

const router: Router = express.Router();

// Rutas de análisis
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    totalUsers: 5000,
    activeUsers: 1200,
    totalNews: 450,
    livestreams: 12
  });
});

router.get('/news/:id', (req, res) => {
  res.json({ message: `Análisis de noticia ${req.params.id}` });
});

module.exports = router;
