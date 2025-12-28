# 🔧 Configuration de votre MongoDB Atlas

Vous avez votre URL MongoDB ! Voici comment la configurer :

## 📝 Votre URL MongoDB

```
mongodb+srv://youssefmiftah7_db_user:<db_password>@cluster0.kdju6qb.mongodb.net/?appName=Cluster0
```

## ✅ Étapes pour configurer

### 1. Remplacer le mot de passe

Dans l'URL ci-dessus, remplacez `<db_password>` par votre **vrai mot de passe** que vous avez créé dans MongoDB Atlas.

**Exemple :** Si votre mot de passe est `monMotDePasse123`, l'URL devient :
```
mongodb+srv://youssefmiftah7_db_user:monMotDePasse123@cluster0.kdju6qb.mongodb.net/?appName=Cluster0
```

### 2. Ajouter le nom de la base de données

Ajoutez `/recycled-tech` **avant le `?`** pour spécifier le nom de la base de données.

**URL finale :**
```
mongodb+srv://youssefmiftah7_db_user:monMotDePasse123@cluster0.kdju6qb.mongodb.net/recycled-tech?appName=Cluster0
```

### 3. Mettre dans backend\.env

Ouvrez le fichier `backend\.env` avec un éditeur de texte (Notepad, VS Code, etc.)

Remplacez la ligne `MONGODB_URI` par :

```env
MONGODB_URI=mongodb+srv://youssefmiftah7_db_user:VOTRE_MOT_DE_PASSE@cluster0.kdju6qb.mongodb.net/recycled-tech?appName=Cluster0
```

**⚠️ IMPORTANT :** Remplacez `VOTRE_MOT_DE_PASSE` par votre vrai mot de passe !

### 4. Exemple de fichier backend\.env complet

```env
# Configuration du serveur
PORT=5000
NODE_ENV=development

# MongoDB - REMPLACEZ VOTRE_MOT_DE_PASSE par votre vrai mot de passe !
MONGODB_URI=mongodb+srv://youssefmiftah7_db_user:VOTRE_MOT_DE_PASSE@cluster0.kdju6qb.mongodb.net/recycled-tech?appName=Cluster0

# JWT Secret
JWT_SECRET=ma-super-cle-secrete-123456-changez-moi
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

## 🔍 Comment trouver votre mot de passe ?

Si vous avez oublié votre mot de passe MongoDB Atlas :

1. Allez sur https://cloud.mongodb.com
2. Connectez-vous
3. Allez dans **"Database Access"** (menu de gauche)
4. Trouvez l'utilisateur `youssefmiftah7_db_user`
5. Cliquez sur **"Edit"** pour voir ou changer le mot de passe

## ✅ Vérification

Une fois configuré, testez avec :
```powershell
cd backend
npm run dev
```

Si vous voyez :
```
✅ MongoDB connecté : cluster0.kdju6qb.mongodb.net
🚀 Serveur démarré sur le port 5000
```

**C'est bon !** 🎉

## ❌ Si ça ne fonctionne pas

1. Vérifiez que votre IP est autorisée dans MongoDB Atlas :
   - Menu "Network Access"
   - Ajoutez votre IP ou "Allow Access from Anywhere"

2. Vérifiez que le mot de passe est correct (sans espaces)

3. Vérifiez que l'URL est bien sur une seule ligne dans `.env`

