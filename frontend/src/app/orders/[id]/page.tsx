'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ordersAPI, Order } from '@/lib/api';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadOrder();
  }, [params.id, user, router]);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      alert('Commande créée avec succès !');
    }
  }, [searchParams]);

  const loadOrder = async () => {
    try {
      const response = await ordersAPI.getById(params.id as string);
      if (response.success) {
        setOrder(response.data.order);
      }
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Commande non trouvée</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Commande #{order._id.slice(-8)}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Produits */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Produits</h2>
            <div className="space-y-4">
              {order.products.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h3 className="font-semibold">{item.nom}</h3>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    {(item.price * item.quantity).toFixed(2)} €
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Adresse de livraison */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Adresse de livraison</h2>
            <p>{order.adresseLivraison.rue}</p>
            <p>
              {order.adresseLivraison.codePostal} {order.adresseLivraison.ville}
            </p>
            <p>{order.adresseLivraison.pays}</p>
          </div>
        </div>

        {/* Résumé */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-semibold mb-4">Résumé</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{order.total.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>{order.total.toFixed(2)} €</span>
              </div>
            </div>
            <div className="mt-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                order.statut === 'delivered' ? 'bg-green-100 text-green-800' :
                order.statut === 'shipped' ? 'bg-blue-100 text-blue-800' :
                order.statut === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.statut === 'pending' && 'En attente'}
                {order.statut === 'confirmed' && 'Confirmée'}
                {order.statut === 'shipped' && 'Expédiée'}
                {order.statut === 'delivered' && 'Livrée'}
                {order.statut === 'cancelled' && 'Annulée'}
              </span>
            </div>
            {order.numeroSuivi && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Numéro de suivi:</p>
                <p className="font-semibold">{order.numeroSuivi}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

