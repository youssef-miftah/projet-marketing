# 🔍 Diagnostic - Problème de démarrage

## ❌ Erreur : ERR_CONNECTION_REFUSED sur localhost:3000

Cela signifie que le frontend ne démarre pas correctement.

## 🔍 Vérifications à faire

### 1. Regardez les 3 fenêtres de terminal qui se sont ouvertes

**Terminal Backend :**
- Doit afficher : `✅ MongoDB connecté : cluster0.kdju6qb.mongodb.net`
- Doit afficher : `🚀 Serveur démarré sur le port 5000`
- Si vous voyez des erreurs, notez-les

**Terminal Seed :**
- Doit afficher : `✅ Admin créé: admin@recycled-tech.com`
- Doit afficher : `✅ Produit créé: ...` (plusieurs fois)
- Doit afficher : `✨ Seed terminé avec succès !`

**Terminal Frontend :**
- Doit afficher : `- ready started server on 0.0.0.0:3000`
- Doit afficher : `- Local: http://localhost:3000`
- Si vous voyez des erreurs, notez-les

### 2. Problèmes courants

#### A. Dépendances non installées
**Symptôme :** Erreur "Cannot find module" dans les terminaux

**Solution :**
```powershell
cd backend
npm install

cd ..\frontend
npm install
```

#### B. Port déjà utilisé
**Symptôme :** Erreur "Port 3000 is already in use" ou "Port 5000 is already in use"

**Solution :**
- Fermez les autres applications qui utilisent ces ports
- Ou changez les ports dans les fichiers .env

#### C. Erreur MongoDB
**Symptôme :** Erreur de connexion MongoDB dans le terminal backend

**Solution :**
- Vérifiez que votre IP est autorisée dans MongoDB Atlas
- Vérifiez l'URL dans `backend\.env`

#### D. Erreur Next.js
**Symptôme :** Erreurs dans le terminal frontend

**Solution :**
- Vérifiez que `frontend\.env.local` existe
- Vérifiez que `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

## 🛠️ Solution rapide

### Étape 1 : Vérifier les dépendances
```powershell
cd backend
if (-not (Test-Path node_modules)) { npm install }

cd ..\frontend
if (-not (Test-Path node_modules)) { npm install }
```

### Étape 2 : Redémarrer manuellement

Fermez les 3 terminaux ouverts, puis :

**Terminal 1 - Backend :**
```powershell
cd "C:\Users\youssef\Desktop\projet marketing\backend"
npm run dev
```

**Terminal 2 - Seed (une seule fois) :**
```powershell
cd "C:\Users\youssef\Desktop\projet marketing\backend"
npm run seed
```

**Terminal 3 - Frontend :**
```powershell
cd "C:\Users\youssef\Desktop\projet marketing\frontend"
npm run dev
```

### Étape 3 : Attendre les messages de succès

Attendez de voir dans chaque terminal :
- Backend : `🚀 Serveur démarré sur le port 5000`
- Frontend : `- ready started server on 0.0.0.0:3000`

### Étape 4 : Ouvrir le navigateur

Une fois que vous voyez les messages de succès, ouvrez :
**http://localhost:3000**

## 📸 Aide supplémentaire

Si le problème persiste, copiez-collez les messages d'erreur des 3 terminaux pour que je puisse vous aider davantage.

