'use client';

import { useEffect, useState } from 'react';

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

const AdminPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch admin data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin');
        const data = await response.json();
        if (response.ok) {
          setBlogPosts(data.blogPosts);
          setProducts(data.products);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle adding a new blog post
  const handleAddBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newPost = {
      title: formData.get('title'),
      content: formData.get('content'),
      author: formData.get('author'),
      type: 'blog',
    };

    const response = await fetch('/api/admin', {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      setBlogPosts([data.blogPost, ...blogPosts]);
    } else {
      setError(data.message || 'Failed to add blog post');
    }
  };

  // Handle adding a new product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newProduct = {
      name: formData.get('name'),
      price: formData.get('price'),
      description: formData.get('description'),
      type: 'product',
    };

    const response = await fetch('/api/admin', {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      setProducts([data.product, ...products]);
    } else {
      setError(data.message || 'Failed to add product');
    }
  };

  // Handle deleting a blog post or product
const handleDelete = async (id: string, type: 'blog' | 'product') => {
  const response = await fetch('/api/admin', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, type }),
  });

  const data = await response.json();
  if (response.ok) {
    if (type === 'blog') {
      setBlogPosts(blogPosts.filter((post) => post._id !== id));
    } else {
      setProducts(products.filter((product) => product._id !== id));
    }
  } else {
    setError(data.message || 'Failed to delete');
  }
};

// Handle updating a blog post or product
const handleUpdate = async (id: string, type: 'blog' | 'product') => {
  const updatedData = type === 'blog'
    ? { title: 'Updated Title', content: 'Updated Content' } // Example: Add actual form or fields for input
    : { name: 'Updated Product', price: 99.99, description: 'Updated Description' };

  const response = await fetch('/api/admin', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, type, ...updatedData }),
  });

  const data = await response.json();
  if (response.ok) {
    if (type === 'blog') {
      setBlogPosts(blogPosts.map((post) => (post._id === id ? { ...post, ...updatedData } : post)));
    } else {
      setProducts(products.map((product) => (product._id === id ? { ...product, ...updatedData } : product)));
    }
  } else {
    setError(data.message || 'Failed to update');
  }
};


  // Render the page
  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Admin Panel</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Blog Post</h2>
        <form onSubmit={handleAddBlogPost} className="space-y-4 max-w-xl mx-auto">
          <input
            name="title"
            placeholder="Title"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="content"
            placeholder="Content"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="author"
            placeholder="Author"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Blog Post
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4 max-w-xl mx-auto">
          <input
            name="name"
            placeholder="Product Name"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Add Product
          </button>
        </form>
      </div>
      <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Blog Posts</h2>
      <ul className="space-y-6">
        {blogPosts.map((post) => (
          <li key={post._id} className="p-4 border border-gray-300 rounded-md">
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="mt-2">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">By: {post.author}</p>
            <button
              onClick={() => handleUpdate(post._id, 'blog')}
              className="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(post._id, 'blog')}
              className="ml-4 bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>

    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <ul className="space-y-6">
        {products.map((product) => (
          <li key={product._id} className="p-4 border border-gray-300 rounded-md">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="mt-2">{product.description}</p>
            <p className="text-lg font-medium mt-2">Price: ${product.price}</p>
            <button
              onClick={() => handleUpdate(product._id, 'product')}
              className="bg-yellow-500 text-white py-1 px-4 rounded-md hover:bg-yellow-600"
            >
              Update
            </button>
            <button
              onClick={() => handleDelete(product._id, 'product')}
              className="ml-4 bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>

    </div>
  );
};

export default AdminPage;