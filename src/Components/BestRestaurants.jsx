import { MapPin, Clock, Star } from "lucide-react"

const BestRestaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "Bella Italia",
      image: "/placeholder.svg?height=300&width=400",
      cuisine: "Italian",
      rating: 4.8,
      deliveryTime: "25-35 min",
      distance: "1.2 km",
      featuredDish: "Truffle Pasta",
      originalPrice: 24.99,
      discountedPrice: 19.99,
    },
    {
      id: 2,
      name: "Sakura Sushi",
      image: "/placeholder.svg?height=300&width=400",
      cuisine: "Japanese",
      rating: 4.9,
      deliveryTime: "30-40 min",
      distance: "2.1 km",
      featuredDish: "Premium Sushi Set",
      originalPrice: 32.99,
      discountedPrice: 27.99,
    },
    {
      id: 3,
      name: "Burger Palace",
      image: "/placeholder.svg?height=300&width=400",
      cuisine: "American",
      rating: 4.7,
      deliveryTime: "20-30 min",
      distance: "0.8 km",
      featuredDish: "Signature Burger",
      originalPrice: 16.99,
      discountedPrice: 13.99,
    },
    {
      id: 4,
      name: "Spice Garden",
      image: "/placeholder.svg?height=300&width=400",
      cuisine: "Indian",
      rating: 4.6,
      deliveryTime: "35-45 min",
      distance: "1.8 km",
      featuredDish: "Butter Chicken",
      originalPrice: 18.99,
      discountedPrice: 15.99,
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Best of Restaurants</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Top-rated restaurants in your area with amazing deals and fast delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{restaurant.name}</h3>
                  <p className="text-sm opacity-90">{restaurant.cuisine} Cuisine</p>
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{restaurant.featuredDish}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 line-through">${restaurant.originalPrice}</span>
                        <span className="text-lg font-bold text-orange-500">${restaurant.discountedPrice}</span>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 font-semibold">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestRestaurants
