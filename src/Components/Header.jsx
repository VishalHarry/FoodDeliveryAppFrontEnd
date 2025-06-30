"use client"

import { useState } from "react"
import { Menu, Bell, Search, ChevronDown } from "lucide-react"

export default function Header({ setSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const notifications = [
    { id: 1, message: "New order received #1234", time: "2 min ago", type: "order" },
    { id: 2, message: "Low stock alert: Pizza Margherita", time: "5 min ago", type: "stock" },
    { id: 3, message: "Payment received for order #1233", time: "10 min ago", type: "payment" },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-neutral">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden md:flex items-center ml-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders, customers..."
                className="pl-10 pr-4 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              className="relative p-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-accent rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-neutral z-50">
                <div className="p-4 border-b border-neutral">
                  <h3 className="font-semibold text-primary-dark">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-neutral hover:bg-bg-light">
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-bg-light"
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <span className="hidden md:block text-sm font-medium text-primary-dark">John Doe</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral z-50">
                <div className="p-2">
                  <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-bg-light rounded">
                    Profile Settings
                  </a>
                  <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-bg-light rounded">
                    Store Settings
                  </a>
                  <hr className="my-2 border-neutral" />
                  <button className="block w-full text-left px-4 py-2 text-sm text-accent hover:bg-bg-light rounded">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
