import React from 'react';
import { Card, CardBody, Divider, Button, Chip } from '@heroui/react';
import useCart from '@/hooks/useCart';

const CartSummary = () => {
  const { total, formatPrice, handleCheckout } = useCart();

  return (
    <Card className="shadow-2xl border-0 overflow-hidden">
      <CardBody className="p-8 bg-gradient-to-br from-white to-amber-50">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Tổng Kết Đơn Hàng</h3>
            <p className="text-gray-600 text-sm">Kiểm tra và xác nhận thanh toán</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center py-3 px-4 bg-white rounded-xl shadow-sm">
            <span className="text-gray-600 font-medium">Tạm tính:</span>
            <span className="text-lg font-semibold text-gray-800">
              {formatPrice(total || 0)}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-3 px-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-700 font-medium">Miễn phí vận chuyển</span>
            </div>
            <Chip size="sm" color="success" variant="flat">
              Tiết kiệm 30.000₫
            </Chip>
          </div>
        </div>

        <Divider className="my-6" />

        {/* Total */}
        <div className="flex justify-between items-center mb-8 py-4 px-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl border-2 border-amber-200">
          <div>
            <span className="text-lg font-semibold text-gray-700 block">Tổng thanh toán:</span>
            <span className="text-xs text-gray-500">(Đã bao gồm VAT)</span>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {formatPrice(total || 0)}
            </span>
            <div className="flex items-center gap-1 mt-1">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span className="text-xs text-green-600 font-medium">Giá tốt nhất</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Continue Shopping Button */}
          <Button
            as="a"
            href="/san-pham"
            variant="bordered"
            color="warning"
            size="lg"
            className="flex-1 h-14 font-semibold border-2 hover:bg-amber-50"
            startContent={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            }
          >
            Mua Sắm Tiếp
          </Button>
          
          {/* Checkout Button */}
          <Button
            onClick={handleCheckout}
            color="warning"
            size="lg"
            className="flex-1 h-14 font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl text-white"
            endContent={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            }
          >
            Đặt Hàng Ngay
          </Button>
        </div>

        {/* Security Notice */}
        <div className="flex items-center justify-center gap-2 mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm text-blue-700 font-medium">
            Thanh toán an toàn & bảo mật 100%
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default CartSummary; 