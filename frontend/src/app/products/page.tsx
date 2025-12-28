'use client';

import { useState, useEffect } from 'react';
import { getProducts, Product } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categorie: '',
    etat: '',
    minPrix: '',
    maxPrix: '',
    recyclé: '',
  });

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (filters.categorie) params.categorie = filters.categorie;
      if (filters.etat) params.etat = filters.etat;
      if (filters.minPrix) params.minPrix = filters.minPrix;
      if (filters.maxPrix) params.maxPrix = filters.maxPrix;
      if (filters.recyclé === 'true') params.recyclé = 'true';

      const data = await getProducts(params);
      if (data.success) {
        setProducts(data.data.products || []);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Catalogue Produits</h1>

      {/* Filtres */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Filtres</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Catégorie</label>
            <select
              value={filters.categorie}
              onChange={(e) => handleFilterChange('categorie', e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Toutes</option>
              <option value="PC">PC</option>
              <option value="Laptop">Laptop</option>
              <option value="Serveur">Serveur</option>
              <option value="Téléphone">Téléphone</option>
              <option value="Arduino/Raspberry">Arduino/Raspberry</option>
              <option value="Composant">Composant</option>
              <option value="Réseau">Réseau</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">État</label>
            <select
              value={filters.etat}
              onChange={(e) => handleFilterChange('etat', e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Tous</option>
              <option value="reconditionné">Reconditionné</option>
              <option value="recyclé">Recyclé</option>
              <option value="upcyclé">Upcyclé</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Prix min (€)</label>
            <input
              type="number"
              value={filters.minPrix}
              onChange={(e) => handleFilterChange('minPrix', e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Prix max (€)</label>
            <input
              type="number"
              value={filters.maxPrix}
              onChange={(e) => handleFilterChange('maxPrix', e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Recyclé uniquement</label>
            <select
              value={filters.recyclé}
              onChange={(e) => handleFilterChange('recyclé', e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Tous</option>
              <option value="true">Oui</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des produits */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Chargement...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun produit trouvé avec ces filtres.</p>
        </div>
      )}
    </div>
  );
}

