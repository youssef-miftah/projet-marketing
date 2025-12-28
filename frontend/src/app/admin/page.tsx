'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { buybackAPI, Buyback } from '@/lib/api';
import Link from 'next/link';

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();
  const [buybacks, setBuybacks] = useState<Buyback[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (!isAdmin) {
      router.push('/');
      return;
    }
    loadBuybacks();
  }, [user, isAdmin, router, filter]);

  const loadBuybacks = async () => {
    try {
      const params = filter ? { statut: filter } : {};
      const response = await buybackAPI.getAll(params);
      if (response.success) {
        setBuybacks(response.data.buybacks || []);
      }
    } catch (error) {
      console.error('Error loading buybacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, statut: string, prixAccepte?: number) => {
    try {
      const response = await buybackAPI.updateStatus(id, {
        statut,
        prixAccepte,
      });
      if (response.success) {
        loadBuybacks();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Erreur lors de la mise à jour');
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
      <h1 className="text-4xl font-bold mb-8">Back-office Admin</h1>

      <div className="mb-6">
        <Link
          href="/admin/products"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 inline-block mr-4"
        >
          Gérer les produits
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Demandes de rachat</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Filtrer par statut</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Toutes</option>
            <option value="pending">En attente</option>
            <option value="accepted">Acceptées</option>
            <option value="rejected">Refusées</option>
            <option value="completed">Terminées</option>
          </select>
        </div>
      </div>

      {buybacks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Aucune demande de rachat</p>
      ) : (
        <div className="space-y-4">
          {buybacks.map((buyback) => (
            <div key={buyback._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{buyback.typeProduit}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {new Date(buyback.createdAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  buyback.statut === 'accepted' ? 'bg-green-100 text-green-800' :
                  buyback.statut === 'rejected' ? 'bg-red-100 text-red-800' :
                  buyback.statut === 'completed' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {buyback.statut === 'pending' && 'En attente'}
                  {buyback.statut === 'accepted' && 'Acceptée'}
                  {buyback.statut === 'rejected' && 'Refusée'}
                  {buyback.statut === 'completed' && 'Terminée'}
                </span>
              </div>

              <p className="text-gray-700 mb-4">{buyback.description}</p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>État:</strong> {buyback.etat}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Prix proposé:</strong> {buyback.prixPropose.toFixed(2)} €
              </p>

              {buyback.statut === 'pending' && (
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => {
                      const prix = prompt('Prix accepté (€):', buyback.prixPropose.toString());
                      if (prix) {
                        handleUpdateStatus(buyback._id, 'accepted', parseFloat(prix));
                      }
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Accepter
                  </button>
                  <button
                    onClick={() => {
                      const comment = prompt('Commentaire (optionnel):');
                      handleUpdateStatus(buyback._id, 'rejected');
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Refuser
                  </button>
                </div>
              )}

              {buyback.prixAccepte && (
                <p className="text-green-600 font-semibold mt-2">
                  Prix accepté: {buyback.prixAccepte.toFixed(2)} €
                </p>
              )}

              {buyback.commentaireAdmin && (
                <p className="text-gray-600 text-sm mt-2">
                  <strong>Commentaire:</strong> {buyback.commentaireAdmin}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

