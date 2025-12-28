'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ordersAPI, Order } from '@/lib/api';
import Link from 'next/link';

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login?redirect=/orders');
      return;
    }
    loadOrders();
  }, [user, router]);

  const loadOrders = async () => {
    try {
      const response = await ordersAPI.getMyOrders();
      if (response.success) {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Mes commandes</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Vous n'avez pas encore de commandes.</p>
          <Link
            href="/products"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 inline-block"
          >
            Voir le catalogue
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order._id}
              href={`/orders/${order._id}`}
              className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Commande #{order._id.slice(-8)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {order.products.length} produit(s)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">
                    {order.total.toFixed(2)} €
                  </p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

