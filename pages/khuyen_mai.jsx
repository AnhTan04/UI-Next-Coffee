import React from 'react';
import Navbar from '../components/layouts/Navbar';

const KhuyenMai = () => {
    const promotionalProducts = [
        {
            id: 10,
            name: 'Cà phê Arabica Đặc Biệt',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnoI3U2805WCWjds0maRFK6HzNjSCnr5KWw&s',
            originalPrice: '250,000 VND',
            discountedPrice: '200,000 VND',
            description: 'Cà phê Arabica chất lượng cao từ vùng Đà Lạt.',
        },
        {
            id: 11,
            name: 'Cà phê Robusta Hảo Hạng',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnoI3U2805WCWjds0maRFK6HzNjSCnr5KWw&s',
            originalPrice: '200,000 VND',
            discountedPrice: '170,000 VND',
            description: 'Cà phê Robusta đậm đà từ vùng Buôn Ma Thuột.',
        },
        {
            id: 12,
            name: 'Combo 3 túi',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnoI3U2805WCWjds0maRFK6HzNjSCnr5KWw&s',
            originalPrice: '320,000 VND',
            discountedPrice: '270,000 VND',
            description: 'Combo cà phê hạt rang dành cho doanh nghiệp.',
        },
        {
            id: 13,
            name: 'Combo Culi & Cherry',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnoI3U2805WCWjds0maRFK6HzNjSCnr5KWw&s',
            originalPrice: '340,000 VND',
            discountedPrice: '300,000 VND',
            description: 'Cà phê Arabica chất lượng cao từ vùng Đà Lạt.',
        },
    ];

    // Thêm hàm formatPrice để định dạng tiền tệ
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    // Hàm chuyển đổi chuỗi giá tiền sang số
    const parsePrice = (priceString) => {
        return parseFloat(priceString.replace(/[^\d]/g, ''));
    };

    const handleAddToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProductIndex = storedCart.findIndex(item => item.id === product.id);

        if (existingProductIndex !== -1) {
            storedCart[existingProductIndex].quantity += 1;
        } else {
            storedCart.push({
                ...product,
                price: parsePrice(product.discountedPrice), // Chuyển đổi giá từ chuỗi sang số
                quantity: 1,
            });
        }

        localStorage.setItem('cart', JSON.stringify(storedCart));
        alert(`${product.name} đã được thêm vào giỏ hàng!`);
    };

    return (
        <>
            <Navbar />
            <div className="bg-[#faf9f7] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#5b3a29] text-center mb-10 uppercase tracking-wide">
                        Khuyến Mãi
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promotionalProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white shadow-md rounded-lg overflow-hidden"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-bold text-[#5b3a29] mb-2">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-500 line-through">
                                        Giá gốc: {formatPrice(parsePrice(product.originalPrice))}
                                    </p>
                                    <p className="text-[#c0392b] font-bold">
                                        Giá khuyến mãi: {formatPrice(parsePrice(product.discountedPrice))}
                                    </p>
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="bg-[#5b3a29] hover:bg-[#3f271a] text-white py-2 px-4 rounded-full transition duration-300"
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default KhuyenMai;