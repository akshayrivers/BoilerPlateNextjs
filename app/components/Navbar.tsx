'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';

export default function Navbar() {
  const [Token1, setToken] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(!!token); 
  }, []); 


  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      {/* Logo or Title */}
      <div className="text-lg font-bold">
        <Link href="/" className="hover:text-gray-300">Yoga Products</Link>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link href="/" className="hover:text-gray-300">Home</Link>
        <Link href="/products" className="hover:text-gray-300">Products</Link>
        <Link href="/blog" className="hover:text-gray-300">Blogs</Link>
      </div>

      {/* Authentication Button */}
      <div>
        {Token1 ? (
          <SignOutButton />
        ) : (
          <SignInButton  />
        )}
      </div>
    </nav>
  );
}