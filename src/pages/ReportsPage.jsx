"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const salesData = [
    { name: "Mon", sales: 2400, orders: 24 },
    { name: "Tue", sales: 1398, orders: 18 },
    { name: "Wed", sales: 9800, orders: 45 },
    { name: "Thu", sales: 3908, orders: 32 },
    { name: "Fri", sales: 4800, orders: 38 },
    { name: "Sat", sales: 3800, orders: 35 },
    { name: "Sun", sales: 4300, orders: 41 },
  ]

  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 15000 },
    { month: "Mar", revenue: 18000 },
    { month: "Apr", revenue: 22000 },
    { month: "May", revenue: 25000 },
    { month: "Jun", revenue: 28000 },
  ]

  const topSellingItems = [
    { name: "Margherita Pizza", sold: 145, revenue: 2755.5 },
    { name: "Chicken Burger", sold: 128, revenue: 1919.72 },
    { name: "Caesar Salad", sold: 95, revenue: 1234.05 },
    { name: "Pasta Carbonara", sold: 87, revenue: 1478.13 },
    { name: "Pepperoni Pizza", sold: 76, revenue: 1596.24 },
  ]

  const categoryData = [
    { name: "Pizza", value: 45, color: "#964f52" },
    { name: "Burgers", value: 25, color: "#e82630" },
    { name: "Salads", value: 15, color: "#e8d1d1" },
    { name: "Pasta", value: 10, color: "#f2e8e8" },
    { name: "Desserts", value: 5, color: "#e5e8eb" },
  ]

  const stats = [
    {
      title: "Total Revenue",
      value: "$28,450",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Orders",
      value: "1,245",
      change: "+8.2%",
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "New Customers",
      value: "156",
      change: "+15.3%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg Order Value",
      value: "$22.85",
      change: "+4.1%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-dark">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <select
            className="border border-neutral rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-neutral p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-primary-dark">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">{stat.change}</span>
              <span className="text-gray-500 ml-1">from last period</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <h2 className="text-lg font-semibold text-primary-dark mb-4">Daily Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#964f52" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <h2 className="text-lg font-semibold text-primary-dark mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#964f52" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <h2 className="text-lg font-semibold text-primary-dark mb-4">Top Selling Items</h2>
          <div className="space-y-4">
            {topSellingItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-bg-light rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-primary-dark">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.sold} sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">${item.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <h2 className="text-lg font-semibold text-primary-dark mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral">
        <div className="p-6 border-b border-neutral">
          <h2 className="text-lg font-semibold text-primary-dark">Detailed Analytics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metric
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Today
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yesterday
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  This Week
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Week
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral">
              <tr className="hover:bg-bg-light">
                <td className="px-6 py-4 text-sm font-medium text-primary-dark">Revenue</td>
                <td className="px-6 py-4 text-sm text-gray-900">$2,450</td>
                <td className="px-6 py-4 text-sm text-gray-900">$2,180</td>
                <td className="px-6 py-4 text-sm text-gray-900">$15,680</td>
                <td className="px-6 py-4 text-sm text-gray-900">$13,920</td>
                <td className="px-6 py-4 text-sm text-green-600">+12.6%</td>
              </tr>
              <tr className="hover:bg-bg-light">
                <td className="px-6 py-4 text-sm font-medium text-primary-dark">Orders</td>
                <td className="px-6 py-4 text-sm text-gray-900">156</td>
                <td className="px-6 py-4 text-sm text-gray-900">142</td>
                <td className="px-6 py-4 text-sm text-gray-900">1,045</td>
                <td className="px-6 py-4 text-sm text-gray-900">965</td>
                <td className="px-6 py-4 text-sm text-green-600">+8.3%</td>
              </tr>
              <tr className="hover:bg-bg-light">
                <td className="px-6 py-4 text-sm font-medium text-primary-dark">Avg Order Value</td>
                <td className="px-6 py-4 text-sm text-gray-900">$15.71</td>
                <td className="px-6 py-4 text-sm text-gray-900">$15.35</td>
                <td className="px-6 py-4 text-sm text-gray-900">$15.01</td>
                <td className="px-6 py-4 text-sm text-gray-900">$14.43</td>
                <td className="px-6 py-4 text-sm text-green-600">+4.0%</td>
              </tr>
              <tr className="hover:bg-bg-light">
                <td className="px-6 py-4 text-sm font-medium text-primary-dark">New Customers</td>
                <td className="px-6 py-4 text-sm text-gray-900">23</td>
                <td className="px-6 py-4 text-sm text-gray-900">18</td>
                <td className="px-6 py-4 text-sm text-gray-900">145</td>
                <td className="px-6 py-4 text-sm text-gray-900">126</td>
                <td className="px-6 py-4 text-sm text-green-600">+15.1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
