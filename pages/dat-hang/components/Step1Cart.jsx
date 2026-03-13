import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
  Chip,
  Divider
} from '@heroui/react';
import { ShoppingCartIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import useCartStore from '@/stores/cartStore';

const Step1Cart = ({ setStep }) => {
    const { cartItems, total } = useCartStore();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const columns = [
        { key: "product", label: "SẢN PHẨM", width: "40%" },
        { key: "price", label: "ĐƠN GIÁ", width: "20%" },
        { key: "quantity", label: "SỐ LƯỢNG", width: "15%" },
        { key: "total", label: "THÀNH TIỀN", width: "25%" }
    ];

    const renderCell = (item, columnKey) => {
        const productName = item.product?.name || 'Sản phẩm không xác định';
        const productImage = item.product?.image || '/placeholder-image.jpg';
        const productPrice = parseFloat(item.product?.price || 0);
        const quantity = item.quantity || 1;

        switch (columnKey) {
            case "product":
                return (
                    <div className="flex items-center gap-4 py-2">
                        <div className="relative">
                            <Image
                                src={productImage}
                                alt={productName}
                                width={80}
                                height={80}
                                className="object-cover rounded-xl shadow-md"
                                fallbackSrc="/placeholder-image.jpg"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-base line-clamp-2 mb-2">
                                {productName}
                            </h3>
                            <Chip 
                                size="sm" 
                                variant="bordered" 
                                color="warning"
                                className="text-xs font-medium"
                            >
                                Mã: P{item.productId}
                            </Chip>
                        </div>
                    </div>
                );
            case "price":
                return (
                    <div className="text-center">
                        <span className="font-bold text-lg text-amber-700">
                            {formatPrice(productPrice)}
                        </span>
                    </div>
                );
            case "quantity":
                return (
                    <div className="text-center">
                        <Chip 
                            size="lg" 
                            variant="flat" 
                            color="primary"
                            className="font-bold"
                        >
                            {quantity}
                        </Chip>
                    </div>
                );
            case "total":
                return (
                    <div className="text-center">
                        <span className="font-bold text-xl text-orange-600">
                            {formatPrice(productPrice * quantity)}
                        </span>
                    </div>
                );
            default:
                return null;
        }
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <Card className="shadow-lg">
                <CardBody className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <ShoppingCartIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Giỏ hàng của bạn đang trống
                    </h3>
                    <p className="text-gray-500 mb-6">
                        Hãy thêm sản phẩm vào giỏ hàng để tiếp tục đặt hàng
                    </p>
                    <a
                        href="/san-pham"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium text-lg"
                    >
                        <ShoppingCartIcon className="w-5 h-5" />
                        Tiếp tục mua sắm
                    </a>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white py-6">
                <div className="flex items-center gap-3 w-full">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <ShoppingCartIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Xác nhận đơn hàng</h2>
                        <p className="text-white/80 text-sm">Kiểm tra lại sản phẩm trước khi đặt hàng</p>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="p-0">
                <Table 
                    aria-label="Cart items table"
                    removeWrapper
                    className="min-h-[400px]"
                    classNames={{
                        th: "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900 font-bold text-sm py-4",
                        td: "py-4 border-b border-gray-100",
                        tbody: "divide-y divide-gray-100"
                    }}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn 
                                key={column.key}
                                width={column.width}
                                className="text-center"
                            >
                                {column.label}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={cartItems}>
                        {(item) => (
                            <TableRow 
                                key={item.id} 
                                className="hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-200"
                            >
                                {(columnKey) => (
                                    <TableCell className="align-top">
                                        {renderCell(item, columnKey)}
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100">
                    <Divider className="mb-4" />
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-lg font-semibold text-gray-700">
                            Tổng cộng:
                        </span>
                        <span className="text-2xl font-bold text-orange-600">
                            {formatPrice(total)}
                        </span>
                    </div>
                    
                    <div className="flex justify-between items-center gap-4">
                        <a
                            href="/gio-hang"
                            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-medium text-lg"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                            Về giỏ hàng
                        </a>
                        <button
                            onClick={() => setStep(2)}
                            disabled={cartItems.length === 0}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-lg"
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

export default Step1Cart; 