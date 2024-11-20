'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        if (response.ok) {
          setBlogPosts(data);
        } else {
          setError('Failed to load blog posts');
        }
      } catch (err) {
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Render loading or error states
  if (loading) return <div className="text-center text-lg">Loading blog posts...</div>;
  if (error) return <div className="text-center text-lg text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog</h1>

      <div className="space-y-6">
        {blogPosts.length === 0 ? (
          <p className="text-center text-lg">No blog posts available.</p>
        ) : (
          blogPosts.map((post) => (
            <div key={post._id} className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-200">
                <Link href={`/blog/${post._id}`}>{post.title}</Link>
              </h2>
              <p className="text-sm text-gray-500">By {post.author} | {new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="mt-4 text-gray-700 line-clamp-3">{post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}