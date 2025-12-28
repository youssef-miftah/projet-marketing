import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

// Charger les variables d'environnement
dotenv.config();

/**
 * Script de seed pour créer des données initiales
 * Usage: node src/scripts/seed.js
 */
const seedDatabase = async () => {
  try {
    // Connexion à la base de données
    await connectDB();

    console.log('🌱 Démarrage du seed...');

    // Créer un admin par défaut
    const adminEmail = 'admin@recycled-tech.com';
    const adminPassword = 'admin123'; // À changer en production !

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const admin = await User.create({
        email: adminEmail,
        password: adminPassword,
        nom: 'Admin',
        prenom: 'Recycled Tech',
        role: 'admin',
      });
      console.log('✅ Admin créé:', admin.email);
    } else {
      console.log('ℹ️  Admin existe déjà');
    }

    // Créer quelques produits d'exemple avec images
    const sampleProducts = [
      {
        nom: 'PC Dell Optiplex 7010 Reconditionné',
        description: 'PC de bureau reconditionné, idéal pour le travail quotidien. Processeur Intel Core i5, 8GB RAM, 256GB SSD.',
        categorie: 'PC',
        etat: 'reconditionné',
        prix: 299.99,
        stock: 5,
        images: [
          'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&h=600&fit=crop',
        ],
        origine: 'PC d\'entreprise reconditionné',
        impactEcologique: {
          co2Economise: 150,
          description: 'Économie de 150kg de CO2 par rapport à un PC neuf',
        },
        specifications: {
          'Processeur': 'Intel Core i5-3470',
          'RAM': '8GB DDR3',
          'Stockage': '256GB SSD',
          'Système': 'Windows 10 Pro',
        },
      },
      {
        nom: 'Laptop HP EliteBook 840 G3',
        description: 'Laptop professionnel reconditionné, écran 14 pouces, excellent état.',
        categorie: 'Laptop',
        etat: 'reconditionné',
        prix: 449.99,
        stock: 3,
        images: [
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop',
        ],
        origine: 'Laptop d\'entreprise reconditionné',
        impactEcologique: {
          co2Economise: 200,
          description: 'Économie de 200kg de CO2 par rapport à un laptop neuf',
        },
        specifications: {
          'Processeur': 'Intel Core i5-6300U',
          'RAM': '8GB DDR4',
          'Stockage': '256GB SSD',
          'Écran': '14" Full HD',
        },
      },
      {
        nom: 'Raspberry Pi 4 Model B 4GB',
        description: 'Raspberry Pi 4 reconditionné, parfait pour projets IoT et éducation.',
        categorie: 'Arduino/Raspberry',
        etat: 'recyclé',
        prix: 59.99,
        stock: 10,
        images: [
          'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
        ],
        origine: 'Matériel de laboratoire recyclé',
        impactEcologique: {
          co2Economise: 5,
          description: 'Économie de 5kg de CO2, prolongation de vie utile',
        },
        specifications: {
          'RAM': '4GB',
          'Processeur': 'Broadcom BCM2711',
          'Connectivité': 'WiFi, Bluetooth, USB-C',
        },
      },
      {
        nom: 'Serveur Dell PowerEdge R710',
        description: 'Serveur rack reconditionné, idéal pour petites entreprises ou homelab.',
        categorie: 'Serveur',
        etat: 'reconditionné',
        prix: 299.99,
        stock: 2,
        images: [
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
        ],
        origine: 'Serveur d\'entreprise reconditionné',
        impactEcologique: {
          co2Economise: 500,
          description: 'Économie de 500kg de CO2, matériel encore performant',
        },
        specifications: {
          'Processeurs': '2x Intel Xeon E5620',
          'RAM': '32GB DDR3',
          'Stockage': '2x 500GB HDD',
        },
      },
      {
        nom: 'SSD Samsung 256GB Recyclé',
        description: 'SSD reconditionné, testé et garanti fonctionnel.',
        categorie: 'Composant',
        etat: 'recyclé',
        prix: 29.99,
        stock: 15,
        images: [
          'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1587825147138-3462283054e6?w=800&h=600&fit=crop',
        ],
        origine: 'Composants récupérés de PC démontés',
        impactEcologique: {
          co2Economise: 20,
          description: 'Économie de 20kg de CO2, réutilisation de composants',
        },
        specifications: {
          'Capacité': '256GB',
          'Interface': 'SATA III',
          'Vitesse': '550MB/s lecture',
        },
      },
      {
        nom: 'iPhone 12 Pro Reconditionné',
        description: 'iPhone 12 Pro reconditionné, excellent état, batterie à 85%. Écran et boîtier en parfait état.',
        categorie: 'Téléphone',
        etat: 'reconditionné',
        prix: 599.99,
        stock: 4,
        images: [
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
        ],
        origine: 'Téléphone reconditionné par un professionnel',
        impactEcologique: {
          co2Economise: 80,
          description: 'Économie de 80kg de CO2, prolongation de vie utile',
        },
        specifications: {
          'Écran': '6.1" Super Retina XDR',
          'Stockage': '128GB',
          'Appareil photo': 'Triple 12MP',
          'Batterie': '85% capacité',
        },
      },
      {
        nom: 'Switch Réseau Cisco 24 Ports',
        description: 'Switch réseau reconditionné, idéal pour petits bureaux. 24 ports Gigabit Ethernet.',
        categorie: 'Réseau',
        etat: 'reconditionné',
        prix: 149.99,
        stock: 3,
        images: [
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
        ],
        origine: 'Matériel réseau d\'entreprise reconditionné',
        impactEcologique: {
          co2Economise: 100,
          description: 'Économie de 100kg de CO2, matériel encore performant',
        },
        specifications: {
          'Ports': '24x Gigabit Ethernet',
          'Gestion': 'Web interface',
          'Alimentation': 'PoE+',
        },
      },
    ];

    // Vérifier et créer les produits
    for (const productData of sampleProducts) {
      const existingProduct = await Product.findOne({ nom: productData.nom });
      if (!existingProduct) {
        await Product.create(productData);
        console.log(`✅ Produit créé: ${productData.nom}`);
      } else {
        console.log(`ℹ️  Produit existe déjà: ${productData.nom}`);
      }
    }

    console.log('✨ Seed terminé avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
};

// Exécuter le seed
seedDatabase();

