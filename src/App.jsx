import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import MenuPage from "./pages/MenuPage";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import DiscountsPage from "./pages/DiscountsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LandingPage from "./pages/LandingPage";



import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>

              {/* Landing Page with Navbar & Footer */}
              <Route
                path="/"
                element={
                  <>
                    <Navbar />
                    <LandingPage />
                    <Footer />
                  </>
                }
              />

              {/* Public pages with Navbar & Footer */}
              <Route
                path="/category/:categoryName"
                element={
                  <>
                    <Navbar />
                    <CategoryPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/product/:productId"
                element={
                  <>
                    <Navbar />
                    <ProductDetailsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <Navbar />
                    <AboutPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <Navbar />
                    <ContactPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/privacy"
                element={
                  <>
                    <Navbar />
                    <PrivacyPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blogs"
                element={
                  <>
                    <Navbar />
                    <BlogsPage />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/blogs/:blogSlug"
                element={
                  <>
                    <Navbar />
                    <BlogDetailsPage />
                    <Footer />
                  </>
                }
              />

              {/* Login page (without navbar/footer) */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected Admin/User layout */}
              <Route path="/layout" element={<Layout />}>
                <Route index element={<Navigate to="/layout/dashboard" replace />} />
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
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
