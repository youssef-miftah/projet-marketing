# Guide de Démarrage Rapide

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

## 🚀 Installation et Configuration

### 1. Backend

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env (copier env.example.txt et renommer en .env)
# Puis éditer avec vos valeurs :
# - MONGODB_URI : URL de votre base MongoDB
# - JWT_SECRET : Clé secrète pour les tokens JWT
# - PORT : Port du serveur (défaut: 5000)
# - FRONTEND_URL : URL du frontend (défaut: http://localhost:3000)

# Démarrer MongoDB (si local)
# Windows: net start MongoDB
# Mac/Linux: sudo systemctl start mongod

# Lancer le serveur en mode développement
npm run dev

# Dans un autre terminal, créer les données initiales (admin + produits d'exemple)
npm run seed
```

Le serveur API sera accessible sur `http://localhost:5000`

### 2. Tester l'API

Une fois le serveur démarré, vous pouvez tester :

```bash
# Vérifier que le serveur fonctionne
curl http://localhost:5000/api/health

# Inscription d'un utilisateur
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","nom":"Test","prenom":"User"}'

# Connexion
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Récupérer les produits
curl http://localhost:5000/api/products
```

## 👤 Compte Admin par défaut

Après avoir exécuté `npm run seed`, un compte admin est créé :

- **Email** : `admin@recycled-tech.com`
- **Mot de passe** : `admin123`

⚠️ **Important** : Changez ce mot de passe en production !

## 📁 Structure du Backend

```
backend/
├── src/
│   ├── models/          # Modèles Mongoose
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Buyback.js
│   ├── controllers/     # Logique métier
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   └── buybackController.js
│   ├── routes/          # Routes API
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   └── buybackRoutes.js
│   ├── middleware/      # Middlewares
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── config/          # Configuration
│   │   └── database.js
│   ├── scripts/         # Scripts utilitaires
│   │   └── seed.js
│   └── app.js           # Point d'entrée
├── package.json
├── env.example.txt      # Exemple de variables d'environnement
└── README.md
```

## 🔌 Endpoints API Principaux

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Infos utilisateur (protégé)

### Produits
- `GET /api/products` - Liste (filtres: `?categorie=PC&etat=reconditionné&minPrix=100&maxPrix=500&recyclé=true`)
- `GET /api/products/:id` - Détails
- `POST /api/products` - Créer (Admin)
- `PUT /api/products/:id` - Modifier (Admin)
- `DELETE /api/products/:id` - Supprimer (Admin)

### Commandes
- `POST /api/orders` - Créer commande (protégé)
- `GET /api/orders/my-orders` - Mes commandes (protégé)
- `GET /api/orders/:id` - Détails commande (protégé)

### Rachat
- `POST /api/buyback` - Soumettre demande (protégé)
- `GET /api/buyback/my-buybacks` - Mes demandes (protégé)
- `GET /api/buyback` - Toutes les demandes (Admin)
- `PUT /api/buyback/:id/update-status` - Mettre à jour statut (Admin)

## 🔐 Authentification

Pour les routes protégées, ajouter le header :
```
Authorization: Bearer <JWT_TOKEN>
```

Le token est retourné lors de l'inscription/connexion.

## 📝 Prochaines Étapes

1. ✅ Backend créé et fonctionnel
2. ⏭️ Frontend Next.js (à venir)
3. ⏭️ Upload d'images (multer configuré mais routes à créer)
4. ⏭️ Tests unitaires
5. ⏭️ Déploiement

## 🐛 Dépannage

### Erreur de connexion MongoDB
- Vérifier que MongoDB est démarré
- Vérifier l'URL dans `.env` (MONGODB_URI)
- Pour MongoDB Atlas, vérifier les IPs autorisées

### Erreur "Cannot find module"
- Exécuter `npm install` dans le dossier backend
- Vérifier que vous utilisez Node.js v18+

### Port déjà utilisé
- Changer le PORT dans `.env`
- Ou arrêter le processus utilisant le port 5000

## 📚 Documentation

- [Architecture complète](./ARCHITECTURE.md)
- [Documentation API Backend](./backend/README.md)

