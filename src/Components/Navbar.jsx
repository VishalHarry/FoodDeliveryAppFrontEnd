"use client"

import { useState, useRef, useEffect } from "react"
import { Search, User, ShoppingCart, ChevronDown, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthProvider"
import CartModal from "./CartModal"
import AuthModal from "./AuthModal"
import axios from "axios"

const Navbar = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isUserOpen, setIsUserOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const { getTotalItems } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const categoryRef = useRef(null)
  const moreRef = useRef(null)
  const userRef = useRef(null)

  
  const moreLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy & Policy", href: "/privacy" },
    { name: "Blogs", href: "/blogs" },
  ]
const [categories,setCategories]=useState([]);

  useEffect(()=>{
    const fetchdata= async ()=>{
try {
  const response= await axios.get("http://localhost:8080/api/category/getCategory")
  const categoriesWithSlug = response.data.map((cat) => ({
  ...cat,
  slug: cat.name.toLowerCase().replace(/\s+/g, "-"), // 👈 naam ko slug me convert kiya
}));
setCategories(categoriesWithSlug);
console.log(categoriesWithSlug);
  
} catch (error) {
  console.log("Error fetching categories:", error);
  
}
}
fetchdata();
  },[])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false)
      }
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false)
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const clearSearch = () => {
    setSearchValue("")
  }

  const handleUserAction = (action) => {
    if (action === "login") {
      setIsAuthOpen(true)
    } else if (action === "logout") {
      logout()
    }
    setIsUserOpen(false)
  }

  const handleCategoryClick = (categorySlug) => {
    navigate(`/category/${categorySlug}`)
    setIsCategoryOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-800">FoodieApp</span>
              </Link>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Categories Dropdown */}
              <div className="relative" ref={categoryRef}>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isCategoryOpen && (
                  <div className="absolute top-full left-0 mt-2  w-[500px] bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryClick(category.slug)}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-150 w-full text-left"
                        >
                          <img
                            src={category.imageUrl || "/placeholder.svg"}
                            alt={category.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-gray-700 hover:text-orange-500">{category.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>


                )}
              </div>

              {/* More Dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isMoreOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors duration-150"
                        onClick={() => setIsMoreOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Box */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  placeholder="Search for dishes or restaurants..."
                />
                {searchValue && (
                  <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-150" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* User Dropdown */}
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setIsUserOpen(!isUserOpen)}
                  className="p-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
                >
                  <User className="w-6 h-6" />
                </button>

                {isUserOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                    {!isAuthenticated ? (
                      <button
                        onClick={() => handleUserAction("login")}
                        className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors duration-150"
                      >
                        Login with Mobile Number
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/account"
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors duration-150"
                          onClick={() => setIsUserOpen(false)}
                        >
                          My Account
                        </Link>
                        <button
                          onClick={() => handleUserAction("logout")}
                          className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-orange-500 transition-colors duration-150"
                        >
                          Logout
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden px-4 pb-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex-1 text-center py-2 text-gray-700 hover:text-orange-500"
            >
              Categories
            </button>
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="flex-1 text-center py-2 text-gray-700 hover:text-orange-500"
            >
              More
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  )
}

export default Navbar
