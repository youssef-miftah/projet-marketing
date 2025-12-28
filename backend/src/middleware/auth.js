import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Middleware d'authentification JWT
 * Vérifie le token et ajoute l'utilisateur à req.user
 */
export const authenticate = async (req, res, next) => {
  try {
    // Récupérer le token depuis le header Authorization
    const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token d\'authentification manquant',
      });
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupérer l'utilisateur (sans le password)
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Utilisateur non trouvé',
      });
    }

    // Ajouter l'utilisateur à la requête
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token invalide',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expiré',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur d\'authentification',
      error: error.message,
    });
  }
};

/**
 * Middleware pour vérifier le rôle admin
 * Doit être utilisé après authenticate
 */
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Accès refusé. Droits administrateur requis.',
    });
  }
};

