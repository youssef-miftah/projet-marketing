'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getProductById, Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(productId);
      if (data.success) {
        setProduct(data.data.product);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      alert('Produit ajouté au panier !');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Produit non trouvé</p>
      </div>
    );
  }

  const [selectedImage, setSelectedImage] = useState(0);
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[selectedImage] 
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="bg-white rounded-lg shadow-md p-4">
          {imageUrl ? (
            <>
              <div className="relative w-full h-96 mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={product.nom}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? 'border-primary-600'
                          : 'border-gray-200'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.nom} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-6xl">
              📦
            </div>
          )}
        </div>

        {/* Informations */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.nom}</h1>
          <div className="mb-4">
            <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
              {product.etat}
            </span>
            <span className="ml-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
              {product.categorie}
            </span>
          </div>

          <p className="text-3xl font-bold text-primary-600 mb-6">
            {product.prix.toFixed(2)} €
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Impact écologique */}
          {product.impactEcologique && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">🌱 Impact Écologique</h3>
              <p className="text-green-700 text-sm mb-1">
                {product.impactEcologique.description || 
                  `Économie de ${product.impactEcologique.co2Economise}kg de CO₂`}
              </p>
            </div>
          )}

          {/* Origine */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Origine</h3>
            <p className="text-gray-700">{product.origine}</p>
          </div>

          {/* Spécifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Spécifications</h3>
              <ul className="list-disc list-inside space-y-1">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key} className="text-gray-700">
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Stock et quantité */}
          <div className="border-t pt-6">
            <div className="mb-4">
              <span className="text-gray-600">
                Stock disponible: <strong>{product.stock}</strong>
              </span>
            </div>

            {product.stock > 0 ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Quantité:</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 border rounded-lg px-3 py-2"
                  />
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex-1"
                >
                  Ajouter au panier
                </button>
              </div>
            ) : (
              <button
                disabled
                className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg cursor-not-allowed w-full"
              >
                Rupture de stock
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

