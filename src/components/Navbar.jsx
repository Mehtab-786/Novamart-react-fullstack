import { NavLink } from "react-router";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Brand name */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              NovaMart
            </NavLink>
          </div>

          {/* Right side - Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-base font-medium transition-colors duration-200 relative ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  {isActive && (
                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-600"></span>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/products"
              end
              className={({ isActive }) =>
                `text-base font-medium transition-colors duration-200 relative ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Products
                  {isActive && (
                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-600"></span>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `text-base font-medium transition-colors duration-200 relative ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Cart
                  {isActive && (
                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-600"></span>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/register"
              end
              className={({ isActive }) =>
                `text-base font-medium transition-colors duration-200 relative ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Register
                  {isActive && (
                    <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-600"></span>
                  )}
                </>
              )}
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="py-4 space-y-3">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `block px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              end
              className={({ isActive }) =>
                `block px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `block px-4 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
