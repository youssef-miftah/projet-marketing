import express from 'express';
import { body } from 'express-validator';
import {
  submitBuyback,
  getMyBuybacks,
  getAllBuybacks,
  updateBuybackStatus,
} from '../controllers/buybackController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * Routes pour les demandes de rachat
 */

// Validation pour la soumission d'une demande
const buybackValidation = [
  body('typeProduit').isIn([
    'PC',
    'Laptop',
    'Serveur',
    'Téléphone',
    'Arduino/Raspberry',
    'Composant',
    'Réseau',
    'Autre',
  ]),
  body('description').notEmpty(),
  body('etat').isIn(['défectueux', 'obsolète', 'fonctionnel', 'inconnu']),
  body('prixPropose').isFloat({ min: 0 }),
];

// POST /api/buyback - Soumettre une demande (utilisateur connecté)
router.post('/', authenticate, buybackValidation, submitBuyback);

// GET /api/buyback/my-buybacks - Mes demandes (utilisateur connecté)
router.get('/my-buybacks', authenticate, getMyBuybacks);

// GET /api/buyback - Toutes les demandes (Admin uniquement)
router.get('/', authenticate, isAdmin, getAllBuybacks);

// PUT /api/buyback/:id/update-status - Mettre à jour le statut (Admin uniquement)
router.put(
  '/:id/update-status',
  authenticate,
  isAdmin,
  [
    body('statut').optional().isIn(['pending', 'accepted', 'rejected', 'completed']),
    body('prixAccepte').optional().isFloat({ min: 0 }),
  ],
  updateBuybackStatus
);

export default router;

