import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Danh mục
      </label>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("Tất cả")}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
            ${selectedCategory === "Tất cả" 
              ? "bg-blue-600 text-white border-2 border-blue-600 shadow-md hover:bg-blue-700 hover:border-blue-700" 
              : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
            }
          `}
        >
          Tất cả
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
              ${selectedCategory === category.id
                ? "bg-blue-600 text-white border-2 border-blue-600 shadow-md hover:bg-blue-700 hover:border-blue-700"
                : "bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
              }
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter; 