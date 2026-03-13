import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  Card,
  CardBody,
  Image,
  Chip,
  Divider,
  Spinner,
  Button,
  Tabs,
  Tab,
} from "@heroui/react";
import Navbar from "@/components/layouts/Navbar";
import useProductStore from "../../stores/productStore";
import useCartStore from "../../stores/cartStore";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    selectedProduct,
    productImages,
    products,
    stockInfo,
    loading,
    error,
    fetchProductById,
    fetchProducts,
    clearError,
    parseProductSpecifications,
    parseProductFeatures,
    getProductTags,
    formatProductPrice,
    getFormattedPrice,
  } = useProductStore();

  const { addToCart } = useCartStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState("description");

  useEffect(() => {
    if (id) {
      fetchProductById(id);
      fetchProducts(1, null, 8); // Fetch related products
    }
  }, [id, fetchProductById, fetchProducts]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <Spinner size="lg" color="warning" className="mb-4" />
            <p className="text-gray-600">Đang tải sản phẩm...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !selectedProduct) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {error || "Không tìm thấy sản phẩm"}
            </h2>
            <Button
              color="warning"
              variant="solid"
              onPress={() => router.push("/san-pham")}
            >
              Quay lại danh sách sản phẩm
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    try {
      await addToCart(selectedProduct.id, quantity);
      toast.success(`Đã thêm ${selectedProduct.name} vào giỏ hàng!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };

  const handleIncreaseQuantity = () => {
    const currentStock = stockInfo?.stock || selectedProduct.stock;
    if (currentStock && quantity < currentStock) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.warning("Số lượng vượt quá tồn kho");
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Use product images from API or fallback to main image
  const displayImages =
    productImages && productImages.length > 0
      ? productImages
      : selectedProduct.image
      ? [{ imageUrl: selectedProduct.image, altText: selectedProduct.name }]
      : [];

  const currentImage = displayImages[selectedImageIndex];
  const specifications = parseProductSpecifications(selectedProduct);
  const features = parseProductFeatures(selectedProduct);

  // Get related products (exclude current product)
  const relatedProducts = products.filter(p => p.id !== selectedProduct.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button
              onClick={() => router.push("/")}
              className="hover:text-orange-600 transition-colors"
            >
              Trang chủ
            </button>
            <span>/</span>
            <span className="text-orange-600 font-medium">
              {selectedProduct.name}
            </span>
          </div>
        </nav>

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column - Product Info */}
          <div className="col-span-12 lg:col-span-4">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6 uppercase">
                  {selectedProduct.name}
                </h1>

                {/* Product Details */}
                <div className="space-y-4 text-sm">
                  <div className="flex items-start">
                    <span className="text-gray-600 min-w-[100px] flex-shrink-0">● Mã sản phẩm:</span>
                    <span className="font-medium">{selectedProduct.sku || selectedProduct.id}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-600 min-w-[100px] flex-shrink-0">● Nhà sản xuất:</span>
                    <span className="font-medium">{selectedProduct.brand || "Trung Nguyên"}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-600 min-w-[100px] flex-shrink-0">● Đặc tính:</span>
                    <div className="flex-1">
                      <p>{selectedProduct.description}</p>
                      <p className="mt-1">Ít đắng và mùi thơm rất đặc trưng.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-600 min-w-[100px] flex-shrink-0">● Hạn sử dụng:</span>
                    <span className="font-medium">12 tháng</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-red-600">
                    {getFormattedPrice(selectedProduct)} đ
                  </span>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium">Chọn số lượng</span>
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={handleDecreaseQuantity}
                      disabled={quantity <= 1}
                      className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-bold"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 px-2 py-2 text-center border-x border-gray-300 focus:outline-none"
                      min="1"
                    />
                    <button
                      onClick={handleIncreaseQuantity}
                      className="px-3 py-2 hover:bg-gray-100 text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={(stockInfo?.stock || selectedProduct.stock) === 0}
                  className="w-full bg-black text-white py-3 px-6 rounded font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>

          {/* Center Column - Product Image */}
          <div className="col-span-12 lg:col-span-4">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                {currentImage ? (
                  <img
                    src={currentImage.imageUrl}
                    alt={currentImage.altText || selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span>Không có hình ảnh</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {displayImages.length > 1 && (
                <div className="flex space-x-2 justify-center">
                  {displayImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded border-2 overflow-hidden ${
                        index === selectedImageIndex
                          ? "border-orange-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={image.imageUrl}
                        alt={`${selectedProduct.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Related Products */}
          <div className="col-span-12 lg:col-span-4">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 uppercase">
                Sản phẩm liên quan
              </h3>

              <div className="space-y-4">
                {relatedProducts.map((product) => {
                  const productPrice = formatProductPrice(product);

                  return (
                    <div key={product.id} className="relative flex space-x-3 p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                         onClick={() => router.push(`/chi-tiet/${product.id}`)}>
                      
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={product.image || '/images/placeholder-product.jpg'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                          {product.name}
                        </h4>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-red-600">
                            {Math.round(productPrice).toLocaleString('vi-VN')} đ
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            color="warning"
            variant="underlined"
            classNames={{
              tabList: "gap-8 w-full relative rounded-none p-0 border-b border-gray-200",
              cursor: "w-full bg-orange-500",
              tab: "max-w-fit px-0 h-12",
              tabContent: "group-data-[selected=true]:text-orange-600",
            }}
          >
            <Tab key="description" title="Mô tả sản phẩm">
              <div className="py-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                  {features.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Đặc điểm nổi bật:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {features.map((feature, index) => (
                          <li key={index} className="text-gray-700">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedProduct.tags && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.tags.split(',').map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Tab>

            <Tab key="specifications" title="Chi tiết">
              <div className="py-6">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Thương hiệu:</span>
                    <span className="text-gray-900">{selectedProduct.brand || "Trung Nguyên"}</span>
                  </div>
                  {selectedProduct.model && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Model:</span>
                      <span className="text-gray-900">{selectedProduct.model}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">SKU:</span>
                    <span className="text-gray-900">{selectedProduct.sku}</span>
                  </div>
                  {selectedProduct.weight && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Trọng lượng:</span>
                      <span className="text-gray-900">{selectedProduct.weight}kg</span>
                    </div>
                  )}
                  {selectedProduct.dimensions && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Kích thước:</span>
                      <span className="text-gray-900">{selectedProduct.dimensions}</span>
                    </div>
                  )}
                  {selectedProduct.color && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Màu sắc:</span>
                      <span className="text-gray-900">{selectedProduct.color}</span>
                    </div>
                  )}
                  {selectedProduct.material && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Chất liệu:</span>
                      <span className="text-gray-900">{selectedProduct.material}</span>
                    </div>
                  )}
                  {selectedProduct.warranty && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Bảo hành:</span>
                      <span className="text-gray-900">{selectedProduct.warranty}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Tồn kho:</span>
                    <span className="text-gray-900">{selectedProduct.stock} sản phẩm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Xuất xứ:</span>
                    <span className="text-gray-900">Việt Nam</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Hạn sử dụng:</span>
                    <span className="text-gray-900">12 tháng</span>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
