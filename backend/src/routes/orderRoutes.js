import express from 'express';
import { body } from 'express-validator';
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * Routes pour les commandes
 */

// Validation pour la création d'une commande
const orderValidation = [
  body('products').isArray({ min: 1 }),
  body('products.*.productId').isMongoId(),
  body('products.*.quantity').isInt({ min: 1 }),
  body('adresseLivraison.rue').notEmpty(),
  body('adresseLivraison.ville').notEmpty(),
  body('adresseLivraison.codePostal').notEmpty(),
  body('adresseLivraison.pays').notEmpty(),
];

// POST /api/orders - Créer une commande (utilisateur connecté)
router.post('/', authenticate, orderValidation, createOrder);

// GET /api/orders/my-orders - Mes commandes (utilisateur connecté)
router.get('/my-orders', authenticate, getMyOrders);

// GET /api/orders/:id - Détails d'une commande (utilisateur connecté ou admin)
router.get('/:id', authenticate, getOrderById);

export default router;

