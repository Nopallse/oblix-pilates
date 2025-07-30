import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../shared/store/authStore";
import { useAuthSync } from "../shared/hooks/useAuthSync";
import Loading from "../components/ui/Loading/Loading.jsx";
import PrivateRoute from "./PrivateRoutes.jsx";
import PublicRoute from "./PublicRoutes.jsx";
import FlexibleLayout from "../components/layout/FlexibleLayout";

// Page imports
import CheckClass from "../pages/User/CheckClass.jsx";
import LoginPage from "../pages/public/auth/LoginPage.jsx";
import RegisterPage from "../pages/public/auth/RegisterPage.jsx";
import Profile from "../pages/User/profile/Profile.jsx";
import MyClasses from "../pages/User/MyClasses/MyClasses.jsx";
import MyPackage from "../pages/User/MyPackage";
import BuyPackage from "../pages/User/BuyPackage";
import PackageDetail from "../pages/User/PackageDetail";
import Admin from "../pages/Admin/Admin";
import User from "../pages/User/User";
import Members from "../pages/User/Members.jsx";
import MemberDetail from "@pages/Admin/Member/MemberDetail";

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

  // Listen for token updates from apiClient
  useEffect(() => {
    const handleTokenUpdate = (event) => {
      console.log('📡 Received auth-token-updated event:', event.detail);
      authStore.syncTokenFromStorage();
    };

    window.addEventListener('auth-token-updated', handleTokenUpdate);
    
    return () => {
      window.removeEventListener('auth-token-updated', handleTokenUpdate);
    };
  }, [authStore]);

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

      {/* All Private Routes with FlexibleLayout */}
      <Route element={<PrivateRoute />}>
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <FlexibleLayout>
            <Admin />
          </FlexibleLayout>
        } />
        
        {/* User Routes */}
        <Route path="/check-class" element={
          <FlexibleLayout>
            <CheckClass />
          </FlexibleLayout>
        } />
        <Route path="/profile" element={
          <FlexibleLayout>
            <Profile />
          </FlexibleLayout>
        } />
        <Route path="/my-classes" element={
          <FlexibleLayout>
            <MyClasses />
          </FlexibleLayout>
        } />
        <Route path="/my-package" element={
          <FlexibleLayout>
            <MyPackage />
          </FlexibleLayout>
        } />
        <Route path="/user" element={
          <FlexibleLayout>
            <User />
          </FlexibleLayout>
        } />
        <Route path="/members" element={
          <FlexibleLayout>
            <Members />
          </FlexibleLayout>
        } />
        <Route path="/admin/member/:id" element={
          <FlexibleLayout>
            <MemberDetail />
          </FlexibleLayout>
        } />
        <Route path="/buy-package" element={
          <FlexibleLayout>
            <BuyPackage />
          </FlexibleLayout>
        } />
        <Route path="/buy-package/:id" element={
          <FlexibleLayout>
            <PackageDetail />
          </FlexibleLayout>
        } />
      </Route>

      {/* Payment Finish Redirect Route */}
      <Route 
        path="/payment/finish" 
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Memproses hasil pembayaran...</p>
              <p className="text-sm text-gray-500 mt-2">Mengarahkan ke dashboard...</p>
            </div>
          </div>
        } 
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
