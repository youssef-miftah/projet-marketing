'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { buybackAPI } from '@/lib/api';
import Link from 'next/link';

export default function SellPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    typeProduit: '',
    description: '',
    etat: '',
    prixPropose: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push('/login?redirect=/sell');
      return;
    }

    setLoading(true);

    try {
      const response = await buybackAPI.submit({
        typeProduit: formData.typeProduit,
        description: formData.description,
        etat: formData.etat,
        prixPropose: parseFloat(formData.prixPropose),
      });

      if (response.success) {
        setSuccess(true);
        setFormData({
          typeProduit: '',
          description: '',
          etat: '',
          prixPropose: '',
        });
      } else {
        alert('Erreur lors de la soumission de la demande');
      }
    } catch (error) {
      console.error('Error submitting buyback:', error);
      alert('Erreur lors de la soumission de la demande');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="mb-4">Vous devez être connecté pour vendre votre matériel.</p>
        <Link
          href="/login?redirect=/sell"
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 inline-block"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-4">Demande soumise avec succès !</h2>
          <p className="text-gray-600 mb-6">
            Votre demande de rachat a été enregistrée. Notre équipe va l'examiner 
            et vous contactera sous peu.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setSuccess(false)}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
            >
              Soumettre une autre demande
            </button>
            <Link
              href="/"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Vendre votre matériel</h1>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <p className="text-gray-600 mb-6">
          Vous avez du matériel informatique à vendre ? Remplissez le formulaire ci-dessous 
          et notre équipe vous proposera un prix de rachat.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type de produit *</label>
            <select
              required
              value={formData.typeProduit}
              onChange={(e) => setFormData({ ...formData, typeProduit: e.target.value })}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Sélectionner un type</option>
              <option value="PC">PC</option>
              <option value="Laptop">Laptop</option>
              <option value="Serveur">Serveur</option>
              <option value="Téléphone">Téléphone</option>
              <option value="Arduino/Raspberry">Arduino/Raspberry</option>
              <option value="Composant">Composant</option>
              <option value="Réseau">Réseau</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">État du matériel *</label>
            <select
              required
              value={formData.etat}
              onChange={(e) => setFormData({ ...formData, etat: e.target.value })}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Sélectionner un état</option>
              <option value="défectueux">Défectueux</option>
              <option value="obsolète">Obsolète</option>
              <option value="fonctionnel">Fonctionnel</option>
              <option value="inconnu">État inconnu</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border rounded-lg px-4 py-2"
              rows={5}
              placeholder="Décrivez votre matériel : marque, modèle, spécifications, problèmes éventuels..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Prix proposé (€) *</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.prixPropose}
              onChange={(e) => setFormData({ ...formData, prixPropose: e.target.value })}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="0.00"
            />
            <p className="text-sm text-gray-500 mt-1">
              Indiquez le prix que vous souhaitez recevoir (notre équipe peut proposer un autre prix)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
          >
            {loading ? 'Envoi...' : 'Soumettre la demande'}
          </button>
        </form>
      </div>
    </div>
  );
}

