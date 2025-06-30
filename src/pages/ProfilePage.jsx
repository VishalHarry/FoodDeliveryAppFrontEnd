"use client"

import { useState } from "react"
import { User, Mail, Phone, Lock, Save, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@fooddelivery.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    joinDate: "2023-01-15",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    console.log("Updating profile:", profileData)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match")
      return
    }
    console.log("Updating password")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    navigate("/login")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary-dark">Admin Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-accent hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-4">
              <span className="text-white text-xl font-bold">
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary-dark">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.role}</p>
              <p className="text-sm text-gray-500">Member since {profileData.joinDate}</p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Update Profile</span>
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
          <div className="flex items-center mb-4">
            <Lock className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-primary-dark">Change Password</h2>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Current Password</label>
              <input
                type="password"
                required
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">New Password</label>
              <input
                type="password"
                required
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">Confirm New Password</label>
              <input
                type="password"
                required
                className="w-full border border-neutral rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-lg flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Change Password</span>
            </button>
          </form>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
        <h2 className="text-lg font-semibold text-primary-dark mb-4">Account Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-dark">365</div>
            <div className="text-sm text-gray-600">Days Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-dark">1,245</div>
            <div className="text-sm text-gray-600">Orders Managed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-dark">156</div>
            <div className="text-sm text-gray-600">Menu Items Added</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-dark">98.5%</div>
            <div className="text-sm text-gray-600">System Uptime</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral p-6">
        <h2 className="text-lg font-semibold text-primary-dark mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-bg-light rounded-lg">
            <div>
              <p className="text-sm font-medium text-primary-dark">Updated menu item: Margherita Pizza</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-bg-light rounded-lg">
            <div>
              <p className="text-sm font-medium text-primary-dark">Processed order #1234</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-bg-light rounded-lg">
            <div>
              <p className="text-sm font-medium text-primary-dark">Added new discount code: WELCOME10</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-bg-light rounded-lg">
            <div>
              <p className="text-sm font-medium text-primary-dark">Updated store opening hours</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
