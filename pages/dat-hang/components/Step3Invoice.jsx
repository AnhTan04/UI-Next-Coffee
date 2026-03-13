import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Chip,
    Spacer
} from '@heroui/react';
import {
    DocumentTextIcon,
    UserIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    PencilIcon,
    CheckIcon,
    XMarkIcon,
    ArrowLeftIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/outline';
import MapComponent from '@/components/MapComponent';
import { validateCustomerInfo, getFullAddress } from '@/utils/validation';
import useCartStore from '@/stores/cartStore';
import api from '@/configs/api';

const Step3Invoice = ({ 
    customerInfo = {}, 
    handleInputChange, 
    setCustomerInfo, 
    provinces = [], 
    districts = [], 
    wards = [], 
    setStep, 
    handlePlaceOrder 
}) => {
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { cartItems = [], total = 0 } = useCartStore();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price || 0);
    };

    const handleEditAddress = () => {
        setIsEditingAddress(true);
    };

    const handleSaveAddress = () => {
        const missingFields = validateCustomerInfo(customerInfo);
        if (missingFields.length > 0) {
            alert(`Vui lòng điền đầy đủ và đúng định dạng thông tin địa chỉ: ${missingFields.join(', ')}.`);
            return;
        }
        setIsEditingAddress(false);
    };

    const handleCreateOrder = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert('Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi đặt hàng.');
            return;
        }

        setIsLoading(true);
        try {
            // Format giỏ hàng và lưu vào localStorage để server có thể truy cập
            saveCartToLocalStorage();
            
            // Tạo hoặc lấy session ID
            const sessionId = getOrCreateSessionId();
            
            // Format dữ liệu đơn hàng theo cấu trúc mà server mong đợi
            const orderData = {
                sessionId: sessionId,
                paymentMethod: customerInfo.paymentMethod || 'COD',
                
                invoiceName: customerInfo.name || '',
                invoicePhone: customerInfo.phone || '',
                invoiceEmail: customerInfo.email || '',
                invoiceAddress: getFullAddress(customerInfo),
                
                shippingName: customerInfo.name || '',
                shippingPhone: customerInfo.phone || '',
                shippingAddress: customerInfo.deliveryAddress || getFullAddress(customerInfo),
                shippingNote: customerInfo.note || '',
            };

            console.log('Sending order data:', orderData);
            const response = await api.post('/orders/create', orderData);
            console.log('Order response:', response.data);

            if (response.data && response.data.success) {
                // Save order information for success page
                const orderInfo = {
                    orderId: response.data.orderId || `DH${Date.now().toString().slice(-8)}`,
                    total: total,
                    items: cartItems,
                    createdAt: new Date().toISOString()
                };
                localStorage.setItem('lastOrderInfo', JSON.stringify(orderInfo));
                
                // Clear cart from store
                localStorage.removeItem('cart');
                
                // Redirect to success page
                window.location.href = '/order-success';
            } else {
                alert(response.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert(error.response?.data?.message || 'Đặt hàng thất bại, vui lòng thử lại!');
        } finally {
            setIsLoading(false);
        }
    };

    // Lưu giỏ hàng vào localStorage với format đúng để phía server lấy được
    const saveCartToLocalStorage = () => {
        // Format giỏ hàng theo đúng cấu trúc mà model Cart.js mong đợi
        const formattedCart = cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: parseFloat(item.product?.price || 0),
            productName: item.product?.name || '',
            productImage: item.product?.image || ''
        }));
        
        localStorage.setItem('cart', JSON.stringify(formattedCart));
        return formattedCart;
    };
    
    // Lấy hoặc tạo sessionId
    const getOrCreateSessionId = () => {
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
            localStorage.setItem('sessionId', sessionId);
        }
        return sessionId;
    };

    const isPhoneValid = customerInfo.phone && /^0\d{9,10}$/.test(customerInfo.phone);
    const isEmailValid = customerInfo.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email);

    // Add safety check for handleInputChange
    const safeHandleInputChange = (e) => {
        if (handleInputChange) {
            handleInputChange(e);
        }
    };

    // Add safety check for setCustomerInfo
    const safeSetCustomerInfo = (updater) => {
        if (setCustomerInfo) {
            setCustomerInfo(updater);
        }
    };

    // Add safety check for setStep
    const safeSetStep = (step) => {
        if (setStep) {
            setStep(step);
        }
    };

    return (
        <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 text-white py-6">
                <div className="flex items-center gap-3 w-full">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <DocumentTextIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Thông tin hóa đơn</h2>
                        <p className="text-white/80 text-sm">Điền thông tin để hoàn tất đơn hàng</p>
                    </div>
                </div>
            </CardHeader>
            
            <CardBody className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Customer Information */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <UserIcon className="w-5 h-5 text-green-600" />
                                Thông tin khách hàng
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Họ và tên *
                                    </label>
                                    <div className="relative">
                                        <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder="Nhập họ và tên"
                                            value={customerInfo.name || ''}
                                            onChange={(e) => safeHandleInputChange({ target: { name: 'name', value: e.target.value } })}
                                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Số điện thoại *
                                    </label>
                                    <div className="relative">
                                        <PhoneIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="tel"
                                            placeholder="Nhập số điện thoại"
                                            value={customerInfo.phone || ''}
                                            onChange={(e) => safeHandleInputChange({ target: { name: 'phone', value: e.target.value } })}
                                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 transition-colors ${
                                                customerInfo.phone && !isPhoneValid 
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                                                    : 'border-gray-300 focus:border-green-500 focus:ring-green-200'
                                            }`}
                                        />
                                    </div>
                                    {customerInfo.phone && !isPhoneValid && (
                                        <p className="text-red-500 text-sm mt-1">
                                            Số điện thoại phải bắt đầu bằng 0 và có 10-11 chữ số
                                        </p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <EnvelopeIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                        <input
                                            type="email"
                                            placeholder="Nhập địa chỉ email"
                                            value={customerInfo.email || ''}
                                            onChange={(e) => safeHandleInputChange({ target: { name: 'email', value: e.target.value } })}
                                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 transition-colors ${
                                                customerInfo.email && !isEmailValid 
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                                                    : 'border-gray-300 focus:border-green-500 focus:ring-green-200'
                                            }`}
                                        />
                                    </div>
                                    {customerInfo.email && !isEmailValid && (
                                        <p className="text-red-500 text-sm mt-1">Email không đúng định dạng</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5 text-green-600" />
                                Địa chỉ
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Địa chỉ cụ thể *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Số nhà, tên đường"
                                        value={customerInfo.address || ''}
                                        onChange={(e) => safeHandleInputChange({ target: { name: 'address', value: e.target.value } })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tỉnh/Thành phố *
                                    </label>
                                    <select
                                        value={customerInfo.city || ''}
                                        onChange={(e) => safeHandleInputChange({ target: { name: 'city', value: e.target.value } })}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                    >
                                        <option value="">Chọn tỉnh/thành phố</option>
                                        {provinces.map((province) => (
                                            <option key={province.name} value={province.name}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Quận/Huyện *
                                    </label>
                                    <select
                                        value={customerInfo.district || ''}
                                        onChange={(e) => safeHandleInputChange({ target: { name: 'district', value: e.target.value } })}
                                        disabled={!customerInfo.city}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    >
                                        <option value="">Chọn quận/huyện</option>
                                        {districts.map((district) => (
                                            <option key={district.name} value={district.name}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phường/Xã *
                                    </label>
                                    <select
                                        value={customerInfo.ward || ''}
                                        onChange={(e) => safeHandleInputChange({ target: { name: 'ward', value: e.target.value } })}
                                        disabled={!customerInfo.district}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    >
                                        <option value="">Chọn phường/xã</option>
                                        {wards.map((ward) => (
                                            <option key={ward.name} value={ward.name}>
                                                {ward.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Delivery & Map */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Giao hàng & Ghi chú
                            </h3>
                            
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={customerInfo.address === customerInfo.deliveryAddress || !customerInfo.deliveryAddress}
                                        onChange={(e) => {
                                            safeSetCustomerInfo((prev) => ({
                                                ...prev,
                                                deliveryAddress: e.target.checked ? prev.address : '',
                                            }));
                                        }}
                                        className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                    />
                                    <span className="text-gray-700">Giao hàng đến địa chỉ trong hóa đơn</span>
                                </label>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Ghi chú đơn hàng
                                    </label>
                                    <textarea
                                        placeholder="Nhập ghi chú cho đơn hàng (tùy chọn)"
                                        value={customerInfo.note || ''}
                                        onChange={(e) => safeHandleInputChange({ target: { name: 'note', value: e.target.value } })}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <Divider />

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                Bản đồ địa chỉ
                            </h3>
                            <div className="rounded-lg overflow-hidden border">
                                {typeof window !== 'undefined' && (
                                    <MapComponent
                                        address={customerInfo.address || ''}
                                        city={customerInfo.city || ''}
                                        district={customerInfo.district || ''}
                                        ward={customerInfo.ward || ''}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Spacer y={6} />

                {/* Delivery Address Section */}
                <Card className="bg-gray-50 border">
                    <CardBody className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5 text-green-600" />
                                Địa chỉ giao hàng
                            </h4>
                            {!isEditingAddress && (
                                <button
                                    className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                    onClick={handleEditAddress}
                                >
                                    <PencilIcon className="w-4 h-4" />
                                    Chỉnh sửa
                                </button>
                            )}
                        </div>
                        
                        {!isEditingAddress ? (
                            <div className="bg-white rounded-lg p-3 border">
                                <p className="text-gray-700">
                                    {getFullAddress(customerInfo) || 'Chưa có địa chỉ giao hàng'}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                                        <input
                                            type="text"
                                            value={customerInfo.address || ''}
                                            onChange={(e) => safeHandleInputChange({ target: { name: 'address', value: e.target.value } })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tỉnh/Thành</label>
                                        <select
                                            value={customerInfo.city || ''}
                                            onChange={(e) => safeHandleInputChange({ target: { name: 'city', value: e.target.value } })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
                                        >
                                            <option value="">Chọn tỉnh/thành</option>
                                            {provinces.map((province) => (
                                                <option key={province.name} value={province.name}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Quận/Huyện</label>
                                        <select
                                            value={customerInfo.district || ''}
                                            onChange={(e) => safeHandleInputChange({ target: { name: 'district', value: e.target.value } })}
                                            disabled={!customerInfo.city}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors disabled:bg-gray-100"
                                        >
                                            <option value="">Chọn quận/huyện</option>
                                            {districts.map((district) => (
                                                <option key={district.name} value={district.name}>
                                                    {district.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phường/Xã</label>
                                        <select
                                            value={customerInfo.ward || ''}
                                            onChange={(e) => safeHandleInputChange({ target: { name: 'ward', value: e.target.value } })}
                                            disabled={!customerInfo.district}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors disabled:bg-gray-100"
                                        >
                                            <option value="">Chọn phường/xã</option>
                                            {wards.map((ward) => (
                                                <option key={ward.name} value={ward.name}>
                                                    {ward.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                        onClick={handleSaveAddress}
                                    >
                                        <CheckIcon className="w-4 h-4" />
                                        Lưu địa chỉ
                                    </button>
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        onClick={() => setIsEditingAddress(false)}
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        )}
                    </CardBody>
                </Card>

                <Spacer y={6} />

                {/* Order Summary */}
                <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
                    <CardBody className="p-6">
                        <h4 className="font-bold text-lg text-orange-800 mb-4 flex items-center gap-2">
                            <ShoppingBagIcon className="w-5 h-5" />
                            Tóm tắt đơn hàng
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-700">
                                <span>Số lượng sản phẩm:</span>
                                <Chip color="primary" variant="flat">
                                    {cartItems?.length || 0} sản phẩm
                                </Chip>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Tổng giá trị:</span>
                                <span className="font-semibold">{formatPrice(total)}</span>
                            </div>
                            <Divider />
                            <div className="flex justify-between text-xl font-bold text-orange-600">
                                <span>Tổng thanh toán:</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Spacer y={6} />

                {/* Action Buttons */}
                <div className="flex justify-between items-center gap-4">
                    <button
                        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => safeSetStep(2)}
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        Quay lại
                    </button>
                    <button
                        className={`flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={handleCreateOrder}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Đang xử lý...
                            </>
                        ) : (
                            <>
                                <ShoppingBagIcon className="w-5 h-5" />
                                Đặt hàng
                            </>
                        )}
                    </button>
                </div>
            </CardBody>
        </Card>
    );
};

export default Step3Invoice;