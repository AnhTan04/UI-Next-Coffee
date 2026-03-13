import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Badge,
  Image,
  Divider,
} from "@heroui/react";

const ProductCard = ({ product, onAddToCart, addingToCart, formatPrice }) => {
  const isOutOfStock = product.stock === 0;
  const isInactive = !product.isActive;
  const isLoading = addingToCart === product.id;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const cannotPurchase = isOutOfStock || isInactive;

  const getStockBadge = () => {
    if (isInactive) return { color: "danger", text: "Ngừng bán", variant: "solid" };
    if (isOutOfStock) return { color: "danger", text: "Hết hàng", variant: "solid" };
    if (isLowStock) return { color: "warning", text: "Sắp hết", variant: "flat" };
    return { color: "success", text: "Còn hàng", variant: "flat" };
  };

  const stockBadge = getStockBadge();

  // Get main image URL
  const getMainImageUrl = () => {
    if (product.images && product.images.length > 0) {
      const mainImage = product.images.find(img => img.isMain);
      return mainImage ? mainImage.imageUrl : product.images[0].imageUrl;
    }
    return product.image || "/images/default-coffee.jpg";
  };

  // Get product tags
  const getTags = () => {
    if (product.tags) {
      return product.tags.split(',').map(tag => tag.trim()).slice(0, 2);
    }
    return [];
  };

  const tags = getTags();

  return (
    <Card className="group relative flex flex-col h-full rounded-2xl border border-default-200 shadow-md transition hover:shadow-xl overflow-hidden">
      {/* Header / Image */}
      <CardHeader className="relative p-0 h-56 overflow-hidden">
        <img
          src={getMainImageUrl()}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          radius="none"
        />
        <div className="absolute top-3 right-3">
          <Badge {...stockBadge} size="sm" />
        </div>
        {product.brand && (
          <div className="absolute top-3 left-3">
            <Chip size="sm" color="primary" variant="flat" className="font-medium shadow-md">
              {product.brand}
            </Chip>
          </div>
        )}
      </CardHeader>

      {/* Body */}
      <CardBody className="flex flex-col gap-2 px-4 py-3 flex-1">
        <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
          {product.name}
        </h3>

        {product.sku && (
          <p className="text-xs text-default-500">SKU: {product.sku}</p>
        )}

        <div className="flex justify-between items-center">
          <div>
            <div className="text-xl text-primary font-bold">
              {product.price ? formatPrice(product.price) : 'Liên hệ'}
            </div>
          </div>
          <Chip size="sm" color="default" variant="flat">
            SL: {product.stock || 0}
          </Chip>
        </div>

        {product.description && (
          <p className="text-sm text-default-600 line-clamp-3 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                size="sm"
                color="warning"
                variant="flat"
                className="text-xs"
              >
                {tag}
              </Chip>
            ))}
          </div>
        )}

        {/* Additional product info */}
        <div className="flex flex-wrap gap-2 text-xs text-default-500 mt-2">
          {product.weight && (
            <span>Trọng lượng: {product.weight}kg</span>
          )}
          {product.color && (
            <span>Màu: {product.color}</span>
          )}
        </div>
      </CardBody>

      <Divider />

      {/* Footer */}
      <CardFooter className="flex flex-col gap-2 p-4">
        {/* Primary Add to Cart Button - Tailwind */}
        <button
          onClick={() => onAddToCart(product)}
          disabled={cannotPurchase}
          className={`
            w-full h-11 px-4 py-2.5 rounded-xl font-semibold text-sm
            flex items-center justify-center gap-2
            transition-all duration-300 transform
            ${cannotPurchase 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-200' 
              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] border border-amber-500'
            }
            ${isLoading ? 'animate-pulse' : ''}
          `}
        >
          {isLoading && (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {!isLoading && !cannotPurchase && (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13l-1.5 6h9M17 21v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
              />
            </svg>
          )}
          {isLoading ? "Đang thêm..." : cannotPurchase ? "Không thể mua" : "Thêm vào giỏ hàng"}
        </button>

        {/* Secondary Detail Button - Tailwind */}
        <Link
          href={`/chi-tiet/${product.id}`}
          className="
            w-full h-10 px-4 py-2 rounded-xl font-medium text-sm
            flex items-center justify-center gap-2
            border border-amber-200 text-amber-700 bg-amber-50
            hover:border-amber-300 hover:text-amber-800 hover:bg-amber-100
            transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99]
            focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50
          "
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Xem chi tiết
        </Link>
      </CardFooter>

      {/* Hết hàng/Ngừng bán Overlay */}
      {cannotPurchase && (
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-10">
          <Chip size="lg" color="danger" variant="solid" className="px-6 py-3 text-lg font-bold">
            {isInactive ? "NGỪNG BÁN" : "HẾT HÀNG"}
          </Chip>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;