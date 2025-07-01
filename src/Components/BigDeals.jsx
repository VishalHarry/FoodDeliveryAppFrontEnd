"use client"
import { Clock, Zap } from "lucide-react"
import { useCart } from "../context/CartContext"


const BigDeals = () => {
  const { addToCart } = useCart()

  const deals = [
    {
      id: 1,
      name: "Family Pizza Combo",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 45.99,
      discountedPrice: 29.99,
      discount: 35,
      timeLeft: "2h 30m",
      description: "2 Large Pizzas + Garlic Bread + 2L Coke",
    },
    {
      id: 2,
      name: "Burger Feast Deal",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 32.99,
      discountedPrice: 22.99,
      discount: 30,
      timeLeft: "4h 15m",
      description: "3 Burgers + Large Fries + 3 Drinks",
    },
    {
      id: 3,
      name: "Sushi Master Set",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 58.99,
      discountedPrice: 39.99,
      discount: 32,
      timeLeft: "1h 45m",
      description: "40 Pieces Mixed Sushi + Miso Soup",
    },
    {
      id: 4,
      name: "Weekend Brunch Special",
      image: "/placeholder.svg?height=300&width=300",
      originalPrice: 28.99,
      discountedPrice: 19.99,
      discount: 31,
      timeLeft: "6h 20m",
      description: "Pancakes + Eggs Benedict + Fresh Juice",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in slide-in-from-bottom duration-1000">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">Limited Time Offers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Big Deals</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Incredible savings on your favorite meals - but hurry, these deals won't last long!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-in slide-in-from-bottom duration-1000 relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  {deal.discount}% OFF
                </div>
              </div>

              {/* Timer Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{deal.timeLeft}</span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40"></div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-orange-500 transition-colors duration-300">
                  {deal.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3">{deal.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                    <span className="text-2xl font-bold text-red-500">${deal.discountedPrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(deal)}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 rounded-full hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                  <span className="relative z-10">Grab Deal Now</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BigDeals
