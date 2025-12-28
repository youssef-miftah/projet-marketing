# Architecture du Projet - E-commerce Matériel Informatique Recyclé

## Vue d'ensemble

Projet monorepo avec séparation claire entre frontend et backend.

```
projet-marketing/
├── backend/          # API REST Node.js + Express
├── frontend/         # Application Next.js
└── docs/            # Documentation
```

## Backend (Node.js + Express)

### Structure MVC

```
backend/
├── src/
│   ├── models/          # Modèles Mongoose (User, Product, Order, Buyback)
│   ├── controllers/     # Logique métier
│   ├── routes/          # Définition des routes
│   ├── middleware/      # Middlewares (auth, validation, error handling)
│   ├── config/          # Configuration (DB, env)
│   ├── utils/           # Utilitaires (helpers, constants)
│   └── app.js           # Point d'entrée Express
├── package.json
└── .env
```

### Modèles de données

1. **User** (Utilisateur)
   - email, password (hashé)
   - role (customer, admin)
   - nom, prénom, adresse
   - createdAt, updatedAt

2. **Product** (Produit)
   - nom, description
   - catégorie (PC, Laptop, Serveur, Téléphone, Arduino/Raspberry, Composant, Réseau)
   - état (reconditionné, recyclé, upcyclé)
   - prix, stock
   - images (tableau d'URLs)
   - origine (description de l'origine du matériel)
   - impactEcologique (CO2 économisé, etc.)
   - createdAt, updatedAt

3. **Order** (Commande)
   - userId (référence User)
   - products (tableau de {productId, quantity, price})
   - total
   - statut (pending, confirmed, shipped, delivered, cancelled)
   - adresseLivraison
   - createdAt, updatedAt

4. **Buyback** (Rachat de matériel)
   - userId (référence User)
   - typeProduit
   - description, état
   - photos (tableau d'URLs)
   - prixProposé (par le client)
   - prixAccepté (par l'admin)
   - statut (pending, accepted, rejected, completed)
   - createdAt, updatedAt

### Routes API

- `/api/auth` - Authentification (register, login, logout)
- `/api/products` - Produits (GET list, GET by id, POST create, PUT update, DELETE)
- `/api/orders` - Commandes (GET user orders, POST create order)
- `/api/buyback` - Rachat (POST submit, GET user buybacks, PUT admin update)

## Frontend (Next.js)

### Structure

```
frontend/
├── src/
│   ├── app/              # App Router Next.js 13+
│   │   ├── (auth)/       # Routes d'authentification
│   │   ├── (shop)/       # Routes boutique
│   │   ├── admin/        # Back-office admin
│   │   └── layout.tsx    # Layout principal
│   ├── components/        # Composants réutilisables
│   │   ├── common/       # Composants génériques
│   │   ├── product/      # Composants produits
│   │   └── layout/       # Header, Footer, etc.
│   ├── lib/              # Utilitaires, API client
│   ├── hooks/            # Custom hooks React
│   ├── context/          # Context API (Auth, Cart)
│   └── types/            # Types TypeScript
├── public/               # Assets statiques
└── package.json
```

### Pages principales

1. `/` - Page d'accueil (mission écologique + produits phares)
2. `/products` - Catalogue avec filtres
3. `/products/[id]` - Fiche produit détaillée
4. `/sell` - Formulaire de rachat
5. `/cart` - Panier
6. `/checkout` - Commande
7. `/login` - Connexion
8. `/register` - Inscription
9. `/admin/*` - Back-office (produits, rachats)

## Base de données

**MongoDB** avec Mongoose ODM

- Collections : users, products, orders, buybacks
- Indexes sur email (users), catégorie/état (products)

## Sécurité

- JWT pour l'authentification
- Bcrypt pour le hashage des mots de passe
- Validation des données (express-validator)
- CORS configuré
- Rate limiting sur les routes sensibles

## Technologies

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcrypt
- Express Validator
- CORS
- Dotenv

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS (pour le styling)
- Axios (pour les appels API)
- React Hook Form (formulaires)

## Déploiement futur

- Backend : Heroku, Railway, ou Vercel (serverless)
- Frontend : Vercel
- Base de données : MongoDB Atlas

