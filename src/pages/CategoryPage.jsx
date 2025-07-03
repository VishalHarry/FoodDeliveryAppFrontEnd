"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronDown, Filter } from "lucide-react"
import { useCart } from "../context/CartContext"
import ProductCard from "../Components/ProductCard"
import axios from "axios"


const CategoryPage = () => {
  const {categoryName } = useParams()
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({
    vegetarian: false,
    nonVegetarian: false,
    containsEgg: false,
    eggless: false,
    cuisine: [],
    dietary: [],
    spicyLevel: [],
  })
  const [sortBy, setSortBy] = useState("bestSelling")
  const [showFilters, setShowFilters] = useState(false)

  // Mock product data
  const mockProducts = {
    beverages: [
      {
        id: 1,
        name: "Margherita Pizza",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 128,
        originalPrice: 18.99,
        discountedPrice: 14.99,
        category: "appetizers",
        vegetarian: true,
        eggless: true,
        cuisine: "Italian",
        spicyLevel: "Mild",
        variants: [
          { name: "Size", options: ["Small", "Medium", "Large"] },
          { name: "Crust", options: ["Thin", "Thick", "Stuffed"] },
        ],
      },
      {
        id: 2,
        name: "Pepperoni Pizza",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 95,
        originalPrice: 22.99,
        discountedPrice: 18.99,
        category: "pizza",
        vegetarian: false,
        eggless: false,
        cuisine: "beverages",
        spicyLevel: "Medium",
        variants: [
          { name: "Size", options: ["Small", "Medium", "Large"] },
          { name: "Crust", options: ["Thin", "Thick", "Stuffed"] },
        ],
      },
      {
        id: 3,
        name: "Veggie Supreme Pizza",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.3,
        reviews: 76,
        originalPrice: 20.99,
        discountedPrice: 16.99,
        category: "pizza",
        vegetarian: true,
        eggless: true,
        cuisine: "Italian",
        spicyLevel: "Mild",
        variants: [
          { name: "Size", options: ["Small", "Medium", "Large"] },
          { name: "Crust", options: ["Thin", "Thick", "Stuffed"] },
        ],
      },
    ],
    burgers: [
      {
        id: 4,
        name: "Classic Beef Burger",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 142,
        originalPrice: 14.99,
        discountedPrice: 11.99,
        category: "burgers",
        vegetarian: false,
        eggless: false,
        cuisine: "American",
        spicyLevel: "Medium",
        variants: [
          { name: "Size", options: ["Regular", "Large"] },
          { name: "Cheese", options: ["No Cheese", "Single", "Double"] },
        ],
      },
      {
        id: 5,
        name: "Veggie Burger",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.2,
        reviews: 89,
        originalPrice: 12.99,
        discountedPrice: 9.99,
        category: "burgers",
        vegetarian: true,
        eggless: true,
        cuisine: "American",
        spicyLevel: "Mild",
        variants: [
          { name: "Size", options: ["Regular", "Large"] },
          { name: "Cheese", options: ["No Cheese", "Single", "Double"] },
        ],
      },
    ],
  }

  // top par import

useEffect(() => {
  const fetchProducts = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/foods/category/${categoryName}`);
    console.log("Fetched products:", response.data);

    const fetchedProducts = response.data;

    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};


  fetchProducts();
}, [categoryName]);


  useEffect(() => {
    // Simulate API call
    const categoryProducts = mockProducts[categoryName] || []
    setProducts(categoryProducts)
    setFilteredProducts(categoryProducts)
  }, [categoryName])

  useEffect(() => {
    let filtered = [...products]

    // Apply filters
    if (filters.vegetarian && !filters.nonVegetarian) {
      filtered = filtered.filter((product) => product.vegetarian)
    } else if (filters.nonVegetarian && !filters.vegetarian) {
      filtered = filtered.filter((product) => !product.vegetarian)
    }

    if (filters.eggless && !filters.containsEgg) {
      filtered = filtered.filter((product) => product.eggless)
    } else if (filters.containsEgg && !filters.eggless) {
      filtered = filtered.filter((product) => !product.eggless)
    }

    // Apply sorting
    switch (sortBy) {
      case "bestSelling":
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
      case "aToZ":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "zToA":
        filtered.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "priceLowToHigh":
        filtered.sort((a, b) => a.discountedPrice - b.discountedPrice)
        break
      case "priceHighToLow":
        filtered.sort((a, b) => b.discountedPrice - a.discountedPrice)
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [filters, sortBy, products])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const formatCategoryName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-orange-500 transition-colors duration-200">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{formatCategoryName(categoryName)}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      
        <div className="max-w-7xl text-orange-600 mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-3xl font-bold  animate-in slide-in-from-left duration-1000 mt-2">
            {formatCategoryName(categoryName)}
          </h1>
          <p className="text-xl opacity-90 animate-in slide-in-from-left duration-1000 delay-200">
            Discover our delicious {categoryName} collection
          </p>
        </div>
      

      {/* Filters and Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`}
                />
              </button>

              {showFilters && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 p-6 z-10 animate-in slide-in-from-top-2 duration-200">
                  <h3 className="font-semibold mb-4">Filter Options</h3>

                  {/* Vegetarian/Non-Vegetarian */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Diet Type</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.vegetarian}
                          onChange={(e) => handleFilterChange("vegetarian", e.target.checked)}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="ml-2">Vegetarian</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.nonVegetarian}
                          onChange={(e) => handleFilterChange("nonVegetarian", e.target.checked)}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="ml-2">Non-Vegetarian</span>
                      </label>
                    </div>
                  </div>

                  {/* Egg Options */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Egg Content</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.eggless}
                          onChange={(e) => handleFilterChange("eggless", e.target.checked)}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="ml-2">Eggless</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.containsEgg}
                          onChange={(e) => handleFilterChange("containsEgg", e.target.checked)}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="ml-2">Contains Egg</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="bestSelling">Best Selling</option>
                <option value="aToZ">A-Z</option>
                <option value="zToA">Z-A</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} animationDelay={index * 100} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-2xl">🍽️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
