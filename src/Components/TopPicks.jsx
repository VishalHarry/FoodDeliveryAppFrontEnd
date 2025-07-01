"use client"
import { Star } from "lucide-react"
import { useCart } from "../context/CartContext"

const TopPicks = () => {
  const { addToCart } = useCart()

  const topPicks = [
    {
      id: 1,
      name: "Gourmet Pizza Supreme",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 26.99,
      discountedPrice: 21.99,
      rating: 4.8,
      discount: 18,
    },
    {
      id: 2,
      name: "Artisan Burger Deluxe",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 19.99,
      discountedPrice: 15.99,
      rating: 4.9,
      discount: 20,
    },
    {
      id: 3,
      name: "Signature Ramen Bowl",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 17.99,
      discountedPrice: 13.99,
      rating: 4.7,
      discount: 22,
    },
    {
      id: 4,
      name: "Mediterranean Platter",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 23.99,
      discountedPrice: 18.99,
      rating: 4.6,
      discount: 21,
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Top Picks For You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked selections based on your preferences and popular choices
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {topPicks.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1 animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  {item.discount}% OFF
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                    <span className="text-2xl font-bold text-orange-500">${item.discountedPrice}</span>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopPicks
