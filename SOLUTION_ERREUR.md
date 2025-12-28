# 🔧 Solution : ERR_CONNECTION_REFUSED

## ❌ Problème
Le navigateur affiche "ERR_CONNECTION_REFUSED" sur localhost:3000

## ✅ Solution

### Cause probable : Dépendances non installées

Les dépendances Node.js n'étaient probablement pas installées.

### Solution : Utiliser le nouveau script

J'ai mis à jour `start-all.bat` pour qu'il installe automatiquement les dépendances.

**Double-cliquez sur `start-all.bat` à nouveau.**

Cette fois, il va :
1. ✅ Vérifier et installer les dépendances backend
2. ✅ Vérifier et installer les dépendances frontend
3. ✅ Vérifier les fichiers .env
4. ✅ Démarrer le backend
5. ✅ Démarrer le frontend
6. ✅ Créer les données initiales

### ⏱️ Attendez !

**IMPORTANT :** Attendez que les terminaux affichent les messages de succès :

**Terminal Backend doit afficher :**
```
✅ MongoDB connecté : cluster0.kdju6qb.mongodb.net
🚀 Serveur démarré sur le port 5000
```

**Terminal Frontend doit afficher :**
```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

**Terminal Seed doit afficher :**
```
✅ Admin créé: admin@recycled-tech.com
✨ Seed terminé avec succès !
```

### 🌐 Ensuite, ouvrez le navigateur

**Seulement après** avoir vu ces messages, ouvrez :
**http://localhost:3000**

## 🔍 Si ça ne fonctionne toujours pas

### Vérifiez les 3 fenêtres de terminal

Regardez les messages d'erreur dans chaque terminal et notez-les.

### Erreurs courantes :

1. **"Cannot find module"**
   - Solution : Les dépendances ne sont pas installées
   - Le nouveau script devrait résoudre ça

2. **"Port already in use"**
   - Solution : Fermez les autres applications qui utilisent les ports 3000 ou 5000
   - Ou redémarrez votre ordinateur

3. **"MongoDB connection failed"**
   - Solution : Vérifiez que votre IP est autorisée dans MongoDB Atlas
   - Allez dans MongoDB Atlas → Network Access → Ajoutez votre IP

4. **Erreurs dans le terminal frontend**
   - Vérifiez que `frontend\.env.local` existe
   - Vérifiez qu'il contient : `NEXT_PUBLIC_API_URL=http://localhost:5000/api`

## 📞 Besoin d'aide ?

Si le problème persiste, copiez-collez les messages d'erreur des 3 terminaux pour que je puisse vous aider.

