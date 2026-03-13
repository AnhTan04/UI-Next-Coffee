import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import useCart from "@/hooks/useCart";

const CartHeader = () => {
  const { cartItems } = useCart();
  const itemCount = cartItems?.length || 0;

  return (
    <Card className="shadow-lg border-0 mb-8 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50">
      <CardBody className="text-center py-8 px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
            Giỏ Hàng Của Bạn
          </h1>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Chip
            size="lg"
            variant="flat"
            color={itemCount > 0 ? "warning" : "default"}
            className="font-semibold"
          >
            {itemCount > 0 ? `${itemCount} sản phẩm` : "Trống"}
          </Chip>
          {itemCount > 0 && (
            <div className="flex items-center gap-2 text-amber-700">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium">Sẵn sàng thanh toán</span>
            </div>
          )}
        </div>

        {itemCount === 0 && (
          <p className="text-gray-500 mt-3 text-sm">
            Hãy thêm sản phẩm yêu thích vào giỏ hàng
          </p>
        )}
      </CardBody>
    </Card>
  );
};

export default CartHeader;
