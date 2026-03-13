import React from "react";

const SearchInput = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Tìm kiếm
      </label>
      <input
        type="text"
        placeholder="Nhập tên sản phẩm..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-400"
      />
    </div>
  );
};

export default SearchInput; 