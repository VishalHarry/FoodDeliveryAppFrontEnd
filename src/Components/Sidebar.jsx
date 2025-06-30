"use client"
import { useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Users,
  Percent,
  BarChart3,
  Settings,
  User,
  X,
  LogOut,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Menu", href: "/menu", icon: UtensilsCrossed },
  { name: "Orders", href: "/orders", icon: ShoppingBag },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Discounts", href: "/discounts", icon: Percent },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Profile", href: "/profile", icon: User },
]

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    navigate("/login")
  }

  const handleNavigation = (href) => {
    navigate(href)
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-primary">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">FD</span>
            </div>
            <span className="ml-3 text-white font-semibold">Food Delivery</span>
          </div>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "bg-accent-light text-primary-dark"
                        : "text-gray-700 hover:bg-bg-light hover:text-primary"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-bg-light hover:text-accent transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
