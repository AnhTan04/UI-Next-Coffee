import React from 'react';
import Navbar from '@/components/layouts/Navbar';
import {
  CartHeader,
  CartTable,
  CartSummary,
  EmptyCart,
  LoadingSpinner
} from '@/components/cart';
import useCart from '@/hooks/useCart';

const GioHang = () => {
  const { cartItems, loading } = useCart();

  if (loading) {
    return (
      <>
        <Navbar />
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <CartHeader />

          {cartItems && cartItems.length > 0 ? (
            <div className="space-y-6">
              <CartTable />
              <CartSummary />
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
    </>
  );
};

export default GioHang;