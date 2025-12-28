# ⚡ Solution Rapide - Problème PowerShell

## ❌ Erreur
```
npm : Impossible de charger le fichier C:\Program Files\nodejs\npm.ps1, 
car l'exécution de scripts est désactivée sur ce système.
```

## ✅ Solution Rapide (2 méthodes)

### Méthode 1 : Autoriser l'exécution de scripts (Recommandé)

**Étape 1 :** Ouvrez PowerShell **en tant qu'administrateur**
- Cliquez sur le menu Démarrer
- Tapez "PowerShell"
- Clic droit sur "Windows PowerShell"
- Choisissez **"Exécuter en tant qu'administrateur"**

**Étape 2 :** Tapez cette commande :
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Étape 3 :** Tapez `Y` et appuyez sur Entrée pour confirmer

**Étape 4 :** Fermez et rouvrez votre terminal PowerShell normal

**C'est fait !** Maintenant `npm` devrait fonctionner.

### Méthode 2 : Utiliser CMD au lieu de PowerShell (Plus simple)

**Au lieu d'utiliser PowerShell, utilisez l'invite de commandes (CMD) :**

1. Appuyez sur `Windows + R`
2. Tapez `cmd` et appuyez sur Entrée
3. Naviguez vers votre projet :
   ```cmd
   cd "C:\Users\youssef\Desktop\projet marketing\backend"
   ```
4. Tapez :
   ```cmd
   npm run dev
   ```

CMD n'a pas ce problème de politique d'exécution !

### Méthode 3 : Utiliser les scripts .bat (Déjà fonctionnel)

Vous pouvez continuer à utiliser les scripts `.bat` qui fonctionnent parfaitement :
- Double-cliquez sur `start-all.bat` pour démarrer l'application
- Les scripts `.bat` n'ont pas ce problème

## 🎯 Quelle méthode choisir ?

- **Méthode 1** : Si vous voulez continuer à utiliser PowerShell
- **Méthode 2** : Si vous voulez une solution rapide (CMD)
- **Méthode 3** : Si vous préférez utiliser les scripts automatiques

## ✅ Test

Après avoir appliqué la Méthode 1 ou en utilisant la Méthode 2, testez :

```powershell
# Ou dans CMD :
npm --version
```

Vous devriez voir un numéro de version (ex: `10.2.3`)

Ensuite :
```powershell
cd backend
npm run dev
```

## 📝 Note

Le problème MongoDB (authentification) est toujours à résoudre séparément. 
Une fois PowerShell résolu, vous pourrez voir les vraies erreurs MongoDB et les corriger.

