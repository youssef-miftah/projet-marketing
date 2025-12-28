'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary-600">
            ♻️ Recycled Tech
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/products" className="text-gray-700 hover:text-primary-600">
              Catalogue
            </Link>
            <Link href="/sell" className="text-gray-700 hover:text-primary-600">
              Vendre
            </Link>
            {user && (
              <Link href="/orders" className="text-gray-700 hover:text-primary-600">
                Mes commandes
              </Link>
            )}
            {isAdmin && (
              <Link href="/admin" className="text-gray-700 hover:text-primary-600">
                Admin
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Panier */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600"
            >
              <span className="text-xl">🛒</span>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {user.prenom || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-600 text-sm"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary-600 text-sm"
                >
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 text-sm"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

