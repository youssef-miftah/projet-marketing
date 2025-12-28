import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { validationResult } from 'express-validator';

/**
 * @route   POST /api/orders
 * @desc    Créer une nouvelle commande
 * @access  Private
 */
export const createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { products, adresseLivraison } = req.body;

    // Vérifier que tous les produits existent et sont disponibles
    let total = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product || !product.actif) {
        return res.status(404).json({
          success: false,
          message: `Produit ${item.productId} non trouvé ou indisponible`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Stock insuffisant pour ${product.nom}`,
        });
      }

      const itemTotal = product.prix * item.quantity;
      total += itemTotal;

      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.prix,
        nom: product.nom,
      });

      // Réduire le stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Créer la commande
    const order = await Order.create({
      userId: req.user.id,
      products: orderProducts,
      total,
      adresseLivraison,
    });

    res.status(201).json({
      success: true,
      message: 'Commande créée avec succès',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/orders/my-orders
 * @desc    Récupérer les commandes de l'utilisateur connecté
 * @access  Private
 */
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort('-createdAt')
      .populate('products.productId', 'nom images');

    res.json({
      success: true,
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/orders/:id
 * @desc    Récupérer une commande par son ID
 * @access  Private
 */
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.productId', 'nom images description')
      .populate('userId', 'email nom prenom');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée',
      });
    }

    // Vérifier que l'utilisateur est propriétaire ou admin
    if (order.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Accès refusé',
      });
    }

    res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

