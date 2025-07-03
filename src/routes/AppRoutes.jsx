import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loading from '../components/ui/Loading'
import PrivateRoute from './PrivateRoutes'
import PublicRoute from './PublicRoutes'
import Dashboard from '../pages/Dashboard/Dashboard'
import Login from '../pages/Login/Login'
import Profile from '../pages/Profile/Profile'
import Admin from '../pages/Admin/Admin'
import User from '../pages/User/User'
import Classes from '../pages/public/Classes/Classes'
import Members from '../pages/Members/Members'
import Home from '../pages/public/Home/Home'
import About from '../pages/public/About/About'
import Trainer from '../pages/public/Trainer/Trainer'
import FAQ from '../pages/public/FAQ/FAQ'
import Contact from '../pages/public/Contact/Contact'
import Blog from '../pages/public/Blog/Blog'
import AdminLayout from '../components/layout/AdminLayout'

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
      <button 
        onClick={() => window.location.href = '/'} 
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200"
      >
        Go Home
      </button>
    </div>
  </div>
)

const AppRoutes = () => {
  const { isLoading, isAuthenticated, user } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/trainer" element={<Trainer />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />

      {/* Private Routes */}
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
        path="/classes" 
        element={
          <PrivateRoute>
            <Classes />
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

      {/* Admin Only Routes */}
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
  )
}

export default AppRoutes