'use client'

import { useState, useEffect } from 'react';

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]); // Initialize products as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        if (response.ok) {
          setProducts(data); // Assuming response contains products
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Render loading or error states
  if (loading) return <div className="text-center text-lg">Loading products...</div>;
  if (error) return <div className="text-center text-lg text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-4xl font-bold mb-6 text-center text-teal-800 font-serif">Products</h1>

      <div className="space-y-6">
        {products.length === 0 ? (
          <p className="text-center text-lg">No products available.</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold text-blue-600 font-serif hover:text-blue-800 transition duration-200">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500">Price: ${product.price}</p>
              <p className="mt-4 text-gray-700 mb-4">{product.description}</p>
              <button className='bg-black text-emerald-100 rounded-lg text-center shadow-xl hover:text-gray-300 w-32 p-3 focus:outline-none'>Buy product</button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}