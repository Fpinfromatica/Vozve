import express, { Router } from 'express';
import multer from 'multer';
import authMiddleware from '../middleware/auth';
import missingPersonsController from '../controllers/missing_persons.controller';

const router: Router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Obtener todas las personas desaparecidas
router.get('/', (req, res) => {
  missingPersonsController.getAllMissingPersons(req, res);
});

// Obtener persona desaparecida por ID
router.get('/:id', (req, res) => {
  missingPersonsController.getMissingPersonById(req, res);
});

// Crear reporte de persona desaparecida
router.post('/', authMiddleware, (req, res) => {
  missingPersonsController.createMissingPersonReport(req, res);
});

// Subir foto de persona desaparecida
router.post('/:missingPersonId/photo', authMiddleware, upload.single('photo'), (req, res) => {
  missingPersonsController.uploadMissingPersonPhoto(req, res);
});

// Enviar pista
router.post('/:missingPersonId/tips', (req, res) => {
  missingPersonsController.submitTip(req, res);
});

// Obtener pistas
router.get('/:missingPersonId/tips', (req, res) => {
  missingPersonsController.getTips(req, res);
});

// Registrar como voluntario
router.post('/:missingPersonId/volunteer', authMiddleware, (req, res) => {
  missingPersonsController.registerSearchVolunteer(req, res);
});

// Obtener estadísticas del caso
router.get('/:missingPersonId/statistics', (req, res) => {
  missingPersonsController.getCaseStatistics(req, res);
});

// Resolver caso
router.put('/:missingPersonId/resolve', authMiddleware, (req, res) => {
  missingPersonsController.resolveMissingPersonCase(req, res);
});

module.exports = router;
