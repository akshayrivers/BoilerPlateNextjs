import React from 'react';

interface ProductProps {
  product: {
    _id: string;
    name: string;
    price: number;
    description: string;
  };
}

const Product = ({ product }: ProductProps) => {
  return (
    <div key={product._id} className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {/* Add more product details or styling as needed */}
    </div>
  );
};

export default Product;