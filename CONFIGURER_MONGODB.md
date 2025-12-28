# 📊 Comment Configurer MongoDB

Vous avez **2 options** pour obtenir une URL MongoDB :

## Option 1 : MongoDB Atlas (Gratuit - Recommandé) ⭐

MongoDB Atlas est un service cloud gratuit, plus simple pour débuter.

### Étape 1 : Créer un compte
1. Allez sur **https://www.mongodb.com/cloud/atlas**
2. Cliquez sur **"Try Free"** ou **"Get started free"**
3. Créez un compte (email + mot de passe)

### Étape 2 : Créer un cluster
1. Une fois connecté, cliquez sur **"Build a Database"**
2. Choisissez le plan **FREE (M0)** - c'est gratuit
3. Choisissez un **Cloud Provider** (AWS, Google Cloud, Azure) - peu importe lequel
4. Choisissez une **Region** (ex: Europe - Paris)
5. Cliquez sur **"Create"**

### Étape 3 : Créer un utilisateur
1. Dans **"Database Access"** (menu de gauche)
2. Cliquez sur **"Add New Database User"**
3. Choisissez **"Password"** comme méthode d'authentification
4. Entrez un **Username** (ex: `admin`)
5. Entrez un **Password** (ex: `password123`) - **Notez-le bien !**
6. Cliquez sur **"Add User"**

### Étape 4 : Autoriser votre IP
1. Dans **"Network Access"** (menu de gauche)
2. Cliquez sur **"Add IP Address"**
3. Cliquez sur **"Allow Access from Anywhere"** (pour le développement)
   - Ou ajoutez votre IP actuelle
4. Cliquez sur **"Confirm"**

### Étape 5 : Récupérer l'URL de connexion
1. Retournez dans **"Database"** (menu de gauche)
2. Cliquez sur **"Connect"** sur votre cluster
3. Choisissez **"Connect your application"**
4. Copiez la chaîne de connexion qui ressemble à :
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Remplacez `<username>` et `<password>` par vos valeurs
6. Ajoutez le nom de la base de données à la fin :
   ```
   mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/recycled-tech?retryWrites=true&w=majority
   ```

### Étape 6 : Mettre dans backend\.env
Ouvrez `backend\.env` et modifiez :
```env
MONGODB_URI=mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/recycled-tech?retryWrites=true&w=majority
```
*(Remplacez par votre vraie URL)*

---

## Option 2 : MongoDB Local (Sur votre ordinateur)

### Étape 1 : Installer MongoDB
1. Allez sur **https://www.mongodb.com/try/download/community**
2. Téléchargez MongoDB Community Server
3. Installez-le (gardez les options par défaut)
4. MongoDB démarre automatiquement comme service Windows

### Étape 2 : Vérifier que MongoDB fonctionne
Ouvrez un terminal et tapez :
```powershell
mongod --version
```

Si ça fonctionne, MongoDB est installé.

### Étape 3 : URL pour backend\.env
Ouvrez `backend\.env` et utilisez :
```env
MONGODB_URI=mongodb://localhost:27017/recycled-tech
```

---

## ✅ Résumé

**Option 1 (Atlas - Recommandé) :**
- Gratuit
- Pas besoin d'installer quoi que ce soit
- Fonctionne partout
- URL : `mongodb+srv://username:password@cluster.mongodb.net/recycled-tech`

**Option 2 (Local) :**
- Gratuit
- Nécessite l'installation de MongoDB
- Fonctionne seulement sur votre ordinateur
- URL : `mongodb://localhost:27017/recycled-tech`

---

## 🎯 Exemple de fichier backend\.env complet

```env
# Configuration du serveur
PORT=5000
NODE_ENV=development

# MongoDB - REMPLACEZ PAR VOTRE URL !
MONGODB_URI=mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/recycled-tech?retryWrites=true&w=majority
# OU pour MongoDB local :
# MONGODB_URI=mongodb://localhost:27017/recycled-tech

# JWT Secret - Changez cette valeur !
JWT_SECRET=ma-super-cle-secrete-123456-changez-moi

# CORS
FRONTEND_URL=http://localhost:3000
```

---

## ❓ Besoin d'aide ?

Si vous avez des problèmes :
1. Vérifiez que l'URL MongoDB est correcte dans `backend\.env`
2. Pour Atlas : vérifiez que votre IP est autorisée
3. Pour Local : vérifiez que MongoDB est démarré

