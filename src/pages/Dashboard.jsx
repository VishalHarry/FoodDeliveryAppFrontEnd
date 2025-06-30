"use client"

import { useState } from "react"
import { DollarSign, ShoppingBag, Clock, TrendingUp, AlertTriangle } from "lucide-react"

export default function Dashboard() {
  const [stats] = useState({
    todayRevenue: 2450.5,
    totalOrders: 156,
    pendingOrders: 12,
    completedOrders: 144,
  })

  const recentOrders = [
    { id: "#1234", customer: "John Smith", amount: 45.5, status: "preparing", time: "10:30 AM" },
    { id: "#1235", customer: "Sarah Johnson", amount: 32.75, status: "ready", time: "10:25 AM" },
    { id: "#1236", customer: "Mike Wilson", amount: 67.25, status: "delivered", time: "10:20 AM" },
    { id: "#1237", customer: "Emma Davis", amount: 28.5, status: "pending", time: "10:15 AM" },
  ]

  const popularDishes = [
    { name: "Margherita Pizza", sold: 45, image: "/placeholder.svg?height=50&width=50" },
    { name: "Chicken Burger", sold: 38, image: "/placeholder.svg?height=50&width=50" },
    { name: "Caesar Salad", sold: 32, image: "/placeholder.svg?height=50&width=50" },
    { name: "Pasta Carbonara", sold: 28, image: "/placeholder.svg?height=50&width=50" },
  ]

  const lowStockItems = [
    { name: "Pizza Dough", stock: 5, status: "critical" },
    { name: "Chicken Breast", stock: 12, status: "low" },
    { name: "Mozzarella Cheese", stock: 8, status: "critical" },
    { name: "Tomato Sauce", stock: 15, status: "low" },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStockStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "bg-accent text-white"
      case "low":
        return "bg-yellow-500 text-white"
      default:
        return "bg-green-500 text-white"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-dark">Dashboard</h1>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
              <p className="text-2xl font-bold text-primary-dark">${stats.todayRevenue}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+12.5%</span>
            <span className="text-gray-500 ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-primary-dark">{stats.totalOrders}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+8.2%</span>
            <span className="text-gray-500 ml-1">from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-primary-dark">{stats.pendingOrders}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Needs attention</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed Orders</p>
              <p className="text-2xl font-bold text-primary-dark">{stats.completedOrders}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-500">Today</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral">
          <div className="p-6 border-b border-neutral">
            <h2 className="text-lg font-semibold text-primary-dark">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-bg-light rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-primary-dark">{order.id}</span>
                      <span className="text-sm text-gray-500">{order.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-lg font-semibold text-primary">${order.amount}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <a href="/orders" className="text-primary hover:text-primary-dark font-medium text-sm">
                View all orders →
              </a>
            </div>
          </div>
        </div>

        {/* Popular Dishes */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral">
          <div className="p-6 border-b border-neutral">
            <h2 className="text-lg font-semibold text-primary-dark">Popular Dishes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {popularDishes.map((dish, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-primary-dark">{dish.name}</p>
                    <p className="text-sm text-gray-600">{dish.sold} sold today</p>
                  </div>
                  <div className="text-right">
                    <div className="w-16 bg-bg-light rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(dish.sold / 50) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral">
        <div className="p-6 border-b border-neutral">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-accent mr-2" />
            <h2 className="text-lg font-semibold text-primary-dark">Low Stock Alerts</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="p-4 bg-bg-light rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-primary-dark">{item.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{item.stock} units left</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
