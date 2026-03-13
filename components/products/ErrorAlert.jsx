import React from "react";

const ErrorAlert = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-red-700">{error}</p>
        <button
          onClick={onDismiss}
          className="text-red-500 hover:text-red-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert; 