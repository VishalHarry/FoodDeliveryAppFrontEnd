"use client"
import { useCart } from "../context/CartContext"

const PopularDishes = () => {
  const { addToCart } = useCart()

  const dishes = [
    {
      id: 1,
      name: "Margherita Pizza",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 18.99,
      discountedPrice: 14.99,
    },
    {
      id: 2,
      name: "Chicken Burger",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 12.99,
      discountedPrice: 9.99,
    },
    {
      id: 3,
      name: "Pasta Carbonara",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 16.99,
      discountedPrice: 13.99,
    },
    {
      id: 4,
      name: "Caesar Salad",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 11.99,
      discountedPrice: 8.99,
    },
    {
      id: 5,
      name: "Sushi Roll",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 22.99,
      discountedPrice: 18.99,
    },
    {
      id: 6,
      name: "Chocolate Cake",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 8.99,
      discountedPrice: 6.99,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Popular Dishes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved dishes that keep customers coming back for more
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <div
              key={dish.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={dish.image || "/placeholder.svg"}
                  alt={dish.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {dish.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 line-through">${dish.originalPrice}</span>
                    <span className="text-xl font-bold text-orange-500">${dish.discountedPrice}</span>
                  </div>
                  <button
                    onClick={() => addToCart(dish)}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularDishes
