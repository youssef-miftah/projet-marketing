# 🔄 Redémarrage nécessaire ou pas ?

## ✅ Ce qui nécessite un redémarrage

### 1. Frontend - Configuration Next.js ⚠️

**OUI, il faut redémarrer le frontend** car nous avons modifié `next.config.js`.

**Pourquoi ?** 
- `next.config.js` est lu au démarrage de Next.js
- Les changements ne sont pas pris en compte automatiquement

**Comment faire :**
```cmd
# Dans le terminal frontend
# Appuyez sur Ctrl+C pour arrêter
# Puis relancez :
npm run dev
```

### 2. Backend - Script seed ✅

**NON, pas besoin de redémarrer le backend**, mais il faut relancer le seed pour créer les produits avec images.

**Comment faire :**
```cmd
# Dans un nouveau terminal CMD
cd backend
npm run seed
```

Le backend continue de tourner, pas besoin de le redémarrer.

## ❌ Ce qui ne nécessite pas de redémarrage

### 1. Modifications de code React/Next.js

Les fichiers `.tsx` et `.ts` sont rechargés automatiquement en mode développement. Pas besoin de redémarrer.

### 2. Modifications de code backend (routes, contrôleurs)

Nodemon redémarre automatiquement le backend quand vous modifiez les fichiers. Pas besoin de redémarrer manuellement.

## 📋 Résumé - Actions à faire

### Pour voir les images sur les produits :

**Étape 1 : Relancer le seed (Backend)**
```cmd
cd backend
npm run seed
```
✅ Pas besoin de redémarrer le backend

**Étape 2 : Redémarrer le frontend**
```cmd
cd frontend
# Ctrl+C pour arrêter
npm run dev
```
⚠️ **Nécessaire** pour que `next.config.js` soit pris en compte

## 🎯 Ordre des actions

1. ✅ Relancer le seed : `cd backend && npm run seed`
2. ⚠️ Redémarrer le frontend : `cd frontend` → `Ctrl+C` → `npm run dev`
3. ✅ Ouvrir http://localhost:3000/products

## ⏱️ Temps estimé

- Seed : ~5 secondes
- Redémarrage frontend : ~10 secondes
- **Total : ~15 secondes**

## 🔍 Vérification

Après ces actions, vous devriez voir :
- ✅ Des images sur les produits dans le catalogue
- ✅ Une galerie d'images sur les pages de détail
- ✅ 7 produits au total (5 existants + 2 nouveaux)

## 💡 Astuce

Si le frontend ne redémarre pas automatiquement après modification de `next.config.js`, c'est normal. Il faut le redémarrer manuellement.

