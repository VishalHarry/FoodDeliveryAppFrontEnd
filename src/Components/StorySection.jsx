import { Heart, Users, Award } from "lucide-react"

const StorySection = () => {
  const stories = [
    {
      id: 1,
      title: "Our Passionate Chefs",
      description:
        "Meet our team of world-class chefs who bring decades of culinary expertise and creativity to every dish they craft.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Heart,
      stats: "50+ Expert Chefs",
    },
    {
      id: 2,
      title: "Community First",
      description:
        "We believe in supporting local farmers and suppliers, creating a sustainable ecosystem that benefits everyone.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Users,
      stats: "200+ Local Partners",
    },
    {
      id: 3,
      title: "Award-Winning Quality",
      description:
        "Our commitment to excellence has earned us recognition from food critics and satisfied customers worldwide.",
      image: "/placeholder.svg?height=300&width=400",
      icon: Award,
      stats: "25+ Awards Won",
    },
  ]

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-300 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-red-300 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-300 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Behind the Shop</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Every great meal tells a story. Discover the passion, dedication, and craftsmanship that goes into creating
            your favorite dishes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="group animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                {/* Icon */}
                <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <story.icon className="w-6 h-6 text-orange-500" />
                  </div>
                </div>

                {/* Stats */}
                <div className="absolute top-6 right-6">
                  <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {story.stats}
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-300 transition-colors duration-300">
                    {story.title}
                  </h3>
                  <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                    {story.description}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-orange-500 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-16 animate-in slide-in-from-bottom duration-1000 delay-1000">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of satisfied customers who trust us for their daily meals
            </p>
            <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Start Your Journey
            </button>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default StorySection
