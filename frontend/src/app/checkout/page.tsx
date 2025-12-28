'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ordersAPI } from '@/lib/api';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    rue: '',
    ville: '',
    codePostal: '',
    pays: 'France',
  });

  // Rediriger si non connecté
  if (!user) {
    router.push('/login?redirect=/checkout');
    return null;
  }

  // Rediriger si panier vide
  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        products: items.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        adresseLivraison: formData,
      };

      const response = await ordersAPI.create(orderData);

      if (response.success) {
        clearCart();
        router.push(`/orders/${response.data.order._id}?success=true`);
      } else {
        alert('Erreur lors de la création de la commande');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Erreur lors de la création de la commande');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Finaliser la commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulaire */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Adresse de livraison</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rue *</label>
              <input
                type="text"
                required
                value={formData.rue}
                onChange={(e) => setFormData({ ...formData, rue: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="123 Rue Example"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Ville *</label>
              <input
                type="text"
                required
                value={formData.ville}
                onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Paris"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Code postal *</label>
              <input
                type="text"
                required
                value={formData.codePostal}
                onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
                placeholder="75001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Pays *</label>
              <input
                type="text"
                required
                value={formData.pays}
                onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              {loading ? 'Traitement...' : `Commander pour ${total.toFixed(2)} €`}
            </button>
          </form>
        </div>

        {/* Résumé */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Résumé</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.product._id} className="flex justify-between">
                <span>
                  {item.product.nom} x {item.quantity}
                </span>
                <span>{(item.product.prix * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

