"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { useAuth } from "../context/AuthProvider"


const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1) // 1: mobile, 2: otp
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()

  const handleSendOTP = async () => {
    if (mobile.length < 10) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 1000)
  }

  const handleVerifyOTP = async () => {
    if (otp.length < 4) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      login({ mobile, name: "User" })
      onClose()
      if (onSuccess) onSuccess()
      setStep(1)
      setMobile("")
      setOtp("")
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{step === 1 ? "Login with Mobile" : "Verify OTP"}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
                  placeholder="Enter your mobile number"
                  maxLength={10}
                />
              </div>
              <button
                onClick={handleSendOTP}
                disabled={mobile.length < 10 || isLoading}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">We've sent a verification code to {mobile}</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200 text-center text-2xl tracking-widest"
                  placeholder="----"
                  maxLength={4}
                />
              </div>
              <button
                onClick={handleVerifyOTP}
                disabled={otp.length < 4 || isLoading}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full py-2 text-orange-500 hover:text-orange-600 transition-colors duration-200"
              >
                Change Mobile Number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthModal
