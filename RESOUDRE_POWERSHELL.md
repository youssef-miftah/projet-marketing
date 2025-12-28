# 🔧 Résoudre le problème PowerShell (Optionnel)

## ❌ Erreur
```
npm : Impossible de charger le fichier C:\Program Files\nodejs\npm.ps1, 
car l'exécution de scripts est désactivée sur ce système.
```

## ℹ️ Note importante

**Ce n'est pas un problème bloquant !** 

Les scripts `.bat` fonctionnent correctement et npm fonctionne via les scripts. Cette erreur apparaît seulement si vous tapez `npm` directement dans PowerShell.

## ✅ Solution (si vous voulez utiliser npm directement)

### Option 1 : Autoriser l'exécution de scripts (Recommandé)

Ouvrez PowerShell **en tant qu'administrateur** et tapez :

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Puis tapez `Y` pour confirmer.

### Option 2 : Utiliser CMD au lieu de PowerShell

Utilisez l'invite de commandes (CMD) au lieu de PowerShell :
- Ouvrez CMD (pas PowerShell)
- Tapez `npm run dev`

### Option 3 : Utiliser les scripts .bat (Déjà fonctionnel)

Vous pouvez continuer à utiliser les scripts `.bat` qui fonctionnent parfaitement :
- `start-all.bat` pour démarrer l'application
- `demarrer.bat` pour la configuration initiale

## 🎯 Recommandation

**Pour l'instant, ignorez cette erreur PowerShell** et concentrez-vous sur le problème MongoDB (authentification).

Les scripts `.bat` fonctionnent très bien et c'est la méthode la plus simple.

