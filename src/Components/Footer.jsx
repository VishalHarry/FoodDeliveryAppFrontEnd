import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react"

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Popular Dishes", href: "/popular" },
    { name: "Categories", href: "/categories" },
    { name: "Big Deals", href: "/deals" },
    { name: "Blogs", href: "/blogs" },
  ]

  const informationLinks = [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ]

  const supportLinks = [
    { name: "My Account", href: "/account" },
    { name: "Order History", href: "/orders" },
    { name: "Track Order", href: "/track" },
    { name: "Help Center", href: "/help" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
   
      {/* <div className="bg-gradient-to-r from-orange-500 to-red-500 py-4 animate-in slide-in-from-bottom duration-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold">Get Our App for Better Experience</h3>
              <p className="text-sm opacity-90">Download now and enjoy exclusive app-only deals</p>
            </div>
            <button className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
              Download App
            </button>
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div className="animate-in slide-in-from-bottom duration-1000">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="ml-3 text-xl font-bold">FoodieApp</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Bringing delicious food from the best restaurants directly to your doorstep. Fresh, fast, and always
                satisfying.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-in slide-in-from-bottom duration-1000 delay-200">
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div className="animate-in slide-in-from-bottom duration-1000 delay-400">
              <h3 className="text-lg font-semibold mb-6">Information</h3>
              <ul className="space-y-3">
                {informationLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Newsletter */}
            <div className="animate-in slide-in-from-bottom duration-1000 delay-600">
              <h3 className="text-lg font-semibold mb-6">Account & Support</h3>
              <ul className="space-y-3 mb-8">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Newsletter Subscription */}
              <div>
                <h4 className="font-semibold mb-3">Stay Updated</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                  <button className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded-r-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Email Us</p>
                  <p className="text-gray-400">hello@foodieapp.com</p>
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Visit Us</p>
                  <p className="text-gray-400">123 Food Street, City</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-6 animate-in fade-in duration-1000 delay-1000">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">© 2024 FoodieApp. All Rights Reserved.</p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">Made with ❤️ for food lovers</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
