# 🚀 Comment faire marcher l'application

Guide complet pour démarrer l'application Recycled Tech.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure) - [Télécharger](https://nodejs.org/)
- **MongoDB** (local ou compte MongoDB Atlas gratuit) - [Télécharger](https://www.mongodb.com/try/download/community) ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** (inclus avec Node.js) ou **yarn**

Vérifier les installations :
```bash
node --version
npm --version
mongod --version  # Si MongoDB est installé localement
```

## 🔧 Installation

### 1. Backend

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Créer le fichier .env
# Copier env.example.txt et le renommer en .env
# Windows PowerShell:
Copy-Item env.example.txt .env
# Linux/Mac:
cp env.example.txt .env

# Éditer le fichier .env avec vos valeurs
# Ouvrir .env et modifier :
# - MONGODB_URI : URL de votre base MongoDB
#   Local: mongodb://localhost:27017/recycled-tech
#   Atlas: mongodb+srv://username:password@cluster.mongodb.net/recycled-tech
# - JWT_SECRET : Une clé secrète aléatoire (ex: ma-super-cle-secrete-123)
# - PORT : Port du serveur (défaut: 5000)
# - FRONTEND_URL : http://localhost:3000
```

### 2. Frontend

```bash
# Retourner à la racine du projet
cd ..

# Aller dans le dossier frontend
cd frontend

# Installer les dépendances
npm install

# Créer le fichier .env.local
# Copier env.example.txt et le renommer en .env.local
# Windows PowerShell:
Copy-Item env.example.txt .env.local
# Linux/Mac:
cp env.example.txt .env.local

# Éditer .env.local et vérifier :
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🗄️ Configuration MongoDB

### Option 1 : MongoDB Local

1. **Installer MongoDB** sur votre machine
2. **Démarrer MongoDB** :
   - Windows : Le service démarre automatiquement, ou `net start MongoDB`
   - Mac/Linux : `sudo systemctl start mongod` ou `brew services start mongodb-community`
3. **Vérifier** : MongoDB doit être accessible sur `mongodb://localhost:27017`

### Option 2 : MongoDB Atlas (Recommandé pour débuter)

1. Créer un compte gratuit sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Créer un cluster gratuit
3. Créer un utilisateur de base de données
4. Autoriser votre IP (ou 0.0.0.0/0 pour le développement)
5. Récupérer la chaîne de connexion
6. Mettre à jour `MONGODB_URI` dans `backend/.env`

## ▶️ Démarrer l'application

### Terminal 1 : Backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

Vous devriez voir :
```
✅ MongoDB connecté : ...
🚀 Serveur démarré sur le port 5000
```

### Terminal 2 : Créer les données initiales (optionnel)

```bash
cd backend
npm run seed
```

Cela crée :
- Un compte admin : `admin@recycled-tech.com` / `admin123`
- 5 produits d'exemple

### Terminal 3 : Frontend

```bash
cd frontend
npm run dev
```

Le frontend démarre sur `http://localhost:3000`

## 🌐 Accéder à l'application

1. **Frontend** : Ouvrir [http://localhost:3000](http://localhost:3000)
2. **Backend API** : [http://localhost:5000/api/health](http://localhost:5000/api/health)

## 👤 Comptes par défaut

Après avoir exécuté `npm run seed` :

- **Admin** :
  - Email : `admin@recycled-tech.com`
  - Mot de passe : `admin123`
  - Accès : Back-office admin

## 🧪 Tester l'application

### 1. Tester le backend

```bash
# Vérifier que le serveur fonctionne
curl http://localhost:5000/api/health

# Inscription
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\",\"nom\":\"Test\",\"prenom\":\"User\"}"

# Connexion
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"

# Récupérer les produits
curl http://localhost:5000/api/products
```

### 2. Tester le frontend

1. Ouvrir [http://localhost:3000](http://localhost:3000)
2. Parcourir le catalogue
3. S'inscrire / Se connecter
4. Ajouter des produits au panier
5. Passer une commande
6. Se connecter en admin pour gérer les produits et les rachats

## 📁 Structure du projet

```
projet-marketing/
├── backend/              # API Node.js + Express
│   ├── src/
│   │   ├── models/      # Modèles MongoDB
│   │   ├── controllers/ # Logique métier
│   │   ├── routes/      # Routes API
│   │   ├── middleware/  # Middlewares
│   │   └── app.js       # Point d'entrée
│   ├── package.json
│   └── .env             # Variables d'environnement
│
├── frontend/            # Application Next.js
│   ├── src/
│   │   ├── app/         # Pages Next.js
│   │   ├── components/  # Composants React
│   │   ├── context/     # Context API
│   │   └── lib/         # Utilitaires
│   ├── package.json
│   └── .env.local       # Variables d'environnement
│
└── README.md
```

## 🐛 Problèmes courants

### Erreur : "Cannot find module"
```bash
# Réinstaller les dépendances
cd backend && npm install
cd ../frontend && npm install
```

### Erreur : "MongoDB connection failed"
- Vérifier que MongoDB est démarré
- Vérifier l'URL dans `backend/.env` (MONGODB_URI)
- Pour MongoDB Atlas : vérifier les IPs autorisées

### Erreur : "Port already in use"
- Changer le PORT dans `backend/.env`
- Ou arrêter le processus utilisant le port

### Le frontend ne se connecte pas au backend
- Vérifier que le backend tourne sur le port 5000
- Vérifier `NEXT_PUBLIC_API_URL` dans `frontend/.env.local`
- Vérifier les CORS dans `backend/src/app.js`

## 📚 Documentation

- [Architecture](./ARCHITECTURE.md)
- [Guide de démarrage](./GUIDE_DEMARRAGE.md)
- [Backend README](./backend/README.md)

## ✅ Checklist de démarrage

- [ ] Node.js installé
- [ ] MongoDB configuré (local ou Atlas)
- [ ] Backend : `npm install` effectué
- [ ] Backend : `.env` créé et configuré
- [ ] Backend : `npm run dev` fonctionne
- [ ] Backend : `npm run seed` exécuté
- [ ] Frontend : `npm install` effectué
- [ ] Frontend : `.env.local` créé
- [ ] Frontend : `npm run dev` fonctionne
- [ ] Application accessible sur http://localhost:3000

## 🎉 C'est prêt !

Votre application est maintenant opérationnelle. Vous pouvez :
- Parcourir le catalogue
- Créer un compte
- Ajouter des produits au panier
- Passer une commande
- Vendre votre matériel
- Gérer les produits (admin)
- Gérer les rachats (admin)

Bon développement ! 🚀

