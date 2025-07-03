"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Star, ShoppingCart, Clock, Check, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthProvider"

const ProductDetailsPage = () => {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    name: "",
  })
  const [similarProducts, setSimilarProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Hard-coded data for additional product information
  const getHardCodedData = (productName) => {
    // Default hard-coded data that can be customized based on product name
    const defaultData = {
      images: [
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=500&width=500",
        "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1078&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=500&width=500",
        "https://images.unsplash.com/photo-1623855244183-52fd8d3ce2f7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?height=500&width=500",
      ],
      rating: 4.5,
      totalReviews: 128,
      originalPrice: null, // Will be calculated as price * 1.25
      vegetarian: true,
      eggless: true,
      cuisine: "Asian",
      spicyLevel: "Mild",
      deliveryTime: "25-30 mins",
      ingredients: ["Fresh Ingredients", "Special Spices", "Premium Quality"],
      nutritionalInfo: {
        calories: 285,
        protein: "12g",
        carbs: "36g",
        fat: "10g",
      },
    }

    // Customize based on product name or category
    if (productName.toLowerCase().includes('pizza')) {
      return {
        ...defaultData,
        cuisine: "Italian",
        ingredients: ["Fresh Tomatoes", "Mozzarella Cheese", "Fresh Basil", "Olive Oil", "Pizza Dough"],
      }
    } else if (productName.toLowerCase().includes('spring')) {
      return {
        ...defaultData,
        cuisine: "Asian",
        ingredients: ["Fresh Vegetables", "Wrapper", "Soy Sauce", "Sesame Oil"],
        spicyLevel: "Mild",
      }
    }

    return defaultData
  }

  const mockReviews = [
    {
      id: 1,
      user: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment: "Absolutely delicious! Fresh ingredients and perfect preparation.",
      date: "2024-01-15",
      images: ["/placeholder.svg?height=100&width=100"],
    },
    {
      id: 2,
      user: "Sarah Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment: "Great taste and quick delivery. Will order again!",
      date: "2024-01-10",
      images: [],
    },
    {
      id: 3,
      user: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment: "Best food delivery service! Amazing quality.",
      date: "2024-01-08",
      images: [],
    },
  ]

  const mockSimilarProducts = [
    {
      id: 2,
      name: "Chicken Spring Rolls",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.7,
      originalPrice: 22.99,
      discountedPrice: 18.99,
    },
    {
      id: 3,
      name: "Veggie Dumplings",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.3,
      originalPrice: 20.99,
      discountedPrice: 16.99,
    },
    {
      id: 4,
      name: "Chicken Momos",
      image: "/placeholder.svg?height=200&width=200",
      rating: 4.6,
      originalPrice: 24.99,
      discountedPrice: 19.99,
    },
  ]

  // Fetch product data from API
  const fetchProduct = async () => {
    try {
      setLoading(true)
      // Replace this URL with your actual API endpoint
      const response = await fetch(`http://localhost:8080/api/foods/${productId}`)
      
      if (!response.ok) {
        throw new Error('Product not found')
      }
      
      const productData = await response.json()
      
      // Combine dynamic data with hard-coded data
      const hardCodedData = getHardCodedData(productData.name)
      const combinedProduct = {
        id: productData.id || productData._id,
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        inStock: productData.available,
        // Use product image if available, otherwise use hard-coded images
        images: productData.imageUrl ? [productData.imageUrl, ...hardCodedData.images.slice(1)] : hardCodedData.images,
        // Calculate original price (25% higher than current price)
        originalPrice: Math.round(productData.price * 1.25),
        discountedPrice: productData.price,
        // Merge with hard-coded data
        ...hardCodedData,
      }
      
      setProduct(combinedProduct)
      console.log("API Response productData:", productData)
      console.log("Combined Product Data:", combinedProduct)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching product:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productId) {
      fetchProduct()
      // Set hard-coded reviews and similar products
      setReviews(mockReviews)
      setSimilarProducts(mockSimilarProducts)
    }
  }, [productId])

  const calculatePrice = () => {
    if (!product) return 0
    return product.discountedPrice * quantity
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    for (let i = 0; i < quantity; i++) {
      addToCart(product, {}) // No variants, so pass empty object
    }

    setIsAdding(false)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      alert("Please login to submit a review")
      return
    }

    const review = {
      id: reviews.length + 1,
      user: newReview.name || "Anonymous",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
      images: [],
    }

    setReviews([review, ...reviews])
    setNewReview({ rating: 5, comment: "", name: "" })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to="/" 
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
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
            <Link
              to={`/category/${product.category?.toLowerCase()}`}
              className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
            >
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />

              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index ? "border-orange-500" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-medium text-gray-700">{product.rating}</span>
                </div>
                <span className="ml-2 text-gray-500">({product.totalReviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl text-gray-500 line-through">₹{product.price}</span>
                <span className="text-3xl font-bold text-orange-500">₹{calculatePrice().toFixed(2)-2}</span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center mb-4">
                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <Check className="w-5 h-5 mr-2" />
                    <span className="font-medium">In Stock</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <X className="w-5 h-5 mr-2" />
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Delivery Time */}
              <div className="flex items-center text-gray-600 mb-6">
                <Clock className="w-5 h-5 mr-2" />
                <span>Delivery by {product.deliveryTime}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                >
                  -
                </button>
                <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              className={`w-full flex items-center justify-center space-x-2 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                !product.inStock || isAdding
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              <span>{isAdding ? "Adding..." : `Add to Cart - ₹${calculatePrice().toFixed(2)}`}</span>
            </button>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Nutritional Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Nutritional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-500">{product.nutritionalInfo.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-500">{product.nutritionalInfo.protein}</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-500">{product.nutritionalInfo.carbs}</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-500">{product.nutritionalInfo.fat}</div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((similarProduct) => (
              <Link
                key={similarProduct.id}
                to={`/product/${similarProduct.id}`}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={similarProduct.image || "/placeholder.svg"}
                    alt={similarProduct.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                    {similarProduct.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{similarProduct.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 line-through">₹{similarProduct.originalPrice}</span>
                    <span className="text-lg font-bold text-orange-500">₹{similarProduct.discountedPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Customer Reviews</h2>

          {/* Leave a Review */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                      className={`w-8 h-8 ${star <= newReview.rating ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition-colors duration-200`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Share your experience..."
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt={review.user}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{review.user}</h4>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-600 mb-3">{review.comment}</p>

                    {review.images && review.images.length > 0 && (
                      <div className="flex space-x-2">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`Review image ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage