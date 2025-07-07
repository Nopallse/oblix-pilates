import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import Loading from "../components/ui/Loading/Loading.jsx";
import PrivateRoute from "./PrivateRoutes.jsx";
import PublicRoute from "./PublicRoutes.jsx";

// Page imports
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Admin from "../pages/Admin/Admin";
import User from "../pages/User/User";
import Members from "../pages/Members/Members";

// Public page imports
import Home from "../pages/public/Home/Home";
import About from "../pages/public/About/About";
import Classes from "../pages/public/Classes/Classes";
import ClassDetail from "../pages/public/ClassDetail/ClassDetail";
import Trainer from "../pages/public/Trainer/Trainer";
import Contact from "../pages/public/Contact/Contact";
import Blog from "../pages/public/Blog/Blog";
import BlogDetail from "../pages/BlogDetail.jsx";
import BookTrial from "../pages/public/BookTrial/BookTrial";


const NotFound = () => (
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
        onClick={() => (window.location.href = "/")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
      >
        Go Home
      </button>
    </div>
  </div>
);

const AppRoutes = () => {
  const { isLoading, isAuthenticated, user } = useAuth();

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
          <Login />
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

      {/* Private Routes - User Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        }
      />
      <Route
        path="/members"
        element={
          <PrivateRoute>
            <Members />
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute requireAdmin={true}>
            <Admin />
          </PrivateRoute>
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
