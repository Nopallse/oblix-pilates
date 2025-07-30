import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { logoPrimer, item1, flowerIcon } from "../../../shared/utils/assets";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { useAuth } from "./api";
import { registerValidation, validateForm } from "./api/authValidation";
import { showToast } from "../../../shared/services/apiErrorHandler";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  if (isAuthenticated) {
    const redirectPath = user?.type === "admin" ? "/admin" : "/check-class";
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setFieldErrors({});
    
    // Validate form
    const validation = validateForm(formData, registerValidation);
    
    if (!validation.isValid) {
      setFieldErrors(validation.errors);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setFieldErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    
    // Mapping field sesuai kebutuhan API
    const apiData = {
      full_name: formData.name,
      username: formData.username,
      email: formData.email,
      dob: formData.dateOfBirth,
      phone_number: formData.phoneNumber,
      password: formData.password
    };

    try {
      const result = await register(apiData);
      if (result) {
        // Register berhasil, toast success akan ditampilkan oleh useAuth
        showToast('success', 'Registrasi berhasil! Silakan login dengan akun Anda.');
      }
    } catch (error) {
      // Error sudah dihandle di useAuth hook
      console.log('Register error caught in RegisterPage:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: null });
    }
    
    // Real-time validation for phone number
    if (name === 'phoneNumber') {
      // Check if user is typing 08 format
      if (value.startsWith('08')) {
        setFieldErrors(prev => ({
          ...prev,
          phoneNumber: 'Phone number must start with +62, not 08. Please use format: +6281234567890'
        }));
      } else if (value && !value.startsWith('+62')) {
        setFieldErrors(prev => ({
          ...prev,
          phoneNumber: 'Phone number must start with +62. Please use format: +6281234567890'
        }));
      } else if (value && value.startsWith('+62')) {
        const numberAfterPrefix = value.substring(3);
        if (numberAfterPrefix && !/^[1-9][0-9]{0,14}$/.test(numberAfterPrefix)) {
          setFieldErrors(prev => ({
            ...prev,
            phoneNumber: 'Invalid phone number format. Please use format: +6281234567890'
          }));
        } else {
          // Clear error if format is correct
          setFieldErrors(prev => ({
            ...prev,
            phoneNumber: null
          }));
        }
      }
    }
  };

  const handleToggle = () => {
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left: Register Form - Scrollable */}
      <div className="w-full lg:w-1/2 flex flex-col px-6 sm:px-8 lg:px-12 py-8 lg:py-12 bg-white order-2 lg:order-1 lg:overflow-y-auto lg:max-h-screen">
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-8">
              <h2 className="text-xl lg:text-4xl font-bold font-raleway text-tertiary mb-4">
                Register
              </h2>
              <p className="text-sm text-textSecondary">
                Create your account to get started!
              </p>
            </div>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {/* Name Input */}
            <Input
              label="Full Name"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              error={fieldErrors.name}
            />
            {/* Username Input */}
            <Input
              label="Username"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              error={fieldErrors.username}
            />
            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              error={fieldErrors.email}
            />
            {/* Date of Birth Input */}
            <Input
              label="Date of Birth"
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              error={fieldErrors.dateOfBirth}
            />
            {/* Phone Number Input */}
            <div>
              <Input
                label="Phone Number"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="+6281234567890"
                required
                error={fieldErrors.phoneNumber}
              />
            </div>
            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword((v) => !v)}
              error={fieldErrors.password}
            />
            {/* Confirm Password Input */}
            <Input
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              showPassword={showConfirmPassword}
              onTogglePassword={() => setShowConfirmPassword((v) => !v)}
              error={fieldErrors.confirmPassword}
            />
            {/* Submit Button */}
            <Button
              type="submit"
              variant="submit"
              disabled={isLoading}
              loading={isLoading}
            >
              Create Account
            </Button>
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Already have an account?
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-primary hover:text-blue-700 font-medium ml-1 focus:outline-none focus:underline"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right: Background Image - Fixed */}
      <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-64 lg:min-h-screen order-1 lg:order-2 lg:rounded-bl-[10rem] overflow-hidden lg:fixed lg:right-0 lg:top-0 lg:bottom-0">
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
    </div>
  );
};

export default RegisterPage; 