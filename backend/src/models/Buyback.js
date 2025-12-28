import mongoose from 'mongoose';

/**
 * Modèle Buyback - Demandes de rachat de matériel
 * Les clients proposent leur matériel, les admins valident et fixent le prix
 */
const buybackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Utilisateur requis'],
    },
    typeProduit: {
      type: String,
      required: [true, 'Type de produit requis'],
      enum: [
        'PC',
        'Laptop',
        'Serveur',
        'Téléphone',
        'Arduino/Raspberry',
        'Composant',
        'Réseau',
        'Autre',
      ],
    },
    description: {
      type: String,
      required: [true, 'Description requise'],
    },
    etat: {
      type: String,
      required: [true, 'État du matériel requis'],
      enum: ['défectueux', 'obsolète', 'fonctionnel', 'inconnu'],
    },
    photos: {
      type: [String], // Tableau d'URLs de photos
      default: [],
    },
    prixPropose: {
      type: Number,
      required: [true, 'Prix proposé requis'],
      min: [0, 'Le prix proposé doit être positif'],
    },
    prixAccepte: {
      type: Number,
      default: null, // Fixé par l'admin
    },
    statut: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed'],
      default: 'pending',
    },
    commentaireAdmin: {
      type: String,
      default: '',
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // Admin qui a traité la demande
    },
  },
  {
    timestamps: true,
  }
);

// Index pour améliorer les recherches
buybackSchema.index({ userId: 1, createdAt: -1 });
buybackSchema.index({ statut: 1 });

const Buyback = mongoose.model('Buyback', buybackSchema);

export default Buyback;

