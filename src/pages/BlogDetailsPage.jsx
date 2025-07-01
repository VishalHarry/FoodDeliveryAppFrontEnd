"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, MessageCircle, ArrowRight } from "lucide-react"

const BlogDetailsPage = () => {
  const { blogSlug } = useParams()
  const [blog, setBlog] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])

  // Mock blog data
  const mockBlog = {
    id: 1,
    title: "10 Tips for Ordering Healthy Food Online",
    slug: "10-tips-healthy-food-online",
    content: `
      <p>In today's fast-paced world, ordering food online has become a convenient way to enjoy delicious meals without the hassle of cooking. However, maintaining a healthy diet while relying on food delivery can be challenging. Here are 10 practical tips to help you make healthier choices when ordering food online.</p>

      <h2>1. Read Nutritional Information</h2>
      <p>Many food delivery apps now provide detailed nutritional information for each dish. Take advantage of this feature to make informed decisions about your meals. Look for options that are lower in calories, saturated fat, and sodium while being rich in nutrients.</p>

      <h2>2. Choose Grilled Over Fried</h2>
      <p>When possible, opt for grilled, baked, or steamed dishes instead of fried options. Grilled chicken, fish, and vegetables retain more of their natural nutrients and contain less unhealthy fats compared to their fried counterparts.</p>

      <h2>3. Load Up on Vegetables</h2>
      <p>Look for dishes that include plenty of vegetables. Many restaurants offer the option to add extra vegetables to your order. This not only increases the nutritional value of your meal but also helps you feel more satisfied.</p>

      <h2>4. Watch Your Portion Sizes</h2>
      <p>Restaurant portions are often larger than what we need for a single meal. Consider sharing a dish with someone else or saving half for later. Some apps even offer smaller portion sizes or lunch-sized portions that can be perfect for a single meal.</p>

      <h2>5. Be Mindful of Sauces and Dressings</h2>
      <p>Sauces and dressings can add significant calories and sodium to your meal. Ask for them on the side so you can control how much you use, or look for lighter alternatives like vinaigrettes instead of creamy dressings.</p>

      <h2>6. Stay Hydrated</h2>
      <p>Instead of ordering sugary drinks or sodas, opt for water, unsweetened tea, or sparkling water. This simple switch can save you hundreds of calories and reduce your sugar intake significantly.</p>

      <h2>7. Plan Your Orders</h2>
      <p>Take time to browse the menu and nutritional information before placing your order. Planning ahead helps you make better choices rather than impulsively ordering the first thing that looks appealing.</p>

      <h2>8. Look for Whole Grains</h2>
      <p>When ordering dishes with rice, bread, or pasta, see if whole grain options are available. Whole grains provide more fiber and nutrients compared to refined grains, helping you feel fuller for longer.</p>

      <h2>9. Don't Skip Meals</h2>
      <p>Avoid the temptation to skip meals earlier in the day to "save calories" for your food delivery order. This often leads to overeating and poor food choices due to excessive hunger.</p>

      <h2>10. Balance Your Week</h2>
      <p>If you order food delivery regularly, try to balance indulgent meals with healthier options throughout the week. This approach allows you to enjoy your favorite foods while maintaining an overall healthy diet.</p>

      <p>Remember, making healthier choices when ordering food online doesn't mean sacrificing taste or enjoyment. With these tips, you can maintain a balanced diet while still enjoying the convenience of food delivery. Start implementing these strategies gradually, and you'll soon find that eating healthy through food delivery becomes second nature.</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Health & Nutrition",
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=60&width=60",
      bio: "Nutritionist and wellness expert with over 10 years of experience in healthy eating.",
    },
  }

  const mockRelatedBlogs = [
    {
      id: 2,
      title: "The Rise of Plant-Based Cuisine in Food Delivery",
      slug: "rise-plant-based-cuisine-delivery",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-01-12",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Seasonal Ingredients: What's Fresh This Month",
      slug: "seasonal-ingredients-fresh-month",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-01-05",
      readTime: "5 min read",
    },
    {
      id: 6,
      title: "Food Safety in the Digital Age",
      slug: "food-safety-digital-age",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-01-03",
      readTime: "8 min read",
    },
  ]

  useEffect(() => {
    // Simulate API call
    setBlog(mockBlog)
    setRelatedBlogs(mockRelatedBlogs)
  }, [blogSlug])

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const title = blog.title

    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`
        break
      default:
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <div className="text-white">
              <div className="mb-4">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {blog.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-in slide-in-from-bottom duration-1000">
                {blog.title}
              </h1>
              <div className="flex items-center space-x-6 text-sm opacity-90 animate-in slide-in-from-bottom duration-1000 delay-200">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8 animate-in slide-in-from-left duration-1000">
          <Link
            to="/blogs"
            className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Blogs</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-lg p-8 animate-in slide-in-from-bottom duration-1000">
              {/* Author Info */}
              <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
                <img
                  src={blog.author.avatar || "/placeholder.svg"}
                  alt={blog.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{blog.author.name}</h3>
                  <p className="text-gray-600 text-sm">{blog.author.bio}</p>
                </div>
              </div>

              {/* Blog Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Social Share */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-800">Share this article</h4>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleShare("facebook")}
                      className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare("twitter")}
                      className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-200"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => navigator.share({ title: blog.title, url: window.location.href })}
                      className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Related Blogs */}
              <div className="bg-white rounded-2xl shadow-lg p-6 animate-in slide-in-from-right duration-1000">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Related Articles</h3>
                <div className="space-y-4">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link key={relatedBlog.id} to={`/blogs/${relatedBlog.slug}`} className="block group">
                      <div className="flex space-x-3">
                        <img
                          src={relatedBlog.image || "/placeholder.svg"}
                          alt={relatedBlog.title}
                          className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                            {relatedBlog.title}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                            <span>{formatDate(relatedBlog.date)}</span>
                            <span>•</span>
                            <span>{relatedBlog.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <Link
                  to="/blogs"
                  className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300 group mt-6"
                >
                  <span>View All Blogs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl p-6 animate-in slide-in-from-right duration-1000 delay-200">
                <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                <p className="text-sm opacity-90 mb-4">Get the latest food trends and tips delivered to your inbox.</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full bg-white text-orange-500 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailsPage
