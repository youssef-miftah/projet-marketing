import mongoose from 'mongoose';

/**
 * Modèle Order - Commandes des clients
 * Gère les commandes avec leurs produits, quantités et statuts
 */
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Utilisateur requis'],
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'La quantité doit être au moins 1'],
        },
        price: {
          type: Number,
          required: true, // Prix au moment de la commande
        },
        nom: String, // Nom du produit au moment de la commande (pour historique)
      },
    ],
    total: {
      type: Number,
      required: [true, 'Total requis'],
      min: [0, 'Le total doit être positif'],
    },
    statut: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    adresseLivraison: {
      rue: {
        type: String,
        required: true,
      },
      ville: {
        type: String,
        required: true,
      },
      codePostal: {
        type: String,
        required: true,
      },
      pays: {
        type: String,
        required: true,
      },
    },
    numeroSuivi: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index pour améliorer les recherches
orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ statut: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;

