# 🚀 Instructions pour Démarrer l'Application

## Étape 1 : Installer les dépendances

### Backend
Ouvrez un terminal et exécutez :
```bash
cd backend
npm install
```

### Frontend
Dans un autre terminal (ou le même après) :
```bash
cd frontend
npm install
```

## Étape 2 : Configurer MongoDB

**Option 1 : MongoDB Local (si installé)**
- Assurez-vous que MongoDB est démarré
- L'URL sera : `mongodb://localhost:27017/recycled-tech`

**Option 2 : MongoDB Atlas (Recommandé - Gratuit)**
1. Allez sur https://www.mongodb.com/cloud/atlas
2. Créez un compte gratuit
3. Créez un cluster gratuit
4. Créez un utilisateur de base de données
5. Autorisez votre IP (ou 0.0.0.0/0 pour le développement)
6. Récupérez la chaîne de connexion (elle ressemble à : `mongodb+srv://username:password@cluster.mongodb.net/recycled-tech`)

## Étape 3 : Créer les fichiers de configuration

### Backend - Créer .env
```bash
cd backend
# Windows PowerShell :
Copy-Item env.example.txt .env
# Windows CMD :
copy env.example.txt .env
# Linux/Mac :
cp env.example.txt .env
```

Puis éditez le fichier `backend/.env` et modifiez :
```env
MONGODB_URI=mongodb://localhost:27017/recycled-tech
# OU pour Atlas :
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recycled-tech

JWT_SECRET=ma-cle-secrete-super-secure-123456
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend - Créer .env.local
```bash
cd frontend
# Windows PowerShell :
Copy-Item env.example.txt .env.local
# Windows CMD :
copy env.example.txt .env.local
# Linux/Mac :
cp env.example.txt .env.local
```

Le fichier `frontend/.env.local` devrait contenir :
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Étape 4 : Démarrer l'application

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

Vous devriez voir :
```
✅ MongoDB connecté : ...
🚀 Serveur démarré sur le port 5000
```

### Terminal 2 - Créer les données initiales (OPTIONNEL mais recommandé)
```bash
cd backend
npm run seed
```

Cela crée :
- Un compte admin : `admin@recycled-tech.com` / `admin123`
- 5 produits d'exemple

### Terminal 3 - Frontend
```bash
cd frontend
npm run dev
```

Vous devriez voir :
```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

## Étape 5 : Accéder à l'application

Ouvrez votre navigateur et allez sur :
- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5000/api/health

## ✅ C'est prêt !

Vous pouvez maintenant :
1. Parcourir le catalogue
2. Créer un compte utilisateur
3. Ajouter des produits au panier
4. Passer une commande
5. Se connecter en admin (`admin@recycled-tech.com` / `admin123`)
6. Gérer les produits et les rachats

## 🐛 Problèmes courants

### "Cannot find module"
```bash
# Réinstaller les dépendances
cd backend && npm install
cd ../frontend && npm install
```

### "MongoDB connection failed"
- Vérifiez que MongoDB est démarré (si local)
- Vérifiez l'URL dans `backend/.env`
- Pour Atlas : vérifiez les IPs autorisées

### "Port already in use"
- Changez le PORT dans `backend/.env`
- Ou arrêtez le processus utilisant le port

### Le frontend ne charge pas les produits
- Vérifiez que le backend tourne sur le port 5000
- Vérifiez `NEXT_PUBLIC_API_URL` dans `frontend/.env.local`

