import { ArrowRight } from "lucide-react"

const HeroBanner = () => {
  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 overflow-hidden ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-300 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-red-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-300 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-in slide-in-from-left duration-1000">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Delicious Food
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Delivered Fast
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Satisfy your cravings with our wide selection of restaurants and cuisines. Fresh, hot, and delivered right
              to your doorstep.
            </p>
            <button className="group inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span>Order Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-in slide-in-from-right duration-1000 delay-300 mt-8">
            <div className="relative">
              <img
                src="https://imgs.search.brave.com/uXwdmNQJ44lS7lDA3hQc2eZcoK6P701SFfhlgHWVgBU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG5p/Lmljb25zY291dC5j/b20vaWxsdXN0cmF0/aW9uL3ByZW1pdW0v/dGh1bWIvZGF0ZS1h/dC1zdHJlZXQtZm9v/ZC1jYWZlLWlsbHVz/dHJhdGlvbi1kb3du/bG9hZC1pbi1zdmct/cG5nLWdpZi1maWxl/LWZvcm1hdHMtLWNv/dXBsZS1vbi1jb2Zm/ZWUtZnJpZW5kcy1y/b21hbnRpYy1hbmQt/ZHJpbmstcGFjay1p/bGx1c3RyYXRpb25z/LTU5MjQ0OTYucG5n/P2Y9d2VicA"
                alt="Delicious Food"
                className="w-full h-[400px] rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce">
                <span className="text-2xl">🍕</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg animate-bounce delay-1000">
                <span className="text-2xl">🍔</span>
              </div>
              <div className="absolute top-1/2 -left-8 bg-white rounded-full p-3 shadow-lg animate-pulse">
                <span className="text-xl">⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

export default HeroBanner
