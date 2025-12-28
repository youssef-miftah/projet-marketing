# Frontend - Recycled Tech

Application Next.js pour la plateforme e-commerce de matériel informatique recyclé.

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Créer le fichier .env.local
cp env.example.txt .env.local

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure

```
frontend/
├── src/
│   ├── app/              # Pages Next.js (App Router)
│   │   ├── (auth)/      # Pages d'authentification
│   │   ├── products/    # Pages produits
│   │   ├── cart/        # Panier
│   │   ├── checkout/    # Commande
│   │   ├── orders/      # Commandes
│   │   ├── sell/        # Vendre du matériel
│   │   └── admin/       # Back-office admin
│   ├── components/       # Composants React
│   │   ├── layout/      # Header, Footer
│   │   └── product/     # Composants produits
│   ├── context/         # Context API (Auth, Cart)
│   ├── lib/             # Utilitaires, API client
│   └── types/           # Types TypeScript
├── public/              # Assets statiques
└── package.json
```

## 🔧 Configuration

Variables d'environnement (`.env.local`) :

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📄 Pages

- `/` - Page d'accueil
- `/products` - Catalogue avec filtres
- `/products/[id]` - Fiche produit
- `/cart` - Panier
- `/checkout` - Finaliser la commande
- `/login` - Connexion
- `/register` - Inscription
- `/sell` - Vendre du matériel
- `/orders` - Mes commandes
- `/orders/[id]` - Détails d'une commande
- `/admin` - Back-office (gestion rachats)
- `/admin/products` - Gestion des produits

## 🛠️ Technologies

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **Axios** - Client HTTP
- **React Hook Form** - Gestion des formulaires
- **js-cookie** - Gestion des cookies

## 📦 Scripts

- `npm run dev` - Démarrer le serveur de développement
- `npm run build` - Build de production
- `npm run start` - Démarrer le serveur de production
- `npm run lint` - Linter le code

## 🔗 API Backend

Le frontend communique avec l'API backend via :
- URL : `NEXT_PUBLIC_API_URL` (défaut: `http://localhost:5000/api`)
- Authentification : JWT stocké dans les cookies

## 📝 Notes

- Les images de produits utilisent un placeholder si aucune image n'est fournie
- Le panier est sauvegardé dans localStorage
- L'authentification utilise des cookies pour stocker le token JWT

