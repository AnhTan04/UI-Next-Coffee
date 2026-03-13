import React from 'react';
import { Button, Tooltip } from '@heroui/react';
import useCart from '@/hooks/useCart';

const RemoveButton = ({ productId }) => {
  const { removingItems, handleRemoveProduct } = useCart();
  const isRemoving = removingItems.has(productId);

  return (
    <Tooltip 
      content="Xóa sản phẩm khỏi giỏ hàng" 
      color="danger"
      placement="top"
    >
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="danger"
        onClick={() => handleRemoveProduct(productId)}
        disabled={isRemoving}
        isLoading={isRemoving}
        className={`
          min-w-10 h-10 rounded-xl
          transition-all duration-200 transform hover:scale-105
          ${isRemoving
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:shadow-lg active:scale-95 hover:bg-red-100'
          }
        `}
        spinner={
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        }
      >
        {!isRemoving && (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
            />
          </svg>
        )}
      </Button>
    </Tooltip>
  );
};

export default RemoveButton; 