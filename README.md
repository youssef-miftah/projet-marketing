# Recycled Tech - E-commerce Matériel Informatique Recyclé

Plateforme e-commerce pour la vente et l'achat de matériel informatique recyclé et reconditionné.

## 🎯 Concept

- Achat de matériel informatique défectueux ou obsolète
- Réparation, recyclage ou upcycling
- Vente de matériel 100% fonctionnel avec démarche écologique

## 📦 Produits

- PC et PC portables
- Serveurs et firewalls
- Téléphones portables
- Arduino, Raspberry Pi
- Composants informatiques (RAM, SSD, cartes mères)
- Matériel réseau

## 🏗️ Architecture

Projet monorepo avec séparation frontend/backend :

```
projet-marketing/
├── backend/          # API REST Node.js + Express + MongoDB
├── frontend/         # Application Next.js (à venir)
└── docs/            # Documentation
```

## 🚀 Démarrage rapide

### Backend

1. Aller dans le dossier backend :
```bash
cd backend
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer l'environnement :
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

4. Démarrer MongoDB (localement ou utiliser MongoDB Atlas)

5. Lancer le serveur :
```bash
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

### Frontend

À venir - Next.js

## 📚 Documentation

Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour les détails de l'architecture.

Voir [backend/README.md](./backend/README.md) pour la documentation de l'API.

## 🛠️ Technologies

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (authentification)
- Bcrypt (hashage mots de passe)
- Express Validator (validation)

### Frontend (à venir)
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## 📝 Fonctionnalités

- ✅ Authentification utilisateur (inscription, connexion)
- ✅ Catalogue produits avec filtres
- ✅ Fiche produit détaillée
- ✅ Panier et commandes
- ✅ Formulaire de rachat de matériel
- ✅ Back-office admin (gestion produits, validation rachats)

## 🔐 Variables d'environnement

Voir `backend/.env.example` pour la liste complète.

## 📄 Licence

ISC

"# projet-marketing" 
