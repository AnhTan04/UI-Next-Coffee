import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  products,
  onAddToCart,
  addingToCart,
  formatPrice,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          addingToCart={addingToCart}
          formatPrice={formatPrice}
        />
      ))}
    </div>
  );
};

export default ProductGrid; 