import React from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image,
  Chip,
  Spacer,
} from "@heroui/react";
import {
  CreditCardIcon,
  BanknotesIcon,
  QrCodeIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import useCartStore from "@/stores/cartStore";

const Step2Payment = ({
  paymentMethod,
  setPaymentMethod,
  paymentDetails,
  setPaymentDetails,
  showOrderDetails,
  setShowOrderDetails,
  handleDeleteImage,
  setStep,
  customerInfo,
}) => {
  const router = useRouter();
  const { total } = useCartStore();

  const shippingFee = 10000;
  const totalAmount = total + shippingFee;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleContinue = () => {
    if (paymentMethod === "ATM" && !paymentDetails) {
      localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
      router.push(`/payment?amount=${totalAmount}&returnToStep=2`);
    } else {
      setStep(3);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-white py-6">
        <div className="flex items-center gap-3 w-full">
          <div className="p-2 bg-white/20 rounded-lg">
            <CreditCardIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Phương thức thanh toán</h2>
            <p className="text-white/80 text-sm">
              Chọn cách thức thanh toán phù hợp
            </p>
          </div>
        </div>
      </CardHeader>

      <CardBody className="p-6">
        <div className="space-y-6">
          {/* Payment Method Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Chọn phương thức thanh toán
            </h3>
            <div className="space-y-3">
              {/* COD Option */}
              <label
                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                  paymentMethod === "COD"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BanknotesIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Thanh toán khi nhận hàng (COD)
                    </h4>
                    <p className="text-sm text-gray-500">
                      Thanh toán bằng tiền mặt khi nhận hàng
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
              </label>

              {/* ATM Option */}
              <label
                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                  paymentMethod === "ATM"
                    ? "border-orange-500 bg-orange-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <QrCodeIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Thẻ ATM / Quét mã QR
                    </h4>
                    <p className="text-sm text-gray-500">
                      Thanh toán online qua QR code
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ATM"
                  checked={paymentMethod === "ATM"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-5 h-5 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
              </label>
            </div>
          </div>

          {/* ATM Payment Details */}
          {paymentMethod === "ATM" && (
            <Card className="bg-blue-50 border border-blue-200">
              <CardBody className="p-4">
                {paymentDetails ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-blue-800">
                        Thông tin thanh toán
                      </h4>
                      <button
                        className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                        onClick={() => setShowOrderDetails(!showOrderDetails)}
                      >
                        {showOrderDetails ? (
                          <EyeSlashIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                        {showOrderDetails ? "Thu gọn" : "Chi tiết"}
                      </button>
                    </div>

                    {showOrderDetails && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-600">
                              Số tiền đã thanh toán:
                            </span>
                            <Chip color="success" variant="flat" size="lg">
                              {formatPrice(parseFloat(paymentDetails.amount))}
                            </Chip>
                          </div>
                        </div>

                        <div className="text-center">
                          <Image
                            src={paymentDetails.image}
                            alt="Xác nhận thanh toán"
                            width={200}
                            height={200}
                            className="object-cover rounded-lg shadow-md mx-auto"
                          />
                        </div>

                        <div className="flex justify-center gap-3">
                          <button
                            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                            onClick={() =>
                              router.push(
                                `/payment?amount=${totalAmount}&returnToStep=2`
                              )
                            }
                          >
                            <ArrowPathIcon className="w-4 h-4" />
                            Tải lại ảnh
                          </button>
                          <button
                            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            onClick={handleDeleteImage}
                          >
                            <TrashIcon className="w-4 h-4" />
                            Xóa ảnh
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="p-4 bg-white rounded-lg border-2 border-dashed border-blue-300">
                      <QrCodeIcon className="w-12 h-12 text-blue-500 mx-auto mb-2" />
                      <p className="text-blue-700 font-medium mb-2">
                        Quét mã QR để thanh toán
                      </p>
                      <p className="text-sm text-blue-600">
                        Số tiền: {formatPrice(totalAmount)}
                      </p>
                    </div>
                    <button
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mx-auto"
                      onClick={() =>
                        router.push(
                          `/payment?amount=${totalAmount}&returnToStep=2`
                        )
                      }
                    >
                      <QrCodeIcon className="w-5 h-5" />
                      Lấy mã QR thanh toán
                    </button>
                  </div>
                )}
              </CardBody>
            </Card>
          )}

          <Divider />

          {/* Order Summary */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">
              Tóm tắt đơn hàng
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Tổng tiền hàng:</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí giao hàng:</span>
                <span>{formatPrice(shippingFee)}</span>
              </div>
              <Divider />
              <div className="flex justify-between text-lg font-bold text-orange-600">
                <span>Tổng thanh toán:</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>
          </div>

          <Spacer y={4} />

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <button
              className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setStep(1)}
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Quay lại
            </button>
            <button
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              onClick={handleContinue}
            >
              Tiếp tục
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Step2Payment;
