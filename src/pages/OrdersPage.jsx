"use client"

import { useState } from "react"
import { Eye, Search } from "lucide-react"

export default function OrdersPage() {
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDate, setSelectedDate] = useState("today")
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const orders = [
    {
      id: "#1234",
      customer: "John Smith",
      phone: "+1 234-567-8900",
      email: "john@example.com",
      items: [
        { name: "Margherita Pizza", quantity: 2, price: 18.99 },
        { name: "Coke", quantity: 2, price: 2.99 },
      ],
      total: 43.97,
      status: "preparing",
      paymentStatus: "paid",
      orderTime: "10:30 AM",
      deliveryAddress: "123 Main St, City, State 12345",
    },
    {
      id: "#1235",
      customer: "Sarah Johnson",
      phone: "+1 234-567-8901",
      email: "sarah@example.com",
      items: [
        { name: "Chicken Burger", quantity: 1, price: 14.99 },
        { name: "Fries", quantity: 1, price: 4.99 },
      ],
      total: 19.98,
      status: "ready",
      paymentStatus: "paid",
      orderTime: "10:25 AM",
      deliveryAddress: "456 Oak Ave, City, State 12345",
    },
    {
      id: "#1236",
      customer: "Mike Wilson",
      phone: "+1 234-567-8902",
      email: "mike@example.com",
      items: [
        { name: "Caesar Salad", quantity: 1, price: 12.99 },
        { name: "Garlic Bread", quantity: 1, price: 5.99 },
      ],
      total: 18.98,
      status: "delivered",
      paymentStatus: "paid",
      orderTime: "10:20 AM",
      deliveryAddress: "789 Pine St, City, State 12345",
    },
  ]

  const statusOptions = [
    { value: "received", label: "Received", color: "bg-blue-100 text-blue-800" },
    { value: "preparing", label: "Preparing", color: "bg-yellow-100 text-yellow-800" },
    { value: "ready", label: "Ready", color: "bg-green-100 text-green-800" },
    { value: "out-for-delivery", label: "Out for Delivery", color: "bg-purple-100 text-purple-800" },
    { value: "delivered", label: "Delivered", color: "bg-gray-100 text-gray-800" },
    { value: "canceled", label: "Canceled", color: "bg-red-100 text-red-800" },
  ]

  const getStatusColor = (status) => {
    const statusOption = statusOptions.find((option) => option.value === status)
    return statusOption ? statusOption.color : "bg-gray-100 text-gray-800"
  }

  const updateOrderStatus = (orderId, newStatus) => {
    console.log(`Updating order ${orderId} to ${newStatus}`)
  }

  const viewOrderDetails = (order) => {
    setSelectedOrder(order)
    setShowOrderDetails(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-dark">Orders Management</h1>
        <div className="text-sm text-gray-500">{orders.length} orders today</div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <select
              className="border border-neutral rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              className="border border-neutral rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral">
        <div className="p-6 border-b border-neutral">
          <h2 className="text-lg font-semibold text-primary-dark">Orders List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-bg-light">
                  <td className="px-6 py-4 text-sm font-medium text-primary-dark">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-primary-dark">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">${order.total}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <select
                        className="text-xs border border-neutral rounded px-2 py-1"
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.orderTime}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => viewOrderDetails(order)}
                      className="text-primary hover:text-primary-dark flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-neutral">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary-dark">Order Details - {selectedOrder.id}</h3>
                <button onClick={() => setShowOrderDetails(false)} className="text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-semibold text-primary-dark mb-3">Customer Information</h4>
                <div className="bg-bg-light p-4 rounded-lg">
                  <p>
                    <span className="font-medium">Name:</span> {selectedOrder.customer}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {selectedOrder.phone}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {selectedOrder.email}
                  </p>
                  <p>
                    <span className="font-medium">Address:</span> {selectedOrder.deliveryAddress}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold text-primary-dark mb-3">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-bg-light rounded-lg">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-medium text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 bg-primary text-white rounded-lg font-semibold">
                    <span>Total</span>
                    <span>${selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-primary-dark mb-2">Order Status</h4>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}
                  >
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-dark mb-2">Payment Status</h4>
                  <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                    {selectedOrder.paymentStatus.charAt(0).toUpperCase() + selectedOrder.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
