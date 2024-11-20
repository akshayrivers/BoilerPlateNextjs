"use client"
import Link from 'next/link';
import React from 'react';

const SignInButton = () => {
  return (
    <nav>
      <Link href="/signin" className="hover:text-gray-300"><button>
        Sign In
      </button>
      </Link>
      
    </nav>
    
  );
};

export default SignInButton;