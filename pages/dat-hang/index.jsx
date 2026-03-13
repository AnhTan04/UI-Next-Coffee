'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layouts/Navbar';
import axios from 'axios';
import useCartStore from '@/stores/cartStore';

// Components
import Step1Cart from './components/Step1Cart';
import Step2Payment from './components/Step2Payment';
import Step3Invoice from './components/Step3Invoice';

// Utils
import { validateCustomerInfo } from '@/utils/validation';

const DatHang = () => {
    const { cartItems, total, fetchCartItems, clearCart } = useCartStore();
    const [step, setStep] = useState(1);
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        note: '',
        deliveryAddress: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [paymentDetails, setPaymentDetails] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);
    const router = useRouter();

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        fetchCartItems();

        const storedInfo = JSON.parse(localStorage.getItem('customerInfo')) || {};
        setCustomerInfo((prev) => ({
            ...prev,
            ...storedInfo,
        }));

        const storedPaymentDetails = JSON.parse(localStorage.getItem('paymentDetails'));
        if (storedPaymentDetails) {
            setPaymentDetails(storedPaymentDetails);
            setPaymentMethod('ATM');
        }
    }, []);

    useEffect(() => {
        if (router.query.returnToStep === '2') {
            setStep(2);
        }
    }, [router.query]);

    useEffect(() => {
        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
    }, [customerInfo]);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://provinces.open-api.vn/api/p/');
                setProvinces(response.data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (customerInfo.city) {
                try {
                    const selectedProvince = provinces.find((prov) => prov.name === customerInfo.city);
                    if (selectedProvince) {
                        const response = await axios.get(`https://provinces.open-api.vn/api/p/${selectedProvince.code}?depth=2`);
                        setDistricts(response.data.districts);
                        if (!districts.find((dist) => dist.name === customerInfo.district)) {
                            setCustomerInfo((prev) => ({ ...prev, district: '', ward: '' }));
                            setWards([]);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching districts:', error);
                }
            } else {
                setDistricts([]);
                setWards([]);
                setCustomerInfo((prev) => ({ ...prev, district: '', ward: '' }));
            }
        };
        fetchDistricts();
    }, [customerInfo.city, provinces]);

    useEffect(() => {
        const fetchWards = async () => {
            if (customerInfo.district) {
                try {
                    const selectedDistrict = districts.find((dist) => dist.name === customerInfo.district);
                    if (selectedDistrict) {
                        const response = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`);
                        setWards(response.data.wards);
                        if (!wards.find((ward) => ward.name === customerInfo.ward)) {
                            setCustomerInfo((prev) => ({ ...prev, ward: '' }));
                        }
                    }
                } catch (error) {
                    console.error('Error fetching wards:', error);
                }
            } else {
                setWards([]);
                setCustomerInfo((prev) => ({ ...prev, ward: '' }));
            }
        };
        fetchWards();
    }, [customerInfo.district, districts]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDeleteImage = () => {
        setPaymentDetails(null);
        localStorage.removeItem('paymentDetails');
        setShowOrderDetails(false);
    };

    const handlePlaceOrder = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert('Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi đặt hàng.');
            router.push('/product');
            return;
        }

        const missingFields = validateCustomerInfo(customerInfo);
        if (missingFields.length > 0) {
            alert(`Vui lòng điền đầy đủ và đúng định dạng thông tin hóa đơn: ${missingFields.join(', ')}.`);
            return;
        }

        if (paymentMethod === 'ATM' && !paymentDetails) {
            alert('Vui lòng xác nhận thanh toán bằng QR trước khi đặt hàng!');
            return;
        }

        const newOrder = {
            customerInfo,
            cart: cartItems,
            totalPrice: total + 10000, // Shipping fee
            paymentMethod,
            paymentDetails,
        };

        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        storedOrders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(storedOrders));

        // Clear cart from store instead of localStorage
        await clearCart();
        localStorage.removeItem('customerInfo');
        localStorage.removeItem('paymentDetails');

        setCustomerInfo({
            name: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            district: '',
            ward: '',
            note: '',
            deliveryAddress: '',
        });
        setPaymentDetails(null);

        alert('Đặt hàng thành công!');
        router.push('/phuong_thuc_van_chuyen');
    };

    return (
        <>
            <Navbar />
            <div className="bg-[#faf9f7] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#5b3a29] text-center mb-10 uppercase tracking-wide">
                        Đặt Hàng
                    </h1>

                    {(!cartItems || cartItems.length === 0) ? (
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <p className="text-center text-lg text-red-600 font-semibold mb-4">
                                Giỏ hàng của bạn đang trống
                            </p>
                            <div className="text-center">
                                <a
                                    href="/product"
                                    className="inline-block bg-[#5b3a29] text-white px-6 py-2 rounded-full hover:bg-[#3f271a] transition duration-300"
                                >
                                    Tiếp tục mua sắm
                                </a>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-6">
                                <div className={`text-[#5b3a29] font-bold ${step === 1 ? 'underline' : ''}`}>
                                    1. GIỎ HÀNG
                                </div>
                                <div className={`text-[#5b3a29] font-bold ${step === 2 ? 'underline' : ''}`}>
                                    2. THANH TOÁN
                                </div>
                                <div className={`text-[#5b3a29] font-bold ${step === 3 ? 'underline' : ''}`}>
                                    3. HÓA ĐƠN - GIAO HÀNG
                                </div>
                            </div>

                            {step === 1 && <Step1Cart cart={cartItems} setStep={setStep} />}

                            {step === 2 && (
                                <Step2Payment
                                    paymentMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                    paymentDetails={paymentDetails}
                                    setPaymentDetails={setPaymentDetails}
                                    showOrderDetails={showOrderDetails}
                                    setShowOrderDetails={setShowOrderDetails}
                                    handleDeleteImage={handleDeleteImage}
                                    setStep={setStep}
                                    cart={cartItems}
                                    customerInfo={customerInfo}
                                />
                            )}

                            {step === 3 && (
                                <Step3Invoice
                                    customerInfo={customerInfo}
                                    handleInputChange={handleInputChange}
                                    setCustomerInfo={setCustomerInfo}
                                    provinces={provinces}
                                    districts={districts}
                                    wards={wards}
                                    setStep={setStep}
                                    cart={cartItems}
                                    handlePlaceOrder={handlePlaceOrder}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default DatHang; 