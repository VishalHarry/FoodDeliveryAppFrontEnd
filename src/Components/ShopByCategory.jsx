const ShopByCategory = () => {
  const categories = [
    { id: 1, name: "Pizza", image: "/placeholder.svg?height=150&width=150", color: "from-red-400 to-red-600" },
    { id: 2, name: "Burgers", image: "/placeholder.svg?height=150&width=150", color: "from-yellow-400 to-orange-600" },
    { id: 3, name: "Pasta", image: "/placeholder.svg?height=150&width=150", color: "from-green-400 to-green-600" },
    { id: 4, name: "Sushi", image: "/placeholder.svg?height=150&width=150", color: "from-blue-400 to-blue-600" },
    { id: 5, name: "Desserts", image: "/placeholder.svg?height=150&width=150", color: "from-pink-400 to-pink-600" },
    {
      id: 6,
      name: "Beverages",
      image: "/placeholder.svg?height=150&width=150",
      color: "from-purple-400 to-purple-600",
    },
    { id: 7, name: "Salads", image: "/placeholder.svg?height=150&width=150", color: "from-emerald-400 to-emerald-600" },
    { id: 8, name: "Seafood", image: "/placeholder.svg?height=150&width=150", color: "from-cyan-400 to-cyan-600" },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of cuisines and find your perfect meal
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group text-center animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mb-4">
                <div
                  className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${category.color} p-1 group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-white bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopByCategory
