'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
};

const UpdatePage = () => {
  const { id, type } = useParams();  // Access dynamic route params (id and type)
  const [productData, setProductData] = useState<Product | null>(null);
  const [blogData, setBlogData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/admin/${type}/${id}`);
        const data = await response.json();
        if (response.ok) {
          if (type === 'product') {
            setProductData(data.product);
          } else {
            setBlogData(data.blogPost);
          }
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (id && type) {
      fetchData();
    }
  }, [id, type]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedData = type === 'product'
      ? {
          name: formData.get('name'),
          price: parseFloat(formData.get('price') as string),
          description: formData.get('description'),
        }
      : {
          title: formData.get('title'),
          content: formData.get('content'),
        };

    const response = await fetch('/api/admin', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, type, ...updatedData }),
    });

    const data = await response.json();
    if (response.ok) {
      window.location.href = '/admin'; // Redirect to the admin page after successful update
    } else {
      setError(data.message || 'Failed to update');
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Update {type === 'product' ? 'Product' : 'Blog Post'}</h1>

      <form onSubmit={handleUpdate} className="space-y-4 max-w-xl mx-auto">
        {type === 'product' ? (
          <>
            <input
              name="name"
              defaultValue={productData?.name}
              placeholder="Product Name"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="price"
              type="number"
              defaultValue={productData?.price}
              placeholder="Price"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              defaultValue={productData?.description}
              placeholder="Description"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        ) : (
          <>
            <input
              name="title"
              defaultValue={blogData?.title}
              placeholder="Title"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="content"
              defaultValue={blogData?.content}
              placeholder="Content"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Update {type === 'product' ? 'Product' : 'Blog Post'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
