import { useState, useEffect } from "react";
import Link from "next/link";
import navbar from "@/configs/navbar";
import useCartStore from "@/stores/cartStore";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  
  const { cartItems, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#5b3a29] text-white shadow-md z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold ">Roastory Coffee</div>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navbar.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`hover:text-gray-300 transition-colors duration-200 ${
                  activeItem === item.href ? "text-gray-300" : "text-white"
                }`}
                onClick={() => setActiveItem(item.href)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Cart Icon with Badge */}
            <Link
              href="/gio-hang"
              className="relative hover:text-gray-300 transition-colors duration-200 p-2"
              onClick={() => setActiveItem("/gio-hang")}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
                />
              </svg>
              
              {/* Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] animate-pulse">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-6 bg-[#5b3a29] fixed inset-0 z-50 flex flex-col items-center justify-center">
            {navbar.map((item, index) => (
              <Link 
                key={index}
                href={item.href} 
                className="hover:text-gray-300 mb-4" 
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Cart Link with Badge */}
            <Link href="/gio_hang" className="hover:text-gray-300 mb-4 relative flex items-center gap-2" onClick={toggleMenu}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
                />
              </svg>
              Giỏ Hàng
              {totalItems > 0 && (
                <span className="bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleDarkMode}
              className="w-16 h-8 rounded-full bg-gray-200 flex items-center transition duration-300 focus:outline-none shadow mt-8"
            >
              <div
                className={`w-8 h-8 rounded-full transform transition-transform duration-300 flex items-center justify-center ${
                  darkMode ? "translate-x-8 bg-white" : "bg-white"
                }`}
              >
                {darkMode ? "🌙" : "☀️"}
              </div>
            </button>
            <button
              onClick={toggleMenu}
              className="absolute bottom-10 text-gray-300 focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
