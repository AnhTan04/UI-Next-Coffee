import React from 'react';
import { Card, CardBody, Button, Chip } from '@heroui/react';

const EmptyCart = () => {
  return (
    <Card className="shadow-2xl border-0 max-w-lg mx-auto overflow-hidden">
      <CardBody className="text-center p-12 bg-gradient-to-br from-white via-amber-50 to-orange-50">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full flex items-center justify-center">
              <svg className="w-16 h-16 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
              </svg>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2">
            <div className="w-6 h-6 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="absolute -bottom-2 -left-2">
            <div className="w-4 h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          <h3 className="text-2xl font-bold text-gray-800">
            Giỏ Hàng Trống
          </h3>
          <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            Hãy khám phá bộ sưu tập cà phê đặc biệt của chúng tôi và thêm những sản phẩm yêu thích vào giỏ hàng
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <Chip size="sm" variant="flat" color="success">
              ✨ Cà phê premium
            </Chip>
            <Chip size="sm" variant="flat" color="warning">
              🚚 Giao hàng miễn phí
            </Chip>
            <Chip size="sm" variant="flat" color="primary">
              💰 Giá tốt nhất
            </Chip>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <Button
            as="a"
            href="/san-pham"
            size="lg"
            className="w-full h-14 font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl text-white transform hover:scale-[1.02] transition-all duration-200"
            startContent={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            }
          >
            Khám Phá Sản Phẩm
          </Button>
          
          <Button
            as="a"
            href="/"
            variant="bordered"
            color="warning"
            size="md"
            className="w-full font-semibold border-2 hover:bg-amber-50"
            startContent={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            }
          >
            Về Trang Chủ
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-center gap-2 text-blue-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">
              Cần hỗ trợ? Liên hệ hotline: 1900-xxxx
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EmptyCart; 