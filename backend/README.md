# Backend - Recycled Tech API

API REST pour la plateforme e-commerce de matériel informatique recyclé.

## Installation

1. Installer les dépendances :
```bash
npm install
```

2. Configurer les variables d'environnement :
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

3. Démarrer MongoDB (localement ou utiliser MongoDB Atlas)

4. Lancer le serveur :
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

## Structure

- `src/models/` - Modèles Mongoose (User, Product, Order, Buyback)
- `src/controllers/` - Contrôleurs (logique métier)
- `src/routes/` - Définition des routes
- `src/middleware/` - Middlewares (auth, error handling)
- `src/config/` - Configuration (database)

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Informations utilisateur (protégé)

### Produits
- `GET /api/products` - Liste des produits (filtres: categorie, etat, minPrix, maxPrix, recyclé)
- `GET /api/products/:id` - Détails d'un produit
- `POST /api/products` - Créer un produit (Admin)
- `PUT /api/products/:id` - Mettre à jour un produit (Admin)
- `DELETE /api/products/:id` - Supprimer un produit (Admin)

### Commandes
- `POST /api/orders` - Créer une commande (protégé)
- `GET /api/orders/my-orders` - Mes commandes (protégé)
- `GET /api/orders/:id` - Détails d'une commande (protégé)

### Rachat
- `POST /api/buyback` - Soumettre une demande de rachat (protégé)
- `GET /api/buyback/my-buybacks` - Mes demandes (protégé)
- `GET /api/buyback` - Toutes les demandes (Admin)
- `PUT /api/buyback/:id/update-status` - Mettre à jour le statut (Admin)

## Authentification

Les routes protégées nécessitent un header :
```
Authorization: Bearer <JWT_TOKEN>
```

## Format des réponses

Succès :
```json
{
  "success": true,
  "data": { ... }
}
```

Erreur :
```json
{
  "success": false,
  "message": "Message d'erreur"
}
```

