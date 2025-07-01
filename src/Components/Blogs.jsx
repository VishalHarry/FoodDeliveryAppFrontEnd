import { Calendar, ArrowRight } from "lucide-react"

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "The Art of Perfect Pizza Making",
      description:
        "Discover the secrets behind creating the perfect pizza dough and selecting the finest toppings for an authentic Italian experience.",
      image: "/placeholder.svg?height=250&width=400",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Cooking Tips",
    },
    {
      id: 2,
      title: "Healthy Eating on a Budget",
      description:
        "Learn how to maintain a nutritious diet without breaking the bank with these practical tips and affordable recipe ideas.",
      image: "/placeholder.svg?height=250&width=400",
      date: "March 12, 2024",
      readTime: "7 min read",
      category: "Health & Nutrition",
    },
    {
      id: 3,
      title: "Street Food Around the World",
      description:
        "Take a culinary journey through the most exciting street food destinations and discover flavors that will tantalize your taste buds.",
      image: "/placeholder.svg?height=250&width=400",
      date: "March 10, 2024",
      readTime: "6 min read",
      category: "Food Culture",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-in slide-in-from-bottom duration-1000">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Foodie Blogs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest food trends, recipes, and culinary insights from our expert chefs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={blog.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {blog.category}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">{blog.description}</p>

                <button className="group/btn inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-300">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blogs
