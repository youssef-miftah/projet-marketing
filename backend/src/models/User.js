import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Modèle User - Utilisateurs de la plateforme
 * Supporte les rôles : customer (par défaut) et admin
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email requis'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Email invalide'],
    },
    password: {
      type: String,
      required: [true, 'Mot de passe requis'],
      minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
      select: false, // Ne pas retourner le password par défaut
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
    nom: {
      type: String,
      trim: true,
    },
    prenom: {
      type: String,
      trim: true,
    },
    adresse: {
      rue: String,
      ville: String,
      codePostal: String,
      pays: String,
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

/**
 * Hash le mot de passe avant de sauvegarder
 */
userSchema.pre('save', async function (next) {
  // Ne hasher que si le password a été modifié
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Méthode pour comparer le mot de passe
 */
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

