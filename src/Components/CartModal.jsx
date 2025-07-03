"use client"

import { useState } from "react"
import { X, Plus, Minus, ChevronUp, ChevronDown } from "lucide-react"
import { useCart } from "../context/CartContext"
import CheckoutModal from "./CheckoutModal"

const CartModal = ({ isOpen, onClose }) => {
  const [showCouponInput, setShowCouponInput] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart()

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId)
    } else {
      updateQuantity(cartId, newQuantity)
    }
  }

  const applyCoupon = () => {
    // Coupon logic here
    console.log("Applying coupon:", couponCode)
    setShowCouponInput(false)
    setCouponCode("")
  }

  const handlePayNow = () => {
    setIsCheckoutOpen(true)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-2xl">🛒</span>
                  </div>
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.imageUrl || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        {item.variant && (
                          <p className="text-sm text-gray-500">
                            {Object.entries(item.variant)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(", ")}
                          </p>
                        )}
                        <p className="text-orange-500 font-semibold">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 space-y-4">
                {/* Coupon Section */}
                <div>
                  <button
                    onClick={() => setShowCouponInput(!showCouponInput)}
                    className="flex items-center justify-between w-full text-left text-orange-500 font-medium"
                  >
                    <span>Apply Coupon</span>
                    {showCouponInput ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showCouponInput && (
                    <div className="mt-2 flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div>
                  <button
                    onClick={() => setShowOrderSummary(!showOrderSummary)}
                    className="flex items-center justify-between w-full text-left font-medium text-gray-800"
                  >
                    <span>Order Summary</span>
                    {showOrderSummary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {showOrderSummary && (
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>$2.99</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(getTotalPrice() + 2.99 + getTotalPrice() * 0.08).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Total and Pay Button */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total: ${(getTotalPrice() + 2.99 + getTotalPrice() * 0.08).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handlePayNow}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  )
}

export default CartModal
