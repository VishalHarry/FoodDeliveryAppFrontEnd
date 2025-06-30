"use client"

import { useState } from "react"
import { Search, Eye, Phone, Mail, User } from "lucide-react"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCustomerHistory, setShowCustomerHistory] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  const customers = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      totalOrders: 15,
      totalSpent: 450.75,
      lastOrder: "2024-01-15",
      status: "active",
      orderHistory: [
        { id: "#1234", date: "2024-01-15", amount: 45.5, status: "delivered" },
        { id: "#1220", date: "2024-01-10", amount: 32.25, status: "delivered" },
        { id: "#1205", date: "2024-01-05", amount: 28.75, status: "delivered" },
      ],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 234-567-8901",
      totalOrders: 8,
      totalSpent: 245.5,
      lastOrder: "2024-01-14",
      status: "active",
      orderHistory: [
        { id: "#1235", date: "2024-01-14", amount: 32.75, status: "delivered" },
        { id: "#1215", date: "2024-01-08", amount: 45.25, status: "delivered" },
      ],
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+1 234-567-8902",
      totalOrders: 22,
      totalSpent: 675.25,
      lastOrder: "2024-01-13",
      status: "vip",
      orderHistory: [
        { id: "#1236", date: "2024-01-13", amount: 67.25, status: "delivered" },
        { id: "#1225", date: "2024-01-11", amount: 55.5, status: "delivered" },
        { id: "#1210", date: "2024-01-07", amount: 42.75, status: "delivered" },
      ],
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1 234-567-8903",
      totalOrders: 3,
      totalSpent: 85.5,
      lastOrder: "2024-01-12",
      status: "new",
      orderHistory: [
        { id: "#1237", date: "2024-01-12", amount: 28.5, status: "delivered" },
        { id: "#1200", date: "2024-01-01", amount: 35.75, status: "delivered" },
      ],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "vip":
        return "bg-purple-100 text-purple-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "new":
        return "bg-blue-100 text-blue-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const viewCustomerHistory = (customer) => {
    setSelectedCustomer(customer)
    setShowCustomerHistory(true)
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-dark">Customers Management</h1>
        <div className="text-sm text-gray-500">{customers.length} total customers</div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-10 pr-4 py-2 border border-neutral rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="border border-neutral rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
              <option value="all">All Status</option>
              <option value="vip">VIP</option>
              <option value="active">Active</option>
              <option value="new">New</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-primary-dark">{customers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">VIP Customers</p>
              <p className="text-2xl font-bold text-primary-dark">
                {customers.filter((c) => c.status === "vip").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Customers</p>
              <p className="text-2xl font-bold text-primary-dark">
                {customers.filter((c) => c.status === "new").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-primary-dark">
                {customers.filter((c) => c.status === "active").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral">
        <div className="p-6 border-b border-neutral">
          <h2 className="text-lg font-semibold text-primary-dark">Customers List</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-bg-light">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-primary-dark">{customer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        {customer.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{customer.totalOrders}</td>
                  <td className="px-6 py-4 text-sm font-medium text-primary">${customer.totalSpent}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}
                    >
                      {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{customer.lastOrder}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => viewCustomerHistory(customer)}
                      className="text-primary hover:text-primary-dark flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View History</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer History Modal */}
      {showCustomerHistory && selectedCustomer && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-neutral">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary-dark">Order History - {selectedCustomer.name}</h3>
                <button onClick={() => setShowCustomerHistory(false)} className="text-gray-400 hover:text-gray-600">
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Summary */}
              <div className="bg-bg-light p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-lg font-semibold text-primary-dark">{selectedCustomer.totalOrders}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-lg font-semibold text-primary">${selectedCustomer.totalSpent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedCustomer.status)}`}
                    >
                      {selectedCustomer.status.charAt(0).toUpperCase() + selectedCustomer.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Order</p>
                    <p className="text-sm text-gray-900">{selectedCustomer.lastOrder}</p>
                  </div>
                </div>
              </div>

              {/* Order History */}
              <div>
                <h4 className="font-semibold text-primary-dark mb-3">Recent Orders</h4>
                <div className="space-y-3">
                  {selectedCustomer.orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-bg-light rounded-lg">
                      <div>
                        <div className="font-medium text-primary-dark">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-primary">${order.amount}</div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOrderStatusColor(order.status)}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
