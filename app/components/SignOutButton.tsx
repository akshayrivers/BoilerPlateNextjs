import Link from 'next/link';
import React from 'react';

const SignOutButton = () => {
  function handleclick(): void {
    localStorage.removeItem("token");
  }

  return (
    <nav>
      <Link href="/" className="hover:text-gray-300"><button onClick={handleclick}>
        Sign Out
      </button>
      </Link>
      
    </nav>
  );
};

export default SignOutButton;