import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../shared/store/authStore";
import { useAuthSync } from "../shared/hooks/useAuthSync";
import Loading from "../components/ui/Loading/Loading.jsx";
import PrivateRoute from "./PrivateRoutes.jsx";
import PublicRoute from "./PublicRoutes.jsx";

// Page imports
import Dashboard from "../pages/User/Dashboard.jsx";
import LoginPage from "../pages/public/auth/LoginPage.jsx";
import RegisterPage from "../pages/public/auth/RegisterPage.jsx";
import Profile from "../pages/User/profile/Profile.jsx";
import MyClasses from "../pages/User/MyClasses.jsx";
import MyPackage from "../pages/User/MyPackage.jsx";
import BuyPackage from "../pages/User/BuyPackage";
import PackageDetail from "../pages/User/PackageDetail";
import Admin from "../pages/Admin/Admin";
import User from "../pages/User/User";
import Members from "../pages/User/Members.jsx";

// Public page imports
import Home from "../pages/public/Home/Home";
import About from "../pages/public/About/About";
import Classes from "../pages/public/Classes/Classes";
import ClassDetail from "../pages/public/ClassDetail/ClassDetail";
import Trainer from "../pages/public/Trainer/Trainer";
import Contact from "../pages/public/Contact/Contact";
import Blog from "../pages/public/Blog/Blog";
import BlogDetail from "../pages/public/Blog/BlogDetail.jsx";
import BookTrial from "../pages/public/BookTrial/BookTrial";

// Simple PrivateRoute for BuyPackage (no layout)
const BuyPackageRoute = ({ children }) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore?.isAuthenticated || false;
  const isLoading = authStore?.isLoading || false;
  const isSyncingPurchaseStatus = authStore?.isSyncingPurchaseStatus || false;
  const hasPurchasedPackage = authStore?.hasPurchasedPackage || (() => false);

  // Sync data dengan backend
  useAuthSync();

  console.log('🛣️ BuyPackageRoute Debug:', {
    isAuthenticated,
    isLoading,
    isSyncingPurchaseStatus,
    hasPurchasedPackage: hasPurchasedPackage(),
    user: authStore?.user,
    userHasPackage: authStore?.user?.has_purchased_package
  });

  if (isLoading || isSyncingPurchaseStatus) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🔒 User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (hasPurchasedPackage()) {
    console.log('✅ User has package, redirecting to dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('✅ User can access buy-package');
  return children;
};

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const authStore = useAuthStore();
  const isLoading = authStore?.isLoading || false;
  const isAuthenticated = authStore?.isAuthenticated || false;
  const user = authStore?.user || null;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
        <Route 
          path="/about" 
          element={
            <PublicRoute>
          <About />
            </PublicRoute>
          } 
        />
        <Route 
          path="/classes" 
          element={
            <PublicRoute>
          <Classes />
            </PublicRoute>
          } 
        />
        <Route 
          path="/classes/:classType" 
          element={
            <PublicRoute>
          <ClassDetail />
            </PublicRoute>
          } 
        />
        <Route 
          path="/trainer" 
          element={
            <PublicRoute>
          <Trainer />
            </PublicRoute>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <PublicRoute>
          <Contact />
            </PublicRoute>
          } 
        />
        <Route 
          path="/blog" 
          element={
            <PublicRoute>
          <Blog />
            </PublicRoute>
          } 
        />
        <Route
          path="/blog/:id"
          element={
            <PublicRoute>
              <BlogDetail />
            </PublicRoute>
          }
        />
        <Route 
          path="/book-trial" 
          element={
            <PublicRoute>
          <BookTrial />
            </PublicRoute>
          } 
        />
        <Route 
          path="/login" 
          element={
            <PublicRoute>
          <LoginPage />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
          <RegisterPage />
            </PublicRoute>
          } 
        />
        
        {/* Auth Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />

      {/* Admin Routes - Must come before user routes */}
      <Route element={<PrivateRoute requireAdmin={true} />}>
        <Route path="/admin/*" element={<Admin />} />
      </Route>

      {/* Private Routes - User Dashboard */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-classes" element={<MyClasses />} />
        <Route path="/my-package" element={<MyPackage />} />
        <Route path="/package/:id" element={<PackageDetail />} />
        <Route path="/user" element={<User />} />
        <Route path="/members" element={<Members />} />
      </Route>

      {/* Payment Finish Redirect Route */}
      <Route 
        path="/payment/finish" 
        element={
          <BuyPackageRoute>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Memproses hasil pembayaran...</p>
                <p className="text-sm text-gray-500 mt-2">Mengarahkan ke dashboard...</p>
              </div>
            </div>
          </BuyPackageRoute>
        } 
      />

      {/* Buy Package Route - Special route for users without package */}
      <Route 
        path="/buy-package" 
        element={
          <BuyPackageRoute>
            <BuyPackage />
          </BuyPackageRoute>
        } 
      />
      <Route 
        path="/buy-package/:id" 
        element={
          <BuyPackageRoute>
            <PackageDetail />
          </BuyPackageRoute>
        } 
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
