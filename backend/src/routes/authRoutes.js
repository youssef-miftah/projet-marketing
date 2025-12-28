import express from 'express';
import { body } from 'express-validator';
import { register, login, getMe } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * Routes d'authentification
 */

// Validation pour l'inscription
const registerValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('nom').optional().trim(),
  body('prenom').optional().trim(),
];

// Validation pour la connexion
const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

// POST /api/auth/register - Inscription
router.post('/register', registerValidation, register);

// POST /api/auth/login - Connexion
router.post('/login', loginValidation, login);

// GET /api/auth/me - Informations utilisateur connecté
router.get('/me', authenticate, getMe);

export default router;

