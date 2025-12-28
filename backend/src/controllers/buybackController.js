import Buyback from '../models/Buyback.js';
import { validationResult } from 'express-validator';

/**
 * @route   POST /api/buyback
 * @desc    Soumettre une demande de rachat
 * @access  Private
 */
export const submitBuyback = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const buyback = await Buyback.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Demande de rachat soumise avec succès',
      data: { buyback },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/buyback/my-buybacks
 * @desc    Récupérer les demandes de rachat de l'utilisateur connecté
 * @access  Private
 */
export const getMyBuybacks = async (req, res, next) => {
  try {
    const buybacks = await Buyback.find({ userId: req.user.id })
      .sort('-createdAt')
      .populate('adminId', 'email nom prenom');

    res.json({
      success: true,
      data: { buybacks },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/buyback
 * @desc    Récupérer toutes les demandes de rachat (Admin uniquement)
 * @access  Private/Admin
 */
export const getAllBuybacks = async (req, res, next) => {
  try {
    const { statut } = req.query;
    const filter = statut ? { statut } : {};

    const buybacks = await Buyback.find(filter)
      .sort('-createdAt')
      .populate('userId', 'email nom prenom')
      .populate('adminId', 'email nom prenom');

    res.json({
      success: true,
      data: { buybacks },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/buyback/:id/update-status
 * @desc    Mettre à jour le statut d'une demande de rachat (Admin uniquement)
 * @access  Private/Admin
 */
export const updateBuybackStatus = async (req, res, next) => {
  try {
    const { statut, prixAccepte, commentaireAdmin } = req.body;

    const buyback = await Buyback.findById(req.params.id);

    if (!buyback) {
      return res.status(404).json({
        success: false,
        message: 'Demande de rachat non trouvée',
      });
    }

    // Mettre à jour les champs
    if (statut) buyback.statut = statut;
    if (prixAccepte !== undefined) buyback.prixAccepte = prixAccepte;
    if (commentaireAdmin) buyback.commentaireAdmin = commentaireAdmin;
    buyback.adminId = req.user.id;

    await buyback.save();

    res.json({
      success: true,
      message: 'Statut de la demande mis à jour',
      data: { buyback },
    });
  } catch (error) {
    next(error);
  }
};

