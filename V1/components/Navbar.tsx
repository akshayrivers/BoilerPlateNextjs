'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { Button } from '@react-email/components';

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  // Helper function to perform a full redirect.
  const redirectTo = (url: string) => {
    window.location.href = url;
  };

  return (
    <nav className="p-4 md:p-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Home is a standard anchor tag that already causes a full redirect */}
        <a className="text-xl font-bold mb-4 md:mb-0" href="/">
          Home
        </a>

        <div>
          {/* Dashboard button uses onClick to redirect */}
          <Button
            className="w-full md:w-auto font-bold"
            onClick={() => redirectTo('/dashboard')}
          >
            Dashboard
          </Button>
        </div>

        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user.username || user.email}
            </span>
            <Button className="w-full md:w-auto" onClick={() => signOut()}>
              Logout
            </Button>
          </>
        ) : (
          // Login button also uses onClick to redirect
          <Button
            className="w-full md:w-auto"
            onClick={() => redirectTo('/sign-in')}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
