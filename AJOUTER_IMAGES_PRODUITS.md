# 📸 Images ajoutées aux produits

## ✅ Ce qui a été fait

J'ai ajouté des images d'exemple à tous les produits dans le script `seed.js`. Les images proviennent d'Unsplash (service gratuit de photos de haute qualité).

## 🖼️ Images ajoutées

Chaque produit a maintenant 2 images :
- **PC Dell** : Images de PC de bureau
- **Laptop HP** : Images de laptops
- **Raspberry Pi** : Images de cartes électroniques
- **Serveur Dell** : Images de serveurs/data centers
- **SSD Samsung** : Images de composants informatiques
- **iPhone 12 Pro** : Images de smartphones (nouveau produit ajouté)
- **Switch Cisco** : Images d'équipements réseau (nouveau produit ajouté)

## 🔄 Pour appliquer les changements

### Option 1 : Réinitialiser la base de données (Recommandé)

Si vous voulez que les produits existants aient des images :

1. **Supprimez les produits existants** (optionnel, via MongoDB Atlas ou admin panel)
2. **Relancez le seed** :
   ```cmd
   cd backend
   npm run seed
   ```

### Option 2 : Mettre à jour les produits existants

Les produits existants garderont leurs données, mais n'auront pas d'images. Pour ajouter des images aux produits existants :

1. Connectez-vous en admin sur http://localhost:3000
2. Allez dans `/admin/products`
3. Modifiez chaque produit et ajoutez les URLs d'images

## 📝 URLs d'images utilisées

Les images proviennent d'Unsplash (service gratuit) :
- Format : `https://images.unsplash.com/photo-...?w=800&h=600&fit=crop`
- Taille : 800x600 pixels
- Qualité : Haute résolution

## 🎨 Ajouter vos propres images

### Option 1 : Utiliser vos propres photos

1. Uploadez vos images sur un service d'hébergement (Imgur, Cloudinary, etc.)
2. Récupérez les URLs
3. Ajoutez-les dans le script `seed.js` ou via l'admin panel

### Option 2 : Utiliser d'autres services gratuits

- **Unsplash** : https://unsplash.com (déjà utilisé)
- **Pexels** : https://pexels.com
- **Pixabay** : https://pixabay.com

### Option 3 : Upload local (à implémenter)

Pour l'instant, l'application utilise des URLs externes. Pour un upload local, il faudrait :
1. Configurer Multer (déjà dans les dépendances)
2. Créer une route d'upload
3. Stocker les images dans un dossier `uploads/`

## 🔍 Vérifier les images

Après avoir relancé le seed :

1. Allez sur http://localhost:3000/products
2. Les produits devraient maintenant afficher des images
3. Cliquez sur un produit pour voir toutes ses images

## 📦 Nouveaux produits ajoutés

J'ai aussi ajouté 2 nouveaux produits avec images :
- **iPhone 12 Pro Reconditionné** (Téléphone)
- **Switch Réseau Cisco 24 Ports** (Réseau)

## ✅ Résultat

Maintenant, tous les produits ont des images d'exemple qui s'affichent correctement dans le catalogue et les fiches produits !

