import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/signin">Sign In</Link>
        </li>
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
        {/* Add SignInButton, SignOutButton etc. */}
      </ul>
    </nav>
  );
};

export default Navbar;