'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { productsAPI, getProducts, Product } from '@/lib/api';

export default function AdminProductsPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    categorie: '',
    etat: '',
    prix: '',
    stock: '',
    origine: '',
    co2Economise: '',
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!isAdmin) {
      router.push('/');
      return;
    }
    loadProducts();
  }, [user, isAdmin, router]);

  const loadProducts = async () => {
    try {
      const data = await getProducts({ limit: '100' });
      if (data.success) {
        setProducts(data.data.products || []);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        prix: parseFloat(formData.prix),
        stock: parseInt(formData.stock),
        impactEcologique: {
          co2Economise: parseFloat(formData.co2Economise) || 0,
        },
      };

      if (editingProduct) {
        await productsAPI.update(editingProduct._id, productData);
      } else {
        await productsAPI.create(productData);
      }

      setShowForm(false);
      setEditingProduct(null);
      setFormData({
        nom: '',
        description: '',
        categorie: '',
        etat: '',
        prix: '',
        stock: '',
        origine: '',
        co2Economise: '',
      });
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      nom: product.nom,
      description: product.description,
      categorie: product.categorie,
      etat: product.etat,
      prix: product.prix.toString(),
      stock: product.stock.toString(),
      origine: product.origine,
      co2Economise: product.impactEcologique?.co2Economise?.toString() || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    try {
      await productsAPI.delete(id);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erreur lors de la suppression');
    }
  };

  if (!user || !isAdmin || loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gestion des produits</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingProduct(null);
            setFormData({
              nom: '',
              description: '',
              categorie: '',
              etat: '',
              prix: '',
              stock: '',
              origine: '',
              co2Economise: '',
            });
          }}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
        >
          + Ajouter un produit
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nom *</label>
                <input
                  type="text"
                  required
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Catégorie *</label>
                <select
                  required
                  value={formData.categorie}
                  onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Sélectionner</option>
                  <option value="PC">PC</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Serveur">Serveur</option>
                  <option value="Téléphone">Téléphone</option>
                  <option value="Arduino/Raspberry">Arduino/Raspberry</option>
                  <option value="Composant">Composant</option>
                  <option value="Réseau">Réseau</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">État *</label>
                <select
                  required
                  value={formData.etat}
                  onChange={(e) => setFormData({ ...formData, etat: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="">Sélectionner</option>
                  <option value="reconditionné">Reconditionné</option>
                  <option value="recyclé">Recyclé</option>
                  <option value="upcyclé">Upcyclé</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Prix (€) *</label>
                <input
                  type="number"
                  required
                  step="0.01"
                  value={formData.prix}
                  onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stock *</label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Origine *</label>
              <input
                type="text"
                required
                value={formData.origine}
                onChange={(e) => setFormData({ ...formData, origine: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">CO₂ économisé (kg)</label>
              <input
                type="number"
                step="0.01"
                value={formData.co2Economise}
                onChange={(e) => setFormData({ ...formData, co2Economise: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
              >
                {editingProduct ? 'Modifier' : 'Créer'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.categorie}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.prix.toFixed(2)} €</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

