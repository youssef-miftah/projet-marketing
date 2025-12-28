# 🚀 Guide Simple - Comment Démarrer

## ⚠️ Important : `demarrer.bat` ne suffit PAS !

Le fichier `demarrer.bat` fait seulement :
- ✅ Crée les fichiers `.env`
- ✅ Installe les dépendances

**MAIS il ne démarre PAS l'application !**

## 📋 Étapes Complètes à Suivre

### Étape 1 : Exécuter `demarrer.bat` (ou faire manuellement)

**Option A : Double-cliquer sur `demarrer.bat`**
- Cela crée les fichiers `.env` et installe les dépendances

**Option B : Faire manuellement**
```powershell
cd backend
npm install
copy env.example.txt .env

cd ..\frontend
npm install
copy env.example.txt .env.local
```

### Étape 2 : Configurer MongoDB (OBLIGATOIRE)

**Vous DEVEZ éditer le fichier `backend\.env`** et ajouter votre URL MongoDB :

1. Ouvrez `backend\.env` avec un éditeur de texte (Notepad, VS Code, etc.)

2. Modifiez la ligne `MONGODB_URI` :

   **Si vous avez MongoDB local :**
   ```env
   MONGODB_URI=mongodb://localhost:27017/recycled-tech
   ```

   **Si vous utilisez MongoDB Atlas (gratuit) :**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recycled-tech
   ```
   *(Remplacez username, password et cluster par vos vraies valeurs)*

3. Vérifiez aussi que `JWT_SECRET` a une valeur :
   ```env
   JWT_SECRET=ma-cle-secrete-123456
   ```

### Étape 3 : Démarrer les serveurs (OBLIGATOIRE)

**Vous devez ouvrir 3 terminaux PowerShell séparés :**

#### Terminal 1 - Backend
```powershell
cd "C:\Users\youssef\Desktop\projet marketing\backend"
npm run dev
```

Attendez de voir :
```
✅ MongoDB connecté : ...
🚀 Serveur démarré sur le port 5000
```

#### Terminal 2 - Seed (optionnel mais recommandé)
```powershell
cd "C:\Users\youssef\Desktop\projet marketing\backend"
npm run seed
```

Cela crée un compte admin et des produits d'exemple.

#### Terminal 3 - Frontend
```powershell
cd "C:\Users\youssef\Desktop\projet marketing\frontend"
npm run dev
```

Attendez de voir :
```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

### Étape 4 : Ouvrir l'application

Ouvrez votre navigateur et allez sur :
- **http://localhost:3000** ← C'est ici que vous utilisez l'application !

## ✅ Résumé

1. ✅ Exécuter `demarrer.bat` (ou installer manuellement)
2. ✅ **Configurer MongoDB dans `backend\.env`** ← IMPORTANT !
3. ✅ Démarrer le backend (Terminal 1)
4. ✅ Optionnel : Exécuter seed (Terminal 2)
5. ✅ Démarrer le frontend (Terminal 3)
6. ✅ Ouvrir http://localhost:3000

## 🎯 Compte Admin

Après `npm run seed` :
- Email : `admin@recycled-tech.com`
- Mot de passe : `admin123`

## ❌ Ce que `demarrer.bat` NE fait PAS

- ❌ Ne configure pas MongoDB (vous devez le faire manuellement)
- ❌ Ne démarre pas les serveurs (vous devez le faire manuellement)
- ❌ Ne crée pas de compte admin (fait par `npm run seed`)

## 💡 Astuce

Pour éviter d'ouvrir 3 terminaux à chaque fois, vous pouvez créer un fichier `start-all.bat` qui démarre tout automatiquement (mais vous devrez quand même configurer MongoDB une fois).

