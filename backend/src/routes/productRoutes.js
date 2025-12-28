import express from 'express';
import { body } from 'express-validator';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * Routes pour les produits
 */

// Validation pour la création/mise à jour de produit
const productValidation = [
  body('nom').notEmpty().trim(),
  body('description').notEmpty(),
  body('categorie').isIn([
    'PC',
    'Laptop',
    'Serveur',
    'Téléphone',
    'Arduino/Raspberry',
    'Composant',
    'Réseau',
  ]),
  body('etat').isIn(['reconditionné', 'recyclé', 'upcyclé']),
  body('prix').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 }),
  body('origine').notEmpty(),
];

// GET /api/products - Liste des produits (avec filtres)
router.get('/', getProducts);

// GET /api/products/:id - Détails d'un produit
router.get('/:id', getProductById);

// Routes protégées (Admin uniquement)
router.post('/', authenticate, isAdmin, productValidation, createProduct);
router.put('/:id', authenticate, isAdmin, productValidation, updateProduct);
router.delete('/:id', authenticate, isAdmin, deleteProduct);

export default router;

