import React from 'react'

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life",
    price: 89.99,
    quantity: 45,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    rating: 4.5
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    description: "Track your workouts, heart rate, and sleep with this water-resistant smartwatch",
    price: 199.99,
    quantity: 23,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Wearables",
    rating: 4.7
  },
  {
    id: 3,
    name: "Leather Laptop Bag",
    description: "Professional genuine leather bag with padded compartment for 15-inch laptops",
    price: 79.99,
    quantity: 67,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Accessories",
    rating: 4.3
  },
  {
    id: 4,
    name: "Portable Power Bank",
    description: "20000mAh fast-charging power bank with dual USB ports and LED display",
    price: 34.99,
    quantity: 120,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    category: "Electronics",
    rating: 4.6
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    description: "Insulated 32oz water bottle keeps drinks cold for 24 hours or hot for 12 hours",
    price: 24.99,
    quantity: 89,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    category: "Home & Kitchen",
    rating: 4.8
  },
  {
    id: 6,
    name: "Mechanical Gaming Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches and aluminum frame",
    price: 129.99,
    quantity: 34,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    category: "Electronics",
    rating: 4.4
  },
  {
    id: 7,
    name: "Cotton Blend T-Shirt",
    description: "Comfortable crew neck t-shirt in premium cotton blend, available in multiple colors",
    price: 19.99,
    quantity: 156,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    category: "Clothing",
    rating: 4.2
  },
  {
    id: 8,
    name: "Yoga Mat with Carrying Strap",
    description: "Non-slip 6mm thick yoga mat made from eco-friendly TPE material",
    price: 29.99,
    quantity: 72,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    category: "Sports & Fitness",
    rating: 4.5
  },
  {
    id: 9,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI and 18-month battery life",
    price: 22.99,
    quantity: 98,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    category: "Electronics",
    rating: 4.3
  },
  {
    id: 10,
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic mugs with modern minimalist design",
    price: 39.99,
    quantity: 54,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",
    category: "Home & Kitchen",
    rating: 4.7
  }
];

function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="mt-2 text-gray-600">Browse our collection of {products.length} products</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {product.quantity < 30 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    Low Stock
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Category */}
                <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                  {product.category}
                </span>

                {/* Product Name */}
                <h3 className="mt-2 text-lg font-semibold text-gray-900 line-clamp-2">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-2 flex-1">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mt-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating}
                  </span>
                </div>

                {/* Price and Button */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {product.quantity} in stock
                    </p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
