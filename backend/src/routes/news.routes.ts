import express, { Router } from 'express';

const router: Router = express.Router();

// Rutas de noticias
router.get('/', (req, res) => {
  res.json({ message: 'Obtener todas las noticias' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Obtener noticia ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Crear noticia' });
});

module.module = router;
