"use client"

import { useState } from "react"
import { X, MapPin, CreditCard, User, Phone, ArrowLeft, ArrowRight } from "lucide-react"
import { useCart } from "../context/CartContext"

const CheckoutModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderData, setOrderData] = useState({
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      instructions: "",
    },
    payment: {
      method: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      nameOnCard: "",
    },
    contact: {
      name: "",
      phone: "",
      email: "",
    },
    otp: "",
  })

  const { items, getTotalPrice, clearCart } = useCart()

  const handleInputChange = (section, field, value) => {
    setOrderData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = () => {
    // Simulate order placement
    alert("Order placed successfully!")
    clearCart()
    onClose()
    setCurrentStep(1)
  }

  const steps = [
    { number: 1, title: "Address", icon: MapPin },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Contact", icon: User },
    { number: 4, title: "Confirm", icon: Phone },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= step.number ? "text-orange-500" : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-4 ${currentStep > step.number ? "bg-orange-500" : "bg-gray-300"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-96">
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      value={orderData.address.street}
                      onChange={(e) => handleInputChange("address", "street", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your street address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={orderData.address.city}
                      onChange={(e) => handleInputChange("address", "city", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={orderData.address.state}
                      onChange={(e) => handleInputChange("address", "state", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      value={orderData.address.zipCode}
                      onChange={(e) => handleInputChange("address", "zipCode", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="ZIP Code"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      value={orderData.address.instructions}
                      onChange={(e) => handleInputChange("address", "instructions", e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h3>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={orderData.payment.method === "card"}
                        onChange={(e) => handleInputChange("payment", "method", e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={orderData.payment.method === "cash"}
                        onChange={(e) => handleInputChange("payment", "method", e.target.value)}
                        className="text-orange-500 focus:ring-orange-500"
                      />
                      <span className="ml-2">Cash on Delivery</span>
                    </label>
                  </div>

                  {orderData.payment.method === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                        <input
                          type="text"
                          value={orderData.payment.nameOnCard}
                          onChange={(e) => handleInputChange("payment", "nameOnCard", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          value={orderData.payment.cardNumber}
                          onChange={(e) => handleInputChange("payment", "cardNumber", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={orderData.payment.expiryDate}
                          onChange={(e) => handleInputChange("payment", "expiryDate", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          value={orderData.payment.cvv}
                          onChange={(e) => handleInputChange("payment", "cvv", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-in slide-in-from-right duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={orderData.contact.name}
                      onChange={(e) => handleInputChange("contact", "name", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={orderData.contact.phone}
                      onChange={(e) => handleInputChange("contact", "phone", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={orderData.contact.email}
                      onChange={(e) => handleInputChange("contact", "email", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Confirmation</h3>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.cartId} className="flex justify-between text-sm">
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>${(item.discountedPrice * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>$2.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t border-gray-200">
                      <span>Total</span>
                      <span>${(getTotalPrice() + 2.99 + getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* OTP Verification */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP sent to {orderData.contact.phone}
                  </label>
                  <input
                    type="text"
                    value={orderData.otp}
                    onChange={(e) => setOrderData((prev) => ({ ...prev, otp: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                  />
                  <button className="text-orange-500 text-sm mt-2 hover:underline">Resend OTP</button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300"
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutModal
