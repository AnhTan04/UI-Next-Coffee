import React from "react";
import { Button } from "@heroui/react";

const EmptyState = ({ onReset }) => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM10 12a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Không tìm thấy sản phẩm
      </h3>
      <p className="text-gray-600 mb-4">
        Thử thay đổi từ khóa tìm kiếm hoặc danh mục
      </p>
      <Button onClick={onReset}>Đặt lại bộ lọc</Button>
    </div>
  );
};

export default EmptyState; 