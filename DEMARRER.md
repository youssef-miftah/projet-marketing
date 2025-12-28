# 🚀 Comment Démarrer l'Application - Guide Simple

## Méthode Rapide (Windows)

Double-cliquez sur le fichier **`demarrer.bat`** qui va :
- Créer les fichiers `.env` nécessaires
- Installer les dépendances

## Méthode Manuelle

### Étape 1 : Installer les dépendances

**Ouvrez un terminal PowerShell dans le dossier du projet et exécutez :**

```powershell
# Backend
cd backend
npm install

# Frontend (dans un nouveau terminal ou après)
cd ..\frontend
npm install
```

### Étape 2 : Configurer MongoDB

**Option A : MongoDB Local**
- Installez MongoDB sur votre machine
- Démarrez le service MongoDB

**Option B : MongoDB Atlas (Recommandé - Gratuit)**
1. Allez sur https://www.mongodb.com/cloud/atlas
2. Créez un compte gratuit
3. Créez un cluster gratuit
4. Créez un utilisateur
5. Récupérez la chaîne de connexion

### Étape 3 : Créer les fichiers .env

**Backend :**
```powershell
cd backend
copy env.example.txt .env
```

Éditez `backend\.env` et modifiez :
```env
MONGODB_URI=mongodb://localhost:27017/recycled-tech
# OU pour Atlas :
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recycled-tech

JWT_SECRET=ma-cle-secrete-123456
PORT=5000
FRONTEND_URL=http://localhost:3000
```

**Frontend :**
```powershell
cd frontend
copy env.example.txt .env.local
```

Le fichier `frontend\.env.local` devrait contenir :
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Étape 4 : Démarrer l'application

**Ouvrez 3 terminaux séparés :**

**Terminal 1 - Backend :**
```powershell
cd backend
npm run dev
```

Attendez de voir :
```
✅ MongoDB connecté : ...
🚀 Serveur démarré sur le port 5000
```

**Terminal 2 - Seed (optionnel mais recommandé) :**
```powershell
cd backend
npm run seed
```

Cela crée un admin et des produits d'exemple.

**Terminal 3 - Frontend :**
```powershell
cd frontend
npm run dev
```

Attendez de voir :
```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

### Étape 5 : Ouvrir l'application

Ouvrez votre navigateur et allez sur :
- **http://localhost:3000** (Frontend)
- **http://localhost:5000/api/health** (Backend - pour tester)

## ✅ Compte Admin par défaut

Après avoir exécuté `npm run seed` :
- **Email** : `admin@recycled-tech.com`
- **Mot de passe** : `admin123`

## 🐛 Problèmes ?

### "Cannot find module"
```powershell
# Réinstaller les dépendances
cd backend
npm install
cd ..\frontend
npm install
```

### "MongoDB connection failed"
- Vérifiez que MongoDB est démarré (si local)
- Vérifiez l'URL dans `backend\.env`
- Pour Atlas : vérifiez les IPs autorisées dans le dashboard

### "Port already in use"
- Changez le PORT dans `backend\.env`
- Ou arrêtez le processus utilisant le port 5000

### Le frontend ne charge pas
- Vérifiez que le backend tourne sur le port 5000
- Vérifiez `NEXT_PUBLIC_API_URL` dans `frontend\.env.local`

## 📚 Plus d'infos

Voir `INSTRUCTIONS_DEMARRAGE.md` pour plus de détails.

