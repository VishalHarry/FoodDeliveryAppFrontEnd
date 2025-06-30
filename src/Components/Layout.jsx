"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation, Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Header from "./Header"

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated && location.pathname !== "/login") {
      navigate("/login")
    }
  }, [location.pathname, navigate])

  if (location.pathname === "/login") {
    return <Outlet />
  }

  return (
    <div className="flex h-screen bg-bg-main">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-bg-main p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
