# ⚠️ Node.js n'est pas installé !

## ❌ Problème
```
'npm' n'est pas reconnu en tant que commande interne
ou externe, un programme exécutable ou un fichier de commandes.
```

Cela signifie que **Node.js n'est pas installé** sur votre ordinateur.

## ✅ Solution : Installer Node.js

### Étape 1 : Télécharger Node.js

1. Allez sur le site officiel : **https://nodejs.org/**
2. Téléchargez la version **LTS** (Long Term Support) - recommandée
   - Cliquez sur le gros bouton vert "LTS" (par exemple : v20.x.x)
   - Cela télécharge un fichier `.msi` pour Windows

### Étape 2 : Installer Node.js

1. Double-cliquez sur le fichier téléchargé (ex: `node-v20.x.x-x64.msi`)
2. Suivez l'assistant d'installation :
   - ✅ Cochez "Automatically install the necessary tools"
   - ✅ Acceptez les options par défaut
   - ✅ Cliquez sur "Install"
3. Attendez la fin de l'installation

### Étape 3 : Redémarrer votre ordinateur

**IMPORTANT :** Après l'installation, **redémarrez votre ordinateur** pour que les changements prennent effet.

### Étape 4 : Vérifier l'installation

Après le redémarrage, ouvrez un nouveau terminal PowerShell et tapez :

```powershell
node --version
npm --version
```

Vous devriez voir des numéros de version (ex: `v20.10.0` et `10.2.3`)

Si vous voyez les versions, **c'est bon !** ✅

### Étape 5 : Relancer l'application

Une fois Node.js installé et votre ordinateur redémarré :

1. Double-cliquez sur `start-all.bat`
2. Cette fois, npm sera reconnu et les dépendances s'installeront
3. L'application démarrera correctement

## 📥 Lien direct de téléchargement

**Windows 64-bit (LTS)** : https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi

*(Version peut varier, allez sur nodejs.org pour la dernière version LTS)*

## 🔍 Vérification rapide

Pour vérifier si Node.js est installé, ouvrez PowerShell et tapez :
```powershell
node --version
```

- Si ça affiche une version → Node.js est installé ✅
- Si ça affiche une erreur → Node.js n'est pas installé ❌

## ⚠️ Important

**Ne sautez pas l'étape du redémarrage !** Node.js doit être dans le PATH système, et cela nécessite un redémarrage.

## 🎯 Après l'installation

Une fois Node.js installé et votre PC redémarré :

1. ✅ Ouvrez un nouveau terminal PowerShell
2. ✅ Vérifiez avec `node --version` et `npm --version`
3. ✅ Double-cliquez sur `start-all.bat`
4. ✅ L'application devrait démarrer !

