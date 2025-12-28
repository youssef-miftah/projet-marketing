import Product from '../models/Product.js';
import { validationResult } from 'express-validator';

/**
 * @route   GET /api/products
 * @desc    Récupérer tous les produits avec filtres optionnels
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
  try {
    const {
      categorie,
      etat,
      minPrix,
      maxPrix,
      recyclé, // Filtre spécial pour état recyclé ou upcyclé
      page = 1,
      limit = 12,
      sort = '-createdAt', // Par défaut: plus récents en premier
    } = req.query;

    // Construire le filtre
    const filter = { actif: true };

    if (categorie) {
      filter.categorie = categorie;
    }

    if (etat) {
      filter.etat = etat;
    }

    // Filtre "recyclé" : inclut recyclé et upcyclé
    if (recyclé === 'true') {
      filter.etat = { $in: ['recyclé', 'upcyclé'] };
    }

    if (minPrix || maxPrix) {
      filter.prix = {};
      if (minPrix) filter.prix.$gte = Number(minPrix);
      if (maxPrix) filter.prix.$lte = Number(maxPrix);
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Récupérer les produits
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Compter le total pour la pagination
    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/products/:id
 * @desc    Récupérer un produit par son ID
 * @access  Public
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.actif) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé',
      });
    }

    res.json({
      success: true,
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/products
 * @desc    Créer un nouveau produit (Admin uniquement)
 * @access  Private/Admin
 */
export const createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Produit créé avec succès',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/products/:id
 * @desc    Mettre à jour un produit (Admin uniquement)
 * @access  Private/Admin
 */
export const updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé',
      });
    }

    res.json({
      success: true,
      message: 'Produit mis à jour avec succès',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/products/:id
 * @desc    Supprimer un produit (Admin uniquement)
 * @access  Private/Admin
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé',
      });
    }

    res.json({
      success: true,
      message: 'Produit supprimé avec succès',
    });
  } catch (error) {
    next(error);
  }
};

