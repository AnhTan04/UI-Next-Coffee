import React from 'react';
import { Button, Input, Spinner } from '@heroui/react';
import useCart from '@/hooks/useCart';

const QuantityControls = ({ quantity, productId }) => {
  const { 
    updatingQuantity, 
    handleQuantityChange, 
    handleQuantityInputChange 
  } = useCart();
  
  const isUpdating = updatingQuantity.has(productId);

  const handleDecreaseClick = () => {
    console.log('🔽 Decrease button clicked:', { productId, currentQuantity: quantity, newQuantity: quantity - 1 });
    handleQuantityChange(productId, quantity - 1);
  };

  const handleIncreaseClick = () => {
    console.log('🔼 Increase button clicked:', { productId, currentQuantity: quantity, newQuantity: quantity + 1 });
    handleQuantityChange(productId, quantity + 1);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log('📝 Input value changed:', { productId, currentQuantity: quantity, inputValue: value });
    handleQuantityInputChange(productId, value);
  };

  console.log('🎛️ QuantityControls render:', { productId, quantity, isUpdating });

  return (
    <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1 border border-gray-200">
      {/* Decrease Button */}
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="warning"
        onClick={handleDecreaseClick}
        disabled={quantity <= 1 || isUpdating}
        className={`
          min-w-8 h-8 rounded-lg font-bold text-sm
          transition-all duration-200 transform hover:scale-105
          ${quantity <= 1 || isUpdating
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:shadow-md active:scale-95'
          }
        `}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
        </svg>
      </Button>
      
      {/* Quantity Input */}
      <div className="relative">
        <Input
          type="number"
          min="1"
          value={quantity.toString()}
          onChange={handleInputChange}
          disabled={isUpdating}
          size="sm"
          variant="flat"
          className="w-16"
          classNames={{
            input: "text-center font-bold text-sm",
            inputWrapper: "h-8 min-h-8 bg-white border border-gray-200 hover:border-amber-300 focus-within:border-amber-500"
          }}
        />
        {/* {isUpdating && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
            <Spinner size="sm" color="warning" />
          </div>
        )} */}
      </div>
      
      {/* Increase Button */}
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="warning"
        onClick={handleIncreaseClick}
        disabled={isUpdating}
        className={`
          min-w-8 h-8 rounded-lg font-bold text-sm
          transition-all duration-200 transform hover:scale-105
          ${isUpdating
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:shadow-md active:scale-95'
          }
        `}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
        </svg>
      </Button>
    </div>
  );
};

export default QuantityControls; 