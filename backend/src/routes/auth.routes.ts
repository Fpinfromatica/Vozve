import express, { Router } from 'express';
import authController from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.post('/biometric', (req, res) => authController.biometricAuth(req, res));

module.exports = router;
