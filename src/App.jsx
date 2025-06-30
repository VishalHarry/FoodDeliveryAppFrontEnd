import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import MenuPage from "./pages/MenuPage"
import OrdersPage from "./pages/OrdersPage"
import CustomersPage from "./pages/CustomersPage"
import DiscountsPage from "./pages/DiscountsPage"
import ReportsPage from "./pages/ReportsPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import "./App.css"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
     <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="discounts" element={<DiscountsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
        <ToastContainer
        position="top-right"
        autoClose={3000} // time in ms
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // or "dark"
      />
      </div>
    </Router>
      
    </>
   
  )
}

export default App
