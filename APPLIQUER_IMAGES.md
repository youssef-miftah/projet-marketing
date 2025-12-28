# 📸 Comment appliquer les images aux produits

## ✅ Ce qui a été fait

J'ai ajouté des images à tous les produits dans le script `seed.js`. Les images proviennent d'Unsplash (service gratuit de photos de haute qualité).

## 🔄 Pour voir les images

### Option 1 : Réinitialiser les produits (Recommandé)

Si vous voulez que les produits existants aient des images :

1. **Supprimez les produits existants** via MongoDB Atlas ou l'admin panel
2. **Relancez le seed** :
   ```cmd
   cd backend
   npm run seed
   ```

### Option 2 : Mettre à jour les produits existants

Les produits existants n'auront pas d'images automatiquement. Pour ajouter des images :

1. Connectez-vous en admin : http://localhost:3000/admin
2. Allez dans "Gérer les produits"
3. Modifiez chaque produit et ajoutez les URLs d'images dans le champ "Images"

## 🖼️ Images ajoutées

Chaque produit a maintenant **2 images** :
- **PC Dell** : Images de PC de bureau
- **Laptop HP** : Images de laptops
- **Raspberry Pi** : Images de cartes électroniques
- **Serveur Dell** : Images de serveurs/data centers
- **SSD Samsung** : Images de composants informatiques
- **iPhone 12 Pro** : Images de smartphones (nouveau produit)
- **Switch Cisco** : Images d'équipements réseau (nouveau produit)

## 📝 URLs d'images

Les images proviennent d'Unsplash :
- Format : `https://images.unsplash.com/photo-...?w=800&h=600&fit=crop`
- Taille : 800x600 pixels
- Qualité : Haute résolution
- Gratuit et légal à utiliser

## 🎨 Ajouter vos propres images

### Option 1 : Utiliser vos photos

1. Uploadez vos images sur un service d'hébergement :
   - **Imgur** : https://imgur.com (gratuit)
   - **Cloudinary** : https://cloudinary.com (gratuit jusqu'à 25GB)
   - **GitHub** : Créez un repo et uploadez les images
2. Récupérez les URLs
3. Ajoutez-les dans le script `seed.js` ou via l'admin panel

### Option 2 : Utiliser d'autres services gratuits

- **Unsplash** : https://unsplash.com (déjà utilisé)
- **Pexels** : https://pexels.com
- **Pixabay** : https://pixabay.com

### Option 3 : Upload local (futur)

Pour un upload local, il faudrait implémenter :
1. Route d'upload avec Multer
2. Stockage dans `backend/uploads/`
3. Servir les images via Express

## 🔍 Vérifier les images

Après avoir relancé le seed :

1. Allez sur http://localhost:3000/products
2. Les produits devraient maintenant afficher des images
3. Cliquez sur un produit pour voir toutes ses images

## ✅ Configuration Next.js

J'ai aussi mis à jour `next.config.js` pour autoriser les images d'Unsplash. Si vous redémarrez le frontend, les images s'afficheront correctement.

## 🚀 Commandes rapides

```cmd
# Supprimer les produits existants et recréer avec images
cd backend
npm run seed
```

Puis rafraîchissez la page http://localhost:3000/products

## 📦 Nouveaux produits

J'ai aussi ajouté 2 nouveaux produits avec images :
- **iPhone 12 Pro Reconditionné** (Téléphone)
- **Switch Réseau Cisco 24 Ports** (Réseau)

Maintenant vous avez **7 produits** au total avec des images !

