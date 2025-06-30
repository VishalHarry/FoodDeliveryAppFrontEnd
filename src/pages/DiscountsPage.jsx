"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar, Percent } from "lucide-react"

export default function DiscountsPage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    code: "",
    percentage: "",
    minOrderValue: "",
    expirationDate: "",
    isActive: true,
  })

  const discounts = [
    {
      id: 1,
      code: "WELCOME10",
      percentage: 10,
      minOrderValue: 25,
      expirationDate: "2024-02-15",
      isActive: true,
      usedCount: 45,
      maxUses: 100,
    },
    {
      id: 2,
      code: "PIZZA20",
      percentage: 20,
      minOrderValue: 30,
      expirationDate: "2024-01-31",
      isActive: true,
      usedCount: 23,
      maxUses: 50,
    },
    {
      id: 3,
      code: "FIRSTORDER",
      percentage: 15,
      minOrderValue: 20,
      expirationDate: "2024-03-01",
      isActive: false,
      usedCount: 12,
      maxUses: 200,
    },
    {
      id: 4,
      code: "WEEKEND25",
      percentage: 25,
      minOrderValue: 40,
      expirationDate: "2024-02-28",
      isActive: true,
      usedCount: 8,
      maxUses: 30,
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Adding new discount:", formData)
    setShowAddForm(false)
    setFormData({
      code: "",
      percentage: "",
      minOrderValue: "",
      expirationDate: "",
      isActive: true,
    })
  }

  const toggleDiscountStatus = (id) => {
    console.log("Toggling discount status for:", id)
  }

  const deleteDiscount = (id) => {
    console.log("Deleting discount:", id)
  }

  const getStatusColor = (isActive, expirationDate) => {
    if (!isActive) return "bg-gray-100 text-gray-800"
    const expDate = new Date(expirationDate)
    const today = new Date()
    if (expDate < today) return "bg-red-100 text-red-800"
    return "bg-green-100 text-green-800"
  }

  const getStatusText = (isActive, expirationDate) => {
    if (!isActive) return "Inactive"
    const expDate = new Date(expirationDate)
    const today = new Date()
    if (expDate < today) return "Expired"
    return "Active"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-dark">Discounts Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Discount</span>
        </button>
      </div>

      {/* Discount Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Discounts</p>
              <p className="text-2xl font-bold text-primary-dark">
                {discounts.filter((d) => d.isActive && new Date(d.expirationDate) > new Date()).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Discounts</p>
              <p className="text-2xl font-bold text-primary-dark">{discounts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-primary-dark">
                {
                  discounts.filter((d) => {
                    const expDate = new Date(d.expirationDate)
                    const weekFromNow = new Date()
                    weekFromNow.setDate(weekFromNow.getDate() + 7)
                    return expDate <= weekFromNow && expDate > new Date()
                  }).length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Uses</p>
              <p className="text-2xl font-bold text-primary-dark">
                {discounts.reduce((sum, d) => sum + d.usedCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Discounts Table */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral">
        <div className="p-6 border-b border-neutral">
          <h2 className="text-lg font-semibold text-primary-dark">Discount Codes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Min Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral">
              {discounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-bg-light">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-primary-dark">{discount.code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-primary">{discount.percentage}%</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">${discount.minOrderValue}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {discount.usedCount}/{discount.maxUses}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(discount.usedCount / discount.maxUses) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{discount.expirationDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(discount.isActive, discount.expirationDate)}`}
                    >
                      {getStatusText(discount.isActive, discount.expirationDate)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleDiscountStatus(discount.id)}
                        className="text-primary hover:text-primary-dark"
                      >
                        {discount.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button className="text-primary hover:text-primary-dark">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteDiscount(discount.id)} className="text-accent hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Discount Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="p-6 border-b border-neutral">
              <h3 className="text-lg font-semibold text-primary-dark">Add New Discount</h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Discount Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., SAVE20"
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Discount Percentage</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  placeholder="10"
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.percentage}
                  onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Minimum Order Value</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="25.00"
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.minOrderValue}
                  onChange={(e) => setFormData({ ...formData, minOrderValue: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Expiration Date</label>
                <input
                  type="date"
                  required
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.expirationDate}
                  onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-neutral text-primary focus:ring-primary"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-primary-dark">
                  Active
                </label>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-neutral rounded-lg text-gray-700 hover:bg-bg-light"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg">
                  Add Discount
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
