import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Divider,
  Spacer,
  Image,
} from "@heroui/react";
import {
  DocumentTextIcon,
  ClockIcon,
  TruckIcon,
  XMarkIcon,
  DocumentArrowDownIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  ShoppingBagIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import Navbar from "@/components/layouts/Navbar";

import useOrderStore from "@/stores/orderStore";

const OrderStatus = {
  pending: {
    text: "Chờ xử lý",
    color: "warning",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  processing: {
    text: "Đang xử lý",
    color: "primary",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
  shipped: {
    text: "Đã giao cho vận chuyển",
    color: "secondary",
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
  },
  delivered: {
    text: "Đã giao hàng",
    color: "success",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  cancelled: {
    text: "Đã hủy",
    color: "danger",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
};

const OrderHistory = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const { orders, pagination, loading, error, fetchOrderHistory, cancelOrder } =
    useOrderStore();

  useEffect(() => {
    setIsClient(true);

    // Load jsPDF dynamically
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
      document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (isClient) {
    fetchOrderHistory(currentPage, 10, statusFilter);
    }
  }, [currentPage, statusFilter, fetchOrderHistory, isClient]);

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
    try {
      await cancelOrder(orderId);
      await fetchOrderHistory(currentPage, 10, statusFilter);
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
      }
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const openImageModal = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const generatePDF = (order) => {
    if (typeof window.jspdf === "undefined") {
      alert("Thư viện jsPDF chưa được tải. Vui lòng thử lại sau.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    // Set font to Times
    doc.setFont("Times", "normal");
    doc.setFontSize(20);
    doc.setTextColor(91, 58, 41); // #5b3a29
    doc.text("HÓA ĐƠN THANH TOÁN", pageWidth / 2, y, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Đơn hàng #${order.id}`, pageWidth / 2, y + 10, {
      align: "center",
    });
    y += 20;

    // Customer information
    doc.setFontSize(14);
    doc.text("Thông tin khách hàng", margin, y);
    doc.setLineWidth(0.5);
    doc.line(margin, y + 2, pageWidth - margin, y + 2);
    y += 10;
    doc.setFontSize(12);
    doc.text(`Họ tên: ${order.shipping?.name || "N/A"}`, margin, y);
    y += 7;
    doc.text(`Số điện thoại: ${order.shipping?.phone || "N/A"}`, margin, y);
    y += 7;
    doc.text(
      `Địa chỉ giao hàng: ${order.shipping?.address || "N/A"}`,
      margin,
      y,
      { maxWidth: pageWidth - 2 * margin }
    );
    y += 15;

    // Payment method
    doc.setFontSize(14);
    doc.text("Phương thức thanh toán", margin, y);
    doc.line(margin, y + 2, pageWidth - margin, y + 2);
    y += 10;
    doc.setFontSize(12);
    doc.text(
      `Phương thức: ${order.paymentMethod === "COD" ? "Thanh toán khi nhận hàng (COD)" : "Chuyển khoản"}`,
      margin,
      y
    );
    y += 15;

    // Order items
    doc.setFontSize(14);
    doc.text("Chi tiết đơn hàng", margin, y);
    doc.line(margin, y + 2, pageWidth - margin, y + 2);
    y += 10;
    doc.setFontSize(12);
    
    // Table headers
    doc.text("Sản phẩm", margin, y);
    doc.text("Giá", margin + 80, y);
    doc.text("SL", margin + 120, y);
    doc.text("Thành tiền", margin + 140, y);
    y += 7;
    doc.line(margin, y, pageWidth - margin, y);
    y += 5;
    
    // Order items
    (order.items || []).forEach((item) => {
      if (item) {
        doc.text(item.product?.name || 'N/A', margin, y, { maxWidth: 70 });
        doc.text(`${formatPrice(item.price || 0)}`, margin + 80, y);
        doc.text(`${item.quantity || 0}`, margin + 120, y);
        doc.text(`${formatPrice(item.total || 0)}`, margin + 140, y);
      y += 10;
      }
    });
    y += 10;

    // Order summary
    doc.setFontSize(14);
    doc.text("Tổng thanh toán", margin, y);
    doc.line(margin, y + 2, pageWidth - margin, y + 2);
    y += 10;
    doc.setFontSize(12);
    doc.text(
      `Tổng tiền hàng: ${formatPrice(order.summary?.subtotal || 0)}`,
      margin,
      y
    );
    y += 7;
    doc.text(
      `Phí giao hàng: ${formatPrice(order.summary?.shippingFee || 0)}`,
      margin,
      y
    );
    y += 7;
    doc.setFontSize(14);
    doc.setTextColor(91, 58, 41);
    doc.text(`Tổng cộng: ${formatPrice(order.summary?.total || 0)}`, margin, y);

    doc.save(`Hoa_Don_Don_Hang_${order.id}.pdf`);
  };

  // Loading state
  if (!isClient || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="shadow-lg">
              <CardBody className="p-12 text-center">
                <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Đang tải dữ liệu...</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="shadow-lg border border-red-200">
              <CardBody className="p-8">
                <div className="text-center">
                  <XMarkIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-red-800 mb-2">
                    Có lỗi xảy ra
                  </h2>
                  <p className="text-red-600 mb-4">{error}</p>
              <button
                    onClick={() =>
                      fetchOrderHistory(currentPage, 10, statusFilter)
                    }
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Thử lại
              </button>
            </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <Card className="shadow-2xl border-0 mb-8">
            <CardHeader className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-white py-8">
              <div className="flex items-center gap-4 w-full">
                <div className="p-3 bg-white/20 rounded-xl">
                  <DocumentTextIcon className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">
            Lịch Sử Đơn Hàng
          </h1>
                  <p className="text-white/80 text-lg">
                    Theo dõi và quản lý đơn hàng của bạn
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Status Filter */}
          <Card className="shadow-lg mb-6">
            <CardBody className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Lọc theo trạng thái
              </h3>
              <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setStatusFilter(null)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    !statusFilter
                      ? "bg-orange-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Tất cả
            </button>
                {Object.entries(OrderStatus).map(
                  ([status, { text, bgColor, textColor }]) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  statusFilter === status
                          ? "bg-orange-600 text-white shadow-lg"
                          : `${bgColor} ${textColor} hover:opacity-80`
                }`}
              >
                {text}
              </button>
                  )
                )}
          </div>
            </CardBody>
          </Card>

          {/* Orders List */}
          {orders && orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => {
                if (!order) {
                  console.warn(
                    "Received null or undefined order in orders array"
                  );
                  return null;
                }
                
                const statusInfo =
                  OrderStatus[order?.status] || OrderStatus.pending;

                return (
                  <Card
                    key={order.id || Math.random()}
                    className="shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 py-4">
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <ShoppingBagIcon className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-800">
                              Đơn hàng #{order.id || "N/A"}
                      </h2>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Chip
                            color={statusInfo.color}
                            variant="flat"
                            size="lg"
                        >
                            {order?.statusLabel || statusInfo.text}
                          </Chip>
                        {order?.status === "pending" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                              className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                          >
                              <XMarkIcon className="w-4 h-4" />
                            Hủy đơn
                          </button>
                        )}
                        <button
                          onClick={() => generatePDF(order)}
                            className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                            <DocumentArrowDownIcon className="w-4 h-4" />
                          Tải PDF
                        </button>
                      </div>
                    </div>
                    </CardHeader>

                    <CardBody className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                        {/* Shipping Information */}
                      <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <TruckIcon className="w-5 h-5 text-green-600" />
                          Thông tin giao hàng
                        </h3>
                          <div className="space-y-3 bg-green-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2">
                              <UserIcon className="w-4 h-4 text-gray-500" />
                              <span className="font-medium">
                                {order?.shipping?.name || "N/A"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <PhoneIcon className="w-4 h-4 text-gray-500" />
                              <span>{order?.shipping?.phone || "N/A"}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <MapPinIcon className="w-4 h-4 text-gray-500 mt-1" />
                              <span className="text-sm">
                                {order?.shipping?.address || "N/A"}
                              </span>
                            </div>
                        {order?.shipping?.note && (
                              <div className="mt-3 p-3 bg-white rounded border-l-4 border-green-500">
                                <p className="text-sm text-gray-600">
                                  <strong>Ghi chú:</strong>{" "}
                                  {order.shipping.note}
                                </p>
                              </div>
                        )}
                          </div>
                        </div>
                      </div>

                      <Spacer y={6} />

                      {/* Order Items */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <ShoppingBagIcon className="w-5 h-5 text-purple-600" />
                          Sản phẩm đã đặt
                        </h3>
                        <div className="space-y-4">
                        {(order?.items || []).map((item) => {
                          if (!item) {
                              console.warn(
                                "Received null or undefined item in order items array"
                              );
                            return null;
                          }
                          
                          return (
                              <Card
                              key={item?.id || Math.random()}
                                className="bg-gray-50"
                            >
                                <CardBody className="p-4">
                              <div className="flex items-center gap-4">
                                    <Image
                                      src={
                                        item?.product?.image ||
                                        "/placeholder-image.jpg"
                                      }
                                      alt={item?.product?.name || "Sản phẩm"}
                                      width={80}
                                      height={80}
                                      className="object-cover rounded-lg"
                                      fallbackSrc="/placeholder-image.jpg"
                                />
                                    <div className="flex-1">
                                      <h4 className="font-semibold text-gray-800">
                                        {item?.product?.name ||
                                          "Sản phẩm không xác định"}
                                      </h4>
                                      <div className="flex items-center gap-4 mt-2">
                                        <span className="text-sm text-gray-600">
                                          Giá: {formatPrice(item?.price || 0)}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                          Số lượng: {item?.quantity || 0}
                                        </span>
                                </div>
                              </div>
                                    <div className="text-right">
                                      <p className="font-bold text-lg text-orange-600">
                                {formatPrice(item?.total || 0)}
                              </p>
                            </div>
                                  </div>
                                </CardBody>
                              </Card>
                          );
                        })}
                      </div>
                    </div>

                      <Spacer y={6} />

                    {/* Order Summary */}
                      <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
                        <CardBody className="p-6">
                          <h4 className="font-bold text-lg text-orange-800 mb-4 flex items-center gap-2">
                            <CreditCardIcon className="w-5 h-5" />
                            Tóm tắt thanh toán
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between text-gray-700">
                              <span>Tổng tiền hàng:</span>
                              <span className="font-medium">
                                {formatPrice(order?.summary?.subtotal || 0)}
                              </span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                              <span>Phí vận chuyển:</span>
                              <span className="font-medium">
                                {formatPrice(order?.summary?.shippingFee || 0)}
                              </span>
                            </div>
                            <Divider />
                            <div className="flex justify-between text-xl font-bold text-orange-600">
                              <span>Tổng cộng:</span>
                              <span>
                                {formatPrice(order?.summary?.total || 0)}
                              </span>
                    </div>
                  </div>
                        </CardBody>
                      </Card>
                    </CardBody>
                  </Card>
                );
              })}

              {/* Pagination */}
              {pagination?.totalPages > 1 && (
                <Card className="shadow-lg">
                  <CardBody className="p-6">
                    <div className="flex justify-center gap-2">
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                              ? "bg-orange-600 text-white shadow-lg"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                  </CardBody>
                </Card>
              )}
            </div>
          ) : (
            <Card className="shadow-lg">
              <CardBody className="p-12 text-center">
                <ShoppingBagIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Chưa có đơn hàng nào
                </h3>
                <p className="text-gray-500 mb-6">
                  Bạn chưa thực hiện đơn hàng nào. Hãy bắt đầu mua sắm ngay!
                </p>
                <button
                  onClick={() => router.push("/san-pham")}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                >
                  Bắt đầu mua sắm
                </button>
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <Card className="max-w-4xl max-h-[90vh] overflow-auto">
            <CardBody className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Chi tiết hình ảnh</h3>
                <button
                  onClick={closeImageModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <Image
              src={selectedImage}
              alt="Chi tiết hình ảnh"
                className="max-w-full h-auto rounded-lg"
            />
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
