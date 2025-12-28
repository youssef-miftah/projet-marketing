import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images && product.images.length > 0 
    ? product.images[0] 
    : '/placeholder-product.jpg';

  return (
    <Link href={`/products/${product._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <div className="relative h-48 bg-gray-200">
          {product.images && product.images.length > 0 ? (
            <Image
              src={imageUrl}
              alt={product.nom}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              📦
            </div>
          )}
          <span className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
            {product.etat}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.nom}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary-600">
              {product.prix.toFixed(2)} €
            </span>
            <span className="text-sm text-gray-500">
              {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
            </span>
          </div>
          {product.impactEcologique?.co2Economise > 0 && (
            <div className="mt-2 text-xs text-green-600">
              🌱 Économie de {product.impactEcologique.co2Economise}kg CO₂
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

