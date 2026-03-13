// Format price to Vietnamese currency
export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

// Format number with thousand separators
export const formatNumber = (number) => {
  return new Intl.NumberFormat("vi-VN").format(number);
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Calculate total price from cart items
export const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    return total + price * item.quantity;
  }, 0);
}; 