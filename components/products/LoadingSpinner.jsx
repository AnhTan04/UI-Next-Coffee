import React from "react";
import { Spinner } from "@heroui/react";

const LoadingSpinner = ({ message = "Đang tải..." }) => {
  return (
    <div className="flex justify-center py-12">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 