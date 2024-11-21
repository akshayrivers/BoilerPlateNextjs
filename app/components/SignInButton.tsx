"use client"
import Link from 'next/link';
import React from 'react';

const SignInButton = () => {
  return (
    <nav>
      <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center text-xl font-semibold">
      <Link href="/signin" className="hover:text-gray-300">
      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 text-gray-700"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg>
      </Link>
      </div>
      
    </nav>
    
  );
};

export default SignInButton;