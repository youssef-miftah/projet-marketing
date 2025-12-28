# 🚀 Démarrage Rapide - Recycled Tech

## Étape 1 : Installer les dépendances

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## Étape 2 : Configurer MongoDB

**Option A : MongoDB Local**
- Installer MongoDB
- Démarrer MongoDB (le service démarre automatiquement sur Windows)

**Option B : MongoDB Atlas (Recommandé)**
- Créer un compte gratuit sur https://www.mongodb.com/cloud/atlas
- Créer un cluster gratuit
- Récupérer la chaîne de connexion

## Étape 3 : Configurer les variables d'environnement

### Backend
```bash
cd backend
# Copier env.example.txt vers .env
Copy-Item env.example.txt .env  # Windows PowerShell
# ou
cp env.example.txt .env  # Linux/Mac
```

Éditer `backend/.env` :
```env
MONGODB_URI=mongodb://localhost:27017/recycled-tech
# ou pour Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recycled-tech

JWT_SECRET=votre-cle-secrete-aleatoire
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend
```bash
cd frontend
# Copier env.example.txt vers .env.local
Copy-Item env.example.txt .env.local  # Windows PowerShell
# ou
cp env.example.txt .env.local  # Linux/Mac
```

Le fichier `.env.local` devrait contenir :
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Étape 4 : Démarrer l'application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Attendre de voir :
```
✅ MongoDB connecté : ...
🚀 Serveur démarré sur le port 5000
```

### Terminal 2 - Créer les données initiales (optionnel)
```bash
cd backend
npm run seed
```

Cela crée :
- Compte admin : `admin@recycled-tech.com` / `admin123`
- 5 produits d'exemple

### Terminal 3 - Frontend
```bash
cd frontend
npm run dev
```

## Étape 5 : Accéder à l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000/api/health

## ✅ C'est prêt !

Vous pouvez maintenant :
1. Parcourir le catalogue sur http://localhost:3000
2. Créer un compte utilisateur
3. Ajouter des produits au panier
4. Passer une commande
5. Se connecter en admin (`admin@recycled-tech.com` / `admin123`)
6. Gérer les produits et les rachats dans le back-office

## 📚 Documentation complète

Pour plus de détails, voir [COMMENT_DEMARRER.md](./COMMENT_DEMARRER.md)

