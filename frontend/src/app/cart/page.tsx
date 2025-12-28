'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Panier</h1>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Votre panier est vide</p>
          <Link
            href="/products"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 inline-block"
          >
            Voir le catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des produits */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const imageUrl = item.product.images && item.product.images.length > 0
              ? item.product.images[0]
              : '/placeholder-product.jpg';

            return (
              <div
                key={item.product._id}
                className="bg-white rounded-lg shadow-md p-4 flex gap-4"
              >
                <div className="relative w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0">
                  {item.product.images && item.product.images.length > 0 ? (
                    <Image
                      src={imageUrl}
                      alt={item.product.nom}
                      fill
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">
                      📦
                    </div>
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{item.product.nom}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.product.categorie}</p>
                  <p className="text-primary-600 font-bold">
                    {item.product.prix.toFixed(2)} €
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.product._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                      className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                      className="w-8 h-8 border rounded-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold mt-2">
                    {(item.product.prix * item.quantity).toFixed(2)} €
                  </p>
                </div>
              </div>
            );
          })}

          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Vider le panier
          </button>
        </div>

        {/* Résumé */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Résumé</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>Gratuite</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
            >
              Passer la commande
            </button>
            <Link
              href="/products"
              className="block text-center text-gray-600 hover:text-primary-600 mt-4"
            >
              Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

