"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Star, ShoppingCart } from "lucide-react"

const ProductCard = ({ product, onAddToCart, animationDelay = 0 }) => {
  const [selectedVariants, setSelectedVariants] = useState({})
  const [isAdding, setIsAdding] = useState(false)

  const handleVariantChange = (variantName, option) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: option,
    }))
  }

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    onAddToCart(product, selectedVariants)
    setIsAdding(false)
  }

  return (
    <div
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-in slide-in-from-bottom duration-1000"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
          />
        </Link>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

        {/* Vegetarian/Non-Vegetarian Indicator */}
        <div className="absolute top-3 left-3">
          <div
            className={`w-4 h-4 rounded-full border-2 ${product.vegetarian ? "border-green-500 bg-green-100" : "border-red-500 bg-red-100"}`}
          >
            <div className={`w-2 h-2 rounded-full m-0.5 ${product.vegetarian ? "bg-green-500" : "bg-red-500"}`}></div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300 cursor-pointer">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">{product.rating}</span>
          </div>
          <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            <span className="text-xl font-bold text-orange-500">${product.discountedPrice}</span>
          </div>
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-4 space-y-2">
            {product.variants.map((variant) => (
              <div key={variant.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{variant.name}</label>
                <select
                  value={selectedVariants[variant.name] || variant.options[0]}
                  onChange={(e) => handleVariantChange(variant.name, e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {variant.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
            isAdding
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
