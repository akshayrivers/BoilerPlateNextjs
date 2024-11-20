// pages/blog.tsx

import { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);

  // Fetch blog posts from the API when the component mounts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      const res = await fetch("/api/admin");
      const data = await res.json();
      setBlogPosts(data.blogPosts);
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {/* Display All Blog Posts */}
      <div className="space-y-4">
        {blogPosts.length > 0 ? (
          blogPosts.map((post: any) => (
            <div key={post._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600">by {post.author}</p>
              <p className="mt-2">{post.content}</p>
            </div>
          ))
        ) : (
          <p>No blog posts available</p>
        )}
      </div>
    </div>
  );
}