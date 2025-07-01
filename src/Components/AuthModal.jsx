"use client"

import { useState } from "react"
import { X, Phone, ArrowRight } from "lucide-react"
import { useAuth } from "../context/AuthProvider"


const AuthModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1) // 1: phone, 2: otp
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setStep(2)
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock user data
    const userData = {
      id: 1,
      name: "John Doe",
      phone: phoneNumber,
      email: "john@example.com",
    }

    login(userData)
    setIsLoading(false)
    onClose()
    setStep(1)
    setPhoneNumber("")
    setOtp("")
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    alert("OTP sent successfully!")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">{step === 1 ? "Login" : "Verify OTP"}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 1 ? (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter your mobile number</h3>
                  <p className="text-gray-600 text-sm">We'll send you an OTP to verify your number</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 text-sm">+1</span>
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Enter your mobile number"
                      maxLength={10}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSendOTP}
                  disabled={isLoading || !phoneNumber}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isLoading || !phoneNumber
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transform hover:scale-105"
                  }`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Enter verification code</h3>
                  <p className="text-gray-600 text-sm">We've sent a 6-digit code to +1 {phoneNumber}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>

                <div className="text-center">
                  <button
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors duration-200"
                  >
                    Didn't receive code? Resend
                  </button>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVerifyOTP}
                    disabled={isLoading || !otp}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isLoading || !otp
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white transform hover:scale-105"
                    }`}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <span>Verify</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
