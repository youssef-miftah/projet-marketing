import mongoose from 'mongoose';

/**
 * Modèle Product - Produits vendus sur la plateforme
 * Catégories : PC, Laptop, Serveur, Téléphone, Arduino/Raspberry, Composant, Réseau
 * États : reconditionné, recyclé, upcyclé
 */
const productSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, 'Nom du produit requis'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description requise'],
    },
    categorie: {
      type: String,
      required: [true, 'Catégorie requise'],
      enum: [
        'PC',
        'Laptop',
        'Serveur',
        'Téléphone',
        'Arduino/Raspberry',
        'Composant',
        'Réseau',
      ],
    },
    etat: {
      type: String,
      required: [true, 'État requis'],
      enum: ['reconditionné', 'recyclé', 'upcyclé'],
    },
    prix: {
      type: Number,
      required: [true, 'Prix requis'],
      min: [0, 'Le prix doit être positif'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock requis'],
      min: [0, 'Le stock doit être positif ou nul'],
      default: 0,
    },
    images: {
      type: [String], // Tableau d'URLs d'images
      default: [],
    },
    origine: {
      type: String,
      required: [true, 'Origine du matériel requise'],
      description: 'Description de l\'origine du matériel (ex: "PC d\'entreprise reconditionné")',
    },
    impactEcologique: {
      co2Economise: {
        type: Number, // en kg CO2
        default: 0,
      },
      description: {
        type: String,
        default: '',
      },
    },
    specifications: {
      type: Map,
      of: String, // Ex: { "RAM": "8GB", "Stockage": "256GB SSD" }
      default: {},
    },
    actif: {
      type: Boolean,
      default: true, // Permet de désactiver un produit sans le supprimer
    },
  },
  {
    timestamps: true,
  }
);

// Index pour améliorer les performances de recherche
productSchema.index({ categorie: 1, etat: 1 });
productSchema.index({ prix: 1 });
productSchema.index({ actif: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;

