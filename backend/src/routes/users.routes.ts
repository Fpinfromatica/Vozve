import express, { Router } from 'express';
import authMiddleware from '../middleware/auth';

const router: Router = express.Router();

// Rutas de usuarios
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Perfil de usuario' });
});

router.put('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Perfil actualizado' });
});

module.exports = router;
