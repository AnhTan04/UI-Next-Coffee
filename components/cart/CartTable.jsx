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
  Chip
} from '@heroui/react';
import useCart from '@/hooks/useCart';
import QuantityControls from './QuantityControls';
import RemoveButton from './RemoveButton';

const CartTable = () => {
  const { 
    cartItems, 
    formatPrice 
  } = useCart();

  const columns = [
    { key: "product", label: "SẢN PHẨM", width: "40%" },
    { key: "price", label: "ĐƠN GIÁ", width: "15%" },
    { key: "quantity", label: "SỐ LƯỢNG", width: "20%" },
    { key: "total", label: "THÀNH TIỀN", width: "15%" },
    { key: "actions", label: "THAO TÁC", width: "10%" }
  ];

  const renderCell = (item, columnKey) => {
    console.log('🔍 CartTable renderCell:', { item, columnKey });
    
    const productName = item.product?.name || "Sản phẩm không xác định";
    const productImage = item.product?.image || "/default-coffee.svg";
    const productPrice = parseFloat(item.product?.price || 0);
    const quantity = item.quantity || 1;

    console.log('🔍 Extracted data:', { productName, productImage, productPrice, quantity });

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
                fallbackSrc="/default-coffee.svg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base line-clamp-2 mb-2">
                {productName}
              </h3>
              <div className="flex items-center gap-2">
                <Chip 
                  size="sm" 
                  variant="bordered" 
                  color="warning"
                  className="text-xs font-medium"
                >
                  #{item.productId}
                </Chip>
                <Chip 
                  size="sm" 
                  variant="flat" 
                  color="success"
                  className="text-xs"
                >
                  Còn hàng
                </Chip>
              </div>
            </div>
          </div>
        );
      case "price":
        return (
          <div className="text-center">
            <span className="font-bold text-lg text-amber-700 block">
              {formatPrice(productPrice)}
            </span>
            <span className="text-xs text-gray-500">/ sản phẩm</span>
          </div>
        );
      case "quantity":
        return (
          <div className="flex justify-center">
            <QuantityControls
              quantity={quantity}
              productId={item.productId}
            />
          </div>
        );
      case "total":
        return (
          <div className="text-center">
            <span className="font-bold text-xl text-orange-600 block">
              {formatPrice(productPrice * quantity)}
            </span>
            <span className="text-xs text-gray-500">tổng cộng</span>
          </div>
        );
      case "actions":
        return (
          <div className="flex justify-center">
            <RemoveButton productId={item.productId} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-2xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white py-6">
        <div className="flex items-center gap-3 w-full">
          <div className="p-2 bg-white/20 rounded-lg">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">Chi Tiết Đơn Hàng</h2>
            <p className="text-white/80 text-sm">Xem lại và chỉnh sửa sản phẩm</p>
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
          <TableBody 
            items={cartItems || []}
            emptyContent={
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">Không có sản phẩm nào trong giỏ hàng</p>
              </div>
            }
          >
            {(item) => (
              <TableRow 
                key={item.productId} 
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
      </CardBody>
    </Card>
  );
};

export default CartTable; 