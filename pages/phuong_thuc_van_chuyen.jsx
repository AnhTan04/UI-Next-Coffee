import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layouts/Navbar';
import useCartStore from '../stores/cartStore';

const PhuongThucVanChuyen = () => {
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [shippingMethod, setShippingMethod] = useState('standard'); // Phương thức mặc định
    const [shippingFee, setShippingFee] = useState(10000); // Phí mặc định
    const { cartItems, total } = useCartStore();

    useEffect(() => {
        // Lấy thông tin đơn hàng từ localStorage
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        if (storedOrders.length > 0) {
            const lastOrder = storedOrders[storedOrders.length - 1];
            setOrder({
                ...lastOrder,
                totalPrice: total // Use total from cart store
            });
        } else {
            alert('Không có đơn hàng nào!');
            router.push('/product'); // Quay lại trang sản phẩm nếu không có đơn hàng
        }
    }, [router, total]);

    // Cập nhật phí vận chuyển khi thay đổi phương thức
    useEffect(() => {
        switch (shippingMethod) {
            case 'fast':
                setShippingFee(30000); // Giao hàng nhanh
                break;
            case 'economy':
                setShippingFee(5000); // Giao hàng tiết kiệm
                break;
            default:
                setShippingFee(10000); // Giao hàng tiêu chuẩn
        }
    }, [shippingMethod]);

    const handleConfirmShipping = () => {
        if (!order) return;

        // Cập nhật đơn hàng với phương thức vận chuyển
        const updatedOrder = {
            ...order,
            shippingMethod,
            shippingFee,
            totalPrice: total + shippingFee,
        };

        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        storedOrders[storedOrders.length - 1] = updatedOrder;
        localStorage.setItem('orders', JSON.stringify(storedOrders));

        alert('Phương thức vận chuyển đã được lưu!');
        router.push('/product');
    };

    if (!order) {
        return null; 
    }

    return (
        <>
            <Navbar />
            <div className="bg-[#faf9f7] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#5b3a29] text-center mb-10 uppercase tracking-wide">
                        Chọn Phương Thức Vận Chuyển
                    </h1>
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-[#5b3a29] mb-4">Thông tin đơn hàng</h2>
                        <p><strong>Họ tên:</strong> {order.customerInfo.name}</p>
                        <p><strong>Địa chỉ:</strong> {order.customerInfo.address}, {order.customerInfo.ward}, {order.customerInfo.district}, {order.customerInfo.city}</p>
                        <p><strong>Tổng tiền hàng:</strong> {total.toLocaleString('vi-VN')} VND</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-[#5b3a29] mb-4">Chọn phương thức vận chuyển</h2>
                        <div className="space-y-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value="standard"
                                    checked={shippingMethod === 'standard'}
                                    onChange={(e) => setShippingMethod(e.target.value)}
                                    className="mr-2"
                                />
                                Giao hàng tiêu chuẩn (10,000 VND)
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value="fast"
                                    checked={shippingMethod === 'fast'}
                                    onChange={(e) => setShippingMethod(e.target.value)}
                                    className="mr-2"
                                />
                                Giao hàng nhanh (30,000 VND)
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value="economy"
                                    checked={shippingMethod === 'economy'}
                                    onChange={(e) => setShippingMethod(e.target.value)}
                                    className="mr-2"
                                />
                                Giao hàng tiết kiệm (5,000 VND)
                            </label>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-[#5b3a29] mb-4">Tổng thanh toán</h2>
                        <p><strong>Phí vận chuyển:</strong> {shippingFee.toLocaleString('vi-VN')} VND</p>
                        <p><strong>Tổng cộng:</strong> {(total + shippingFee).toLocaleString('vi-VN')} VND</p>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={handleConfirmShipping}
                            className="bg-[#5b3a29] hover:bg-[#3f271a] text-white py-2 px-6 rounded-full"
                        >
                            Xác nhận phương thức vận chuyển
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhuongThucVanChuyen;