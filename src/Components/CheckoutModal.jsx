"use client"

import React, { useState } from "react"
import { X, ChevronDown, ChevronUp, Truck } from "lucide-react"

import AuthModal from "./AuthModal"
import { useAuth } from "../context/AuthProvider"

const CheckoutModal = ({ isOpen, onClose, cartTotal }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    landmark: "",
    houseNumber: "",
    city: "",
    state: "",
  })

  const { isAuthenticated } = useAuth()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleContinue = () => {
    if (!isAuthenticated && currentStep === 1) {
      setIsAuthModalOpen(true)
      return
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const steps = [
    { number: 1, title: "Mobile Number", active: currentStep >= 1 },
    { number: 2, title: "Address", active: currentStep >= 2 },
    { number: 3, title: "Payment", active: currentStep >= 3 },
  ]

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center space-x-2">
                {steps.map((step, index) => (
                  <React.Fragment key={step.number}>
                    <div className={`flex items-center space-x-2 ${step.active ? "text-orange-500" : "text-gray-400"}`}>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          step.active ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {step.number}
                      </div>
                      <span className="text-sm font-medium">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 ${step.active ? "bg-orange-500" : "bg-gray-200"}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Order Summary Header */}
            <div className="mb-6">
              <button
                onClick={() => setShowOrderSummary(!showOrderSummary)}
                className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>
                {showOrderSummary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {showOrderSummary && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-in slide-in-from-top-2 duration-200">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${(cartTotal - 2.99 - (cartTotal - 2.99) * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>$2.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${((cartTotal - 2.99) * 0.08).toFixed(2)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Authentication Step */}
            {!isAuthenticated && currentStep === 1 && (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold mb-4">Please Login to Continue</h3>
                <p className="text-gray-600 mb-6">We need to verify your mobile number to process your order</p>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                >
                  Login with Mobile Number
                </button>
              </div>
            )}

            {/* Address Form */}
            {(isAuthenticated || currentStep >= 2) && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Delivery Address</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                      placeholder="Enter your mobile number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                    placeholder="Enter your complete address"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Landmark</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                      placeholder="Nearby landmark"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">House Number & Street</label>
                    <input
                      type="text"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                      placeholder="House number and street name"
                    />
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="mt-6">
                  <h4 className="text-lg font-bold mb-4">Shipping Method</h4>
                  <div className="border border-gray-300 rounded-lg p-4 bg-green-50 ">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-6 h-6 text-green-600" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Free Shipping</span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Free</span>
                        </div>
                        <p className="text-sm text-gray-600">Earliest Delivery by 5 Jul, 9 AM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <button
              onClick={handleContinue}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 transform hover:scale-105"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false)
          setCurrentStep(2)
        }}
      />
    </>
  )
}

export default CheckoutModal
