"use client"

import { useState } from "react"
import { Save, Clock, MapPin, Mail, CreditCard, Smartphone } from "lucide-react"

export default function SettingsPage() {
  const [storeInfo, setStoreInfo] = useState({
    name: "Food Delivery Store",
    address: "123 Main Street, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "info@fooddelivery.com",
    description: "Fresh food delivered to your door",
  })

  const [openingHours, setOpeningHours] = useState({
    monday: { open: "09:00", close: "22:00", closed: false },
    tuesday: { open: "09:00", close: "22:00", closed: false },
    wednesday: { open: "09:00", close: "22:00", closed: false },
    thursday: { open: "09:00", close: "22:00", closed: false },
    friday: { open: "09:00", close: "23:00", closed: false },
    saturday: { open: "10:00", close: "23:00", closed: false },
    sunday: { open: "10:00", close: "21:00", closed: false },
  })

  const [deliverySettings, setDeliverySettings] = useState({
    freeDeliveryThreshold: 25,
    deliveryFee: 3.99,
    maxDeliveryDistance: 10,
    estimatedDeliveryTime: 30,
  })

  const [paymentMethods, setPaymentMethods] = useState({
    cod: true,
    creditCard: true,
    debitCard: true,
    digitalWallet: true,
    bankTransfer: false,
  })

  const handleStoreInfoSubmit = (e) => {
    e.preventDefault()
    console.log("Updating store info:", storeInfo)
  }

  const handleOpeningHoursSubmit = (e) => {
    e.preventDefault()
    console.log("Updating opening hours:", openingHours)
  }

  const handleDeliverySettingsSubmit = (e) => {
    e.preventDefault()
    console.log("Updating delivery settings:", deliverySettings)
  }

  const handlePaymentMethodsSubmit = (e) => {
    e.preventDefault()
    console.log("Updating payment methods:", paymentMethods)
  }

  const updateOpeningHours = (day, field, value) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }))
  }

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-dark">Store Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Information */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center mb-4">
            <MapPin className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-primary-dark">Store Information</h2>
          </div>
          <form onSubmit={handleStoreInfoSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Store Name</label>
              <input
                type="text"
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={storeInfo.name}
                onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Address</label>
              <textarea
                rows={3}
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={storeInfo.address}
                onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={storeInfo.phone}
                onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Email</label>
              <input
                type="email"
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={storeInfo.email}
                onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Description</label>
              <textarea
                rows={3}
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={storeInfo.description}
                onChange={(e) => setStoreInfo({ ...storeInfo, description: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Store Information</span>
            </button>
          </form>
        </div>

        {/* Opening Hours */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-primary-dark">Opening Hours</h2>
          </div>
          <form onSubmit={handleOpeningHoursSubmit} className="space-y-4">
            {days.map((day) => (
              <div key={day.key} className="flex items-center space-x-4">
                <div className="w-20">
                  <span className="text-sm font-medium text-primary-dark">{day.label}</span>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <input
                    type="checkbox"
                    checked={!openingHours[day.key].closed}
                    onChange={(e) => updateOpeningHours(day.key, "closed", !e.target.checked)}
                    className="rounded border-neutral text-primary focus:ring-primary"
                  />
                  {!openingHours[day.key].closed ? (
                    <>
                      <input
                        type="time"
                        className="border border-neutral rounded px-2 py-1 text-sm"
                        value={openingHours[day.key].open}
                        onChange={(e) => updateOpeningHours(day.key, "open", e.target.value)}
                      />
                      <span className="text-sm text-gray-500">to</span>
                      <input
                        type="time"
                        className="border border-neutral rounded px-2 py-1 text-sm"
                        value={openingHours[day.key].close}
                        onChange={(e) => updateOpeningHours(day.key, "close", e.target.value)}
                      />
                    </>
                  ) : (
                    <span className="text-sm text-gray-500">Closed</span>
                  )}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Opening Hours</span>
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center mb-4">
            <Smartphone className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-primary-dark">Delivery Settings</h2>
          </div>
          <form onSubmit={handleDeliverySettingsSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Free Delivery Threshold ($)</label>
              <input
                type="number"
                step="0.01"
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={deliverySettings.freeDeliveryThreshold}
                onChange={(e) =>
                  setDeliverySettings({ ...deliverySettings, freeDeliveryThreshold: Number.parseFloat(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Delivery Fee ($)</label>
              <input
                type="number"
                step="0.01"
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={deliverySettings.deliveryFee}
                onChange={(e) =>
                  setDeliverySettings({ ...deliverySettings, deliveryFee: Number.parseFloat(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Max Delivery Distance (miles)</label>
              <input
                type="number"
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={deliverySettings.maxDeliveryDistance}
                onChange={(e) =>
                  setDeliverySettings({ ...deliverySettings, maxDeliveryDistance: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                Estimated Delivery Time (minutes)
              </label>
              <input
                type="number"
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={deliverySettings.estimatedDeliveryTime}
                onChange={(e) =>
                  setDeliverySettings({ ...deliverySettings, estimatedDeliveryTime: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Delivery Settings</span>
            </button>
          </form>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center mb-4">
            <CreditCard className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-primary-dark">Payment Methods</h2>
          </div>
          <form onSubmit={handlePaymentMethodsSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-dark">Cash on Delivery (COD)</span>
                <input
                  type="checkbox"
                  checked={paymentMethods.cod}
                  onChange={(e) => setPaymentMethods({ ...paymentMethods, cod: e.target.checked })}
                  className="rounded border-neutral text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-dark">Credit Card</span>
                <input
                  type="checkbox"
                  checked={paymentMethods.creditCard}
                  onChange={(e) => setPaymentMethods({ ...paymentMethods, creditCard: e.target.checked })}
                  className="rounded border-neutral text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-dark">Debit Card</span>
                <input
                  type="checkbox"
                  checked={paymentMethods.debitCard}
                  onChange={(e) => setPaymentMethods({ ...paymentMethods, debitCard: e.target.checked })}
                  className="rounded border-neutral text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-dark">Digital Wallet</span>
                <input
                  type="checkbox"
                  checked={paymentMethods.digitalWallet}
                  onChange={(e) => setPaymentMethods({ ...paymentMethods, digitalWallet: e.target.checked })}
                  className="rounded border-neutral text-primary focus:ring-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-dark">Bank Transfer</span>
                <input
                  type="checkbox"
                  checked={paymentMethods.bankTransfer}
                  onChange={(e) => setPaymentMethods({ ...paymentMethods, bankTransfer: e.target.checked })}
                  className="rounded border-neutral text-primary focus:ring-primary"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Payment Methods</span>
            </button>
          </form>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
        <div className="flex items-center mb-4">
          <Mail className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-primary-dark">Promotional Notifications</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-primary-dark mb-3">Send SMS Campaign</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Enter your promotional message..."
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg">
                Send SMS to All Customers
              </button>
            </form>
          </div>
          <div>
            <h3 className="font-medium text-primary-dark mb-3">Send Email Campaign</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Subject</label>
                <input
                  type="text"
                  placeholder="Email subject..."
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">Message</label>
                <textarea
                  rows={3}
                  placeholder="Enter your email message..."
                  className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg">
                Send Email to All Customers
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
