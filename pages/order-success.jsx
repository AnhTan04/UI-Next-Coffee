import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Divider,
  Spacer,
} from "@heroui/react";
import {
  CheckCircleIcon,
  ShoppingBagIcon,
  HomeIcon,
  DocumentTextIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/layouts/Navbar";

const OrderSuccess = () => {
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);

    // Generate client-side values
    setOrderId(`DH${Date.now().toString().slice(-8)}`);
    setCurrentDateTime(
      new Date().toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    // Load order information from localStorage
    const savedOrderInfo = localStorage.getItem("lastOrderInfo");
    const savedCustomerInfo = localStorage.getItem("customerInfo");

    if (savedOrderInfo) {
      setOrderInfo(JSON.parse(savedOrderInfo));
    }
    if (savedCustomerInfo) {
      setCustomerInfo(JSON.parse(savedCustomerInfo));
    }

    // Clear cart and temporary data after successful order
    localStorage.removeItem("cart");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("paymentDetails");
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-2xl border-0 mb-8">
              <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 text-white py-12">
                <div className="flex flex-col items-center text-center w-full">
                  <div className="p-4 bg-white/20 rounded-full mb-4">
                    <CheckCircleIcon className="w-16 h-16" />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Đặt hàng thành công!
                  </h1>
                  <p className="text-white/90 text-lg">
                    Đang tải thông tin đơn hàng...
                  </p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <Card className="shadow-2xl border-0 mb-8">
            <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 text-white py-12">
              <div className="flex flex-col items-center text-center w-full">
                <div className="p-4 bg-white/20 rounded-full mb-4">
                  <CheckCircleIcon className="w-16 h-16" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Đặt hàng thành công!
                </h1>
                <p className="text-white/90 text-lg">
                  Cảm ơn bạn đã tin tưởng và đặt hàng tại cửa hàng chúng tôi
                </p>
              </div>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50 py-6">
                <div className="flex items-center gap-3">
                  <DocumentTextIcon className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-blue-800">
                    Thông tin đơn hàng
                  </h2>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mã đơn hàng:</span>
                    <Chip color="primary" variant="flat" size="lg">
                      {orderId}
                    </Chip>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Thời gian đặt:</span>
                    <span className="font-medium">{currentDateTime}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Phương thức thanh toán:
                    </span>
                    <Chip
                      color={
                        customerInfo?.paymentMethod === "COD"
                          ? "warning"
                          : "success"
                      }
                      variant="flat"
                    >
                      {customerInfo?.paymentMethod === "COD"
                        ? "Thanh toán khi nhận hàng"
                        : "Chuyển khoản QR"}
                    </Chip>
                  </div>

                  <Divider />

                  <div className="flex justify-between items-center text-lg font-bold text-green-600">
                    <span>Tổng tiền:</span>
                    <span>
                      {orderInfo?.total
                        ? formatPrice(orderInfo.total)
                        : "Đang cập nhật..."}
                    </span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Customer Information */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-50 py-6">
                <div className="flex items-center gap-3">
                  <ShoppingBagIcon className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-purple-800">
                    Thông tin khách hàng
                  </h2>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-gray-600 block text-sm">
                      Họ và tên:
                    </span>
                    <span className="font-medium">
                      {customerInfo?.name || "Đang cập nhật..."}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-600 block text-sm">
                      Số điện thoại:
                    </span>
                    <span className="font-medium">
                      {customerInfo?.phone || "Đang cập nhật..."}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-600 block text-sm">Email:</span>
                    <span className="font-medium">
                      {customerInfo?.email || "Đang cập nhật..."}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-600 block text-sm">
                      Địa chỉ giao hàng:
                    </span>
                    <span className="font-medium">
                      {customerInfo
                        ? `${customerInfo.address}, ${customerInfo.ward}, ${customerInfo.district}, ${customerInfo.city}`
                        : "Đang cập nhật..."}
                    </span>
                  </div>

                  {customerInfo?.note && (
                    <div>
                      <span className="text-gray-600 block text-sm">
                        Ghi chú:
                      </span>
                      <span className="font-medium">{customerInfo.note}</span>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          <Spacer y={8} />

          {/* Order Status Timeline */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-50 py-6">
              <div className="flex items-center gap-3">
                <ClockIcon className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold text-orange-800">
                  Trạng thái đơn hàng
                </h2>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="space-y-6">
                {/* Current Status */}
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-700">
                      Đơn hàng đã được tiếp nhận
                    </h3>
                    <p className="text-sm text-gray-600">{currentDateTime}</p>
                  </div>
                  <Chip color="success" variant="flat">
                    Hoàn thành
                  </Chip>
                </div>

                {/* Upcoming Status */}
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-600">
                      Đang chuẩn bị hàng
                    </h3>
                    <p className="text-sm text-gray-500">
                      Dự kiến trong 1-2 giờ
                    </p>
                  </div>
                  <Chip color="default" variant="flat">
                    Chờ xử lý
                  </Chip>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-600">
                      Đang giao hàng
                    </h3>
                    <p className="text-sm text-gray-500">
                      Dự kiến trong 2-4 giờ
                    </p>
                  </div>
                  <Chip color="default" variant="flat">
                    Chờ xử lý
                  </Chip>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-600">
                      Giao hàng thành công
                    </h3>
                    <p className="text-sm text-gray-500">Hoàn tất đơn hàng</p>
                  </div>
                  <Chip color="default" variant="flat">
                    Chờ xử lý
                  </Chip>
                </div>
              </div>
            </CardBody>
          </Card>

          <Spacer y={8} />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between w-full">
            <button
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex-1 max-w-xs"
              onClick={() => router.push("/")}
            >
              <HomeIcon className="w-5 h-5" />
              Về trang chủ
            </button>

            <button
              className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium text-lg flex-1 max-w-xs"
              onClick={() => router.push("/san-pham")}
            >
              <ShoppingBagIcon className="w-5 h-5" />
              Tiếp tục mua sắm
            </button>
          </div>

          <Spacer y={6} />

          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
            <CardBody className="p-6 text-center">
              <h3 className="font-bold text-blue-800 mb-2">Cần hỗ trợ?</h3>
              <p className="text-blue-700 mb-4">
                Liên hệ với chúng tôi nếu bạn có bất kỳ thắc mắc nào về đơn hàng
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center text-sm">
                <span className="text-blue-600">📞 Hotline: 1900-xxxx</span>
                <span className="text-blue-600">
                  ✉️ Email: support@coffee.com
                </span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
