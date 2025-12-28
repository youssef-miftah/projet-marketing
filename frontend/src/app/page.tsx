import Link from 'next/link';
import { getProducts } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';

export default async function HomePage() {
  // Récupérer les produits phares (limite à 6)
  let featuredProducts: any[] = [];
  try {
    const productsData = await getProducts({ limit: '6' });
    featuredProducts = productsData?.data?.products || [];
  } catch (error) {
    console.error('Error loading products:', error);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-primary-700">
          Recycled Tech
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Donnez une seconde vie à votre matériel informatique. 
          Nous achetons, réparons et revendons du matériel 100% fonctionnel 
          avec une démarche écologique.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/products"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition"
          >
            Voir le catalogue
          </Link>
          <Link
            href="/sell"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
          >
            Vendre votre matériel
          </Link>
        </div>
      </section>

      {/* Mission écologique */}
      <section className="bg-green-50 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary-800">
          Notre Mission Écologique
        </h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-4xl mb-2">♻️</div>
            <h3 className="font-semibold mb-2">Recyclage</h3>
            <p className="text-gray-600">
              Nous recyclons le matériel défectueux pour réduire les déchets électroniques
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🔧</div>
            <h3 className="font-semibold mb-2">Reconditionnement</h3>
            <p className="text-gray-600">
              Réparation et remise à neuf pour prolonger la vie utile du matériel
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🌱</div>
            <h3 className="font-semibold mb-2">Impact Positif</h3>
            <p className="text-gray-600">
              Chaque produit acheté contribue à réduire l'empreinte carbone
            </p>
          </div>
        </div>
      </section>

      {/* Produits phares */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Produits Phares</h2>
          <Link
            href="/products"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Voir tout →
          </Link>
        </div>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Aucun produit disponible pour le moment
          </p>
        )}
      </section>
    </div>
  );
}

