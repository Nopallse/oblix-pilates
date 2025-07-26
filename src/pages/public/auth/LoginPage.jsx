import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { logoPrimer, item1, flowerIcon } from "../../../shared/utils/assets";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import Modal from "../../../components/ui/Modal/Modal";
import { useAuth } from "./api";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading: isLoading, error, isAuthenticated, user } = useAuth();  
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);

  // Clear toast hanya ketika component unmount atau route berubah
  useEffect(() => {
    return () => {
      // Cleanup toast hanya ketika component unmount
      // toast.dismiss();
    };
  }, []);

  if (isAuthenticated) {
    const userRole = user?.role || user?.type
    const redirectPath = userRole === "admin" ? "/admin" : "/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    // Dismiss semua toast yang aktif
    toast.dismiss();
    // Navigate to register page
    navigate('/register');
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!forgotPasswordEmail) {
      toast.error('Please enter your email address');
      return;
    }

    setIsForgotPasswordLoading(true);
    
    try {
      // Simulate API call - replace with actual reset password API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Password reset link sent to your email!');
      setShowForgotPassword(false);
      setForgotPasswordEmail("");
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.');
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-8 bg-white order-2 lg:order-1">
        <div className="max-w-md mx-auto w-full">
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl lg:text-4xl font-bold font-raleway text-tertiary mb-6">
              Login
            </h2>
            <p className="text-sm text-textSecondary  mb-4">
              Enter your email and password to log in!
            </p>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword((v) => !v)}
            />
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-primary text-xs hover:text-blue-700 font-medium focus:outline-none focus:underline"
            >
              Forgot password?
            </button>
            {/* Submit Button */}
            <Button
              type="submit"
              variant="submit"
              disabled={isLoading}
              loading={isLoading}
            >
              Sign In
            </Button>
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Don't have an account?
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-primary hover:text-blue-700 font-medium ml-1 focus:outline-none focus:underline"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right: Background Image */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-64 lg:min-h-screen order-1 lg:order-2 lg:rounded-bl-[10rem] overflow-hidden">
        {/* Background Image */}
        <img
          src={item1}
          alt="Pilates Studio"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), linear-gradient(180deg, rgba(58, 58, 60, 0) 0%, rgba(58, 58, 60, 0.8) 100%)",
            zIndex: 1,
          }}
        />

        {/* Decorative Elements */}
        <div className="absolute -top-6 -right-4 z-10">
          <img
            src={flowerIcon}
            alt="Decorative flower"
            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rotate-12"
          />
        </div>

        <div className="absolute -bottom-10 left-24 z-10">
          <img
            src={flowerIcon}
            alt="Decorative flower"
            className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rotate-90"
          />
        </div>

        {/* Center Logo */}
        <div className="absolute z-10 text-center">
          <img
            src={logoPrimer}
            alt="Oblix Pilates Logo"
            className="h-20 sm:h-24 lg:h-28 "
          />
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotPassword}
        onClose={() => {
          setShowForgotPassword(false);
          setForgotPasswordEmail("");
        }}
        title="Lupa Password?"
      >
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you a link to create a new password.
          </p>
          
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              id="forgotPasswordEmail"
              name="forgotPasswordEmail"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="submit"
                loading={isForgotPasswordLoading}
                disabled={isForgotPasswordLoading}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage; 