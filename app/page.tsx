import React from 'react';
import ProductPage from './products/page';
import BlogPage from './blog/page';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-center text-8xl font-bold my-8 font-serif ">Welcome to the Smart Yoga Store</h1>
      <div className=" flex flex-row sm:flex-row justify-center gap-8 px-4">
        <div className="flex-1">
          <ProductPage />
        </div>
        <div className="flex-1">
          <BlogPage />
        </div>
      </div>
    </div>
  );
};

export default HomePage;