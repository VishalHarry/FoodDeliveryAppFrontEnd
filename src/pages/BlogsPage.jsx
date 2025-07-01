"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, Clock, ArrowRight, Search } from "lucide-react"

const BlogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const blogsPerPage = 6

  const blogs = [
    {
      id: 1,
      title: "10 Tips for Ordering Healthy Food Online",
      slug: "10-tips-healthy-food-online",
      excerpt:
        "Discover how to make healthier choices when ordering food delivery. From reading nutritional information to choosing the right portions.",
      image: "/placeholder.svg?height=300&width=400",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Health & Nutrition",
    },
    {
      id: 2,
      title: "The Rise of Plant-Based Cuisine in Food Delivery",
      slug: "rise-plant-based-cuisine-delivery",
      excerpt:
        "Explore the growing trend of plant-based options in food delivery and how restaurants are adapting to meet customer demands.",
      image: "/placeholder.svg?height=300&width=400",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Trends",
    },
    {
      id: 3,
      title: "How to Support Local Restaurants Through Food Delivery",
      slug: "support-local-restaurants-delivery",
      excerpt:
        "Learn about the impact of food delivery on local businesses and how you can help support your favorite neighborhood restaurants.",
      image: "/placeholder.svg?height=300&width=400",
      date: "2024-01-10",
      readTime: "4 min read",
      category: "Community",
    },
    {
      id: 4,
      title: "The Science Behind Food Packaging for Delivery",
      slug: "science-food-packaging-delivery",
      excerpt:
        "Dive into the technology and innovation behind food packaging that keeps your meals fresh and delicious during delivery.",
      image: "/placeholder.svg?height=300&width=400",
      date: "2024-01-08",
      readTime: "6 min read",
      category: "Technology",
    },
    {
      id: 5,
      title: "Seasonal Ingredients: What's Fresh This Month",
      slug: "seasonal-ingredients-fresh-month",
      excerpt:
        "A guide to seasonal ingredients and how top restaurants incorporate them into their delivery menus for maximum flavor.",
      image: "/placeholder.svg?height=300&width=400",
      date: "2024-01-05",
      readTime: "5 min read",
      category: "Ingredients",
    },
    {
      id: 6,
      title: "Food Safety in the Digital Age",
      slug: "food-safety-digital-age",
      excerpt:
        "Understanding food safety protocols in food delivery services and what measures are taken to ensure your meal arrives safely.",
      image: "/placeholder.svg?height=300&width=400",
      date: "2024-01-03",
      readTime: "8 min read",
      category: "Safety",
    },
    {
      id: 7,
      title: "The Art of Food Photography for Delivery Apps",
      slug: "art-food-photography-delivery-apps",
      excerpt:
        "Behind the scenes look at how food photography influences our ordering decisions and the techniques used by professional food photographers.",
      image: "/placeholder.svg?height=300&width=400",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Photography",
    },
    {
      id: 8,
      title: "Sustainable Packaging: The Future of Food Delivery",
      slug: "sustainable-packaging-future-delivery",
      excerpt:
        "Exploring eco-friendly packaging solutions and how the food delivery industry is working towards a more sustainable future.",
      image: "/placeholder.svg?height=300&width=400",
      date: "2023-12-28",
      readTime: "7 min read",
      category: "Sustainability",
    },
  ]

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage)
  const startIndex = (currentPage - 1) * blogsPerPage
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage)

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom duration-1000">
            Foodie Blogs
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto animate-in slide-in-from-bottom duration-1000 delay-200">
            Discover the latest trends, tips, and stories from the world of food delivery
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-in slide-in-from-bottom duration-1000">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              placeholder="Search blogs..."
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentBlogs.map((blog, index) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-in slide-in-from-bottom duration-1000"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white bg-opacity-90 text-orange-500 px-3 py-1 rounded-full text-sm font-medium">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-orange-500 transition-colors duration-300">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{blog.excerpt}</p>

                <Link
                  to={`/blogs/${blog.slug}`}
                  className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300 group"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No blogs found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 animate-in slide-in-from-bottom duration-1000">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-500 shadow-md"
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-500 shadow-md"
                  }`}
                >
                  {page}
                </button>
              )
            })}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-500 shadow-md"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogsPage
