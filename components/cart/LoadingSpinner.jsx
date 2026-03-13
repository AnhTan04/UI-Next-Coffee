import React from 'react';
import { Spinner, Card, CardBody } from '@heroui/react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 pt-20 flex items-center justify-center p-4">
      <Card className="shadow-2xl border-0 max-w-md w-full">
        <CardBody className="text-center p-12 bg-gradient-to-br from-white to-amber-50">
          {/* Loading Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center shadow-lg">
              <Spinner 
                size="lg" 
                color="warning"
                classNames={{
                  circle1: "border-b-amber-500",
                  circle2: "border-b-orange-500"
                }}
              />
            </div>
            
            {/* Floating coffee beans */}
            <div className="absolute -top-2 -right-2 animate-bounce" style={{ animationDelay: '0.5s' }}>
              <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce" style={{ animationDelay: '1s' }}>
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
            </div>
            <div className="absolute top-0 left-0 animate-bounce" style={{ animationDelay: '1.5s' }}>
              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-800">
              Đang Tải Giỏ Hàng
            </h3>
            <p className="text-gray-600 text-sm">
              Vui lòng chờ trong giây lát...
            </p>
            
            {/* Loading Steps */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-center gap-2 text-amber-600">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Đang lấy thông tin sản phẩm</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span className="text-xs font-medium">Đang tính toán giá tiền</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-amber-700">
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-xs font-medium">Đang chuẩn bị giao diện</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Coffee Quote */}
          <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-center justify-center gap-2 text-amber-700">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm font-medium italic">
                "Cà phê ngon đang được chuẩn bị..."
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoadingSpinner; 