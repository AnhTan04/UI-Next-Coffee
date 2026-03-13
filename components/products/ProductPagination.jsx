import React from "react";
import { Pagination } from "@heroui/react";

const ProductPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      <Pagination
        total={totalPages}
        page={currentPage}
        onChange={onPageChange}
        showControls
      />
    </div>
  );
};

export default ProductPagination; 