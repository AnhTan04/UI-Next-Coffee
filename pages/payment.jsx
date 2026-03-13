import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Image,
    Chip,
    Divider,
    Spacer
} from '@heroui/react';
import {
    QrCodeIcon,
    PhotoIcon,
    CheckCircleIcon,
    ArrowLeftIcon,
    CreditCardIcon
} from '@heroicons/react/24/outline';

const Payment = () => {
    const router = useRouter();
    const { amount } = router.query;

    const [selectedImage, setSelectedImage] = useState(null);
    const [cartItems, setCartItems] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('QR');
    const [orderInfo, setOrderInfo] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    useEffect(() => {
        // Load all information when component mounts
        const savedCartItems = localStorage.getItem('cartItems');
        const savedOrderInfo = localStorage.getItem('orderInfo');
        const savedCustomerInfo = localStorage.getItem('customerInfo');
        const savedShippingInfo = localStorage.getItem('shippingInfo');
        const savedPaymentMethod = localStorage.getItem('paymentMethod');

        if (savedCartItems) setCartItems(JSON.parse(savedCartItems));
        if (savedOrderInfo) setOrderInfo(JSON.parse(savedOrderInfo));
        if (savedCustomerInfo) setCustomerInfo(JSON.parse(savedCustomerInfo));
        if (savedShippingInfo) setShippingInfo(JSON.parse(savedShippingInfo));
        if (savedPaymentMethod) setPaymentMethod(savedPaymentMethod);
    }, []);

    const saveAllInformation = () => {
        // Helper function to save all information
        if (cartItems) localStorage.setItem('cartItems', JSON.stringify(cartItems));
        if (orderInfo) localStorage.setItem('orderInfo', JSON.stringify(orderInfo));
        if (customerInfo) localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
        if (shippingInfo) localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
        localStorage.setItem('paymentMethod', 'QR');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConfirmPayment = () => {
        if (!selectedImage) {
            alert('Vui lòng tải ảnh xác nhận chuyển khoản.');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const imageData = reader.result;

            // Save payment details
            const paymentDetails = {
                amount,
                image: imageData,
                cartItems,
                orderInfo,
                customerInfo,
                shippingInfo,
                paymentMethod: 'QR',
            };

            localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
            saveAllInformation();

            // Redirect to step 2 of DatHang
            router.push('/dat-hang?returnToStep=2');
        };
        reader.readAsDataURL(selectedImage);
    };

    const handleReturn = () => {
        // Save all information before returning
        saveAllInformation();
        // Redirect to step 2 of DatHang
        router.push('/dat-hang?returnToStep=2');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <Card className="shadow-2xl border-0">
                    <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 text-white py-8">
                        <div className="flex items-center gap-4 w-full">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <QrCodeIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Thanh toán QR Code</h1>
                                <p className="text-white/80 text-sm">Quét mã QR và tải ảnh xác nhận</p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody className="p-8">
                        <div className="space-y-8">
                            {/* Payment Amount */}
                            <div className="text-center">
                                <p className="text-gray-600 mb-2">Số tiền cần thanh toán:</p>
                                <Chip 
                                    size="lg" 
                                    color="warning" 
                                    variant="flat"
                                    className="text-xl font-bold px-6 py-2"
                                >
                                    {amount ? formatPrice(parseInt(amount)) : formatPrice(0)}
                                </Chip>
                            </div>

                            <Divider />

                            {/* QR Code Section */}
                            <div className="text-center space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center justify-center gap-2">
                                    <QrCodeIcon className="w-5 h-5 text-blue-600" />
                                    Quét mã QR để thanh toán
                                </h3>
                                
                                <div className="flex justify-center">
                                    <div className="p-4 bg-white border-2 border-dashed border-blue-300 rounded-xl">
                                        <Image
                                            src={`https://api.qrserver.com/v1/create-qr-code/?data=ThanhToanMomo&size=200x200`}
                                            alt="QR Code thanh toán"
                                            width={200}
                                            height={200}
                                            className="rounded-lg"
                                        />
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-500">
                                    Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã QR
                                </p>
                            </div>

                            <Divider />

                            {/* Upload Section */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                    <PhotoIcon className="w-5 h-5 text-green-600" />
                                    Tải ảnh xác nhận chuyển khoản
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <PhotoIcon className="w-8 h-8 mb-2 text-gray-400" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Nhấn để tải ảnh</span> hoặc kéo thả
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG hoặc JPEG</p>
                                            </div>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                onChange={handleImageChange}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>

                                    {/* Image Preview */}
                                    {imagePreview && (
                                        <Card className="bg-green-50 border border-green-200">
                                            <CardBody className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <p className="text-green-800 font-medium">Ảnh đã được tải lên</p>
                                                        <p className="text-green-600 text-sm">Xem trước ảnh xác nhận thanh toán</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex justify-center">
                                                    <Image
                                                        src={imagePreview}
                                                        alt="Xem trước ảnh xác nhận"
                                                        width={200}
                                                        height={200}
                                                        className="object-cover rounded-lg border"
                                                    />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    )}
                                </div>
                            </div>

                            <Spacer y={4} />

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button
                                    variant="bordered"
                                    color="default"
                                    size="lg"
                                    startContent={<ArrowLeftIcon className="w-5 h-5" />}
                                    onClick={handleReturn}
                                    className="flex-1"
                                >
                                    Trở về
                                </Button>
                                <Button
                                    color="success"
                                    variant="solid"
                                    size="lg"
                                    startContent={<CreditCardIcon className="w-5 h-5" />}
                                    onClick={handleConfirmPayment}
                                    className="flex-1"
                                    disabled={!selectedImage}
                                >
                                    Xác nhận thanh toán
                                </Button>
                            </div>

                            {/* Help Text */}
                            <Card className="bg-blue-50 border border-blue-200">
                                <CardBody className="p-4">
                                    <h4 className="font-semibold text-blue-800 mb-2">Hướng dẫn thanh toán:</h4>
                                    <ul className="text-sm text-blue-700 space-y-1">
                                        <li>1. Quét mã QR bằng ứng dụng ngân hàng</li>
                                        <li>2. Thực hiện chuyển khoản với số tiền chính xác</li>
                                        <li>3. Chụp ảnh màn hình xác nhận giao dịch</li>
                                        <li>4. Tải ảnh lên và xác nhận thanh toán</li>
                                    </ul>
                                </CardBody>
                            </Card>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Payment;