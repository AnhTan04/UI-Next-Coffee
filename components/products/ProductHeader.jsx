import React from "react";

const ProductHeader = ({ totalProducts }) => {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sản phẩm cà phê
        </h1>
        <p className="text-gray-600">{totalProducts} sản phẩm</p>
      </div>
    </div>
  );
};

export default ProductHeader; 