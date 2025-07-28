import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@shared/store/authStore';
import { authAPI } from './authAPI';
import { extractErrorMessage, showToast } from '@shared/services/apiErrorHandler';
import { getErrorType } from '@shared/services/apiErrorHandler';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const authStore = useAuthStore();
    const storeLogin = authStore?.login || (() => {});
    const storeLogout = authStore?.logout || (() => {});
    const setAuthLoading = authStore?.setLoading || (() => {});
    const updateUser = authStore?.updateUser || (() => {});
    const user = authStore?.user || null;
    const isAuthenticated = authStore?.isAuthenticated || false;
    const hasRole = authStore?.hasRole || (() => false);
    const hasAnyRole = authStore?.hasAnyRole || (() => false);
    const isAdmin = authStore?.isAdmin || (() => false);
    const isBorrower = authStore?.isBorrower || (() => false);
    const checkAuth = authStore?.checkAuth || (() => false);

    const navigate = useNavigate();

    const login = async (credentials) => {
        setLoading(true);
        setAuthLoading(true);
        setError(null);

        try {
            if (!credentials.email || !credentials.password) {
                throw new Error('Mohon lengkapi semua field');
            }
            
            console.log("Login attempt with credentials:", credentials);
            const response = await authAPI.login(credentials);
            
            console.log("Login response:", response);
            
            // Check if login was successful
            if (response.success || response.message === 'Login successful') {
                console.log("Login successful, response data:", response.data);
                console.log("Response data keys:", Object.keys(response.data));
                
                // Handle nested data structure
                const actualData = response.data;
                console.log("Actual data:", actualData);
                console.log("Actual data keys:", Object.keys(actualData));
                
                const user = actualData.user;
                console.log("User object:", user);
                console.log("User object keys:", user ? Object.keys(user) : 'No user object');
                console.log("has_purchased_package:", user?.has_purchased_package);

                const { accessToken, refreshToken } = actualData;
                
                // Store login data with has_purchased_package included
                storeLogin(user, accessToken, refreshToken);

                // Determine user role and redirect
                const userRole = user?.role || user?.type || user?.user_type || user?.userType || 'user';
                console.log('User role detected:', userRole);
                console.log('User object for role detection:', user);
                console.log('has_purchased_package:', user?.has_purchased_package);
                
                // Redirect based on role
                let redirectPath;
                if (userRole === 'admin' || userRole === 'ADMIN') {
                    redirectPath = '/admin';
                } else {
                    redirectPath = '/dashboard';
                }

                console.log('useAuth - Navigation Debug:', {
                    userRole,
                    redirectPath,
                    user,
                    hasPurchasedPackage: user?.has_purchased_package,
                    actualData
                });

                // Add a delay to ensure state is properly set before navigation
                setTimeout(() => {
                    console.log('useAuth - Navigating after delay:', redirectPath);
                navigate(redirectPath);
                }, 500);
                
                return actualData;
            } else {
                throw new Error(response.message || 'Login failed');
            }
        } catch (err) {
            const errorMessage = extractErrorMessage(err, 'Login gagal');
            setError(errorMessage);
            showToast('error', errorMessage);
            // Tidak perlu throw error lagi karena toast sudah ditampilkan
            return null;
        } finally {
            // Add delay to ensure state is properly set
            setTimeout(() => {
            setLoading(false);
            setAuthLoading(false);
            }, 300);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setAuthLoading(true);
        setError(null);
        console.log(userData);

        try {
            if (
                !userData.full_name ||
                !userData.username ||
                !userData.email ||
                !userData.dob ||
                !userData.phone_number ||
                !userData.password
            ) {
                throw new Error('Mohon lengkapi semua field yang wajib diisi');
            }

            if (userData.password.length < 8) {
                throw new Error('Password harus minimal 8 karakter');
            }

            const response = await authAPI.register(userData);

            if (response.success) {
                navigate('/login');
                return response.data;
            } else {
                throw new Error(response.message || 'Registration failed');
            }
        } catch (err) {
            const errorMessage = extractErrorMessage(err, 'Registrasi gagal');
            setError(errorMessage);
            showToast('error', errorMessage);
            // Tidak perlu throw error lagi karena toast sudah ditampilkan
            return null;
        } finally {
            setLoading(false);
            setAuthLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setAuthLoading(true);
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout API error:', error);
        }
        storeLogout();
        navigate('/login');
        setLoading(false);
        setAuthLoading(false);
    };

    const changePassword = async (passwordData) => {
        setLoading(true);
        setError(null);

        try {
            if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
                throw new Error('Mohon lengkapi semua field');
            }

            if (passwordData.newPassword.length < 8) {
                throw new Error('Password baru harus minimal 8 karakter');
            }

            if (passwordData.newPassword !== passwordData.confirmPassword) {
                throw new Error('Konfirmasi password tidak cocok');
            }

            const response = await authAPI.changePassword(passwordData);
            return response.data;
        } catch (err) {
            const errorMessage = extractErrorMessage(err, 'Gagal mengubah password');
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (profileData) => {
        setLoading(true);
        setError(null);

        try {
            if (!profileData.name || !profileData.email) {
                throw new Error('Nama dan email wajib diisi');
            }

            const response = await authAPI.updateProfile(profileData);
            
            // Update user in store
            updateUser(response.data);
            
            return response.data;
        } catch (err) {
            const errorMessage = extractErrorMessage(err, 'Gagal mengupdate profile');
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email) => {
        setLoading(true);
        setError(null);

        try {
            if (!email) {
                throw new Error('Email wajib diisi');
            }

            const response = await authAPI.forgotPassword(email);
            return response.data;
        } catch (err) {
            const errorMessage = extractErrorMessage(err, 'Gagal mengirim email reset password');
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const canAccess = (resource, action = 'read') => {
        if (!isAuthenticated || !user) return false;

        const permissions = {
            admin: ['*'],
            user: ['profile:read', 'profile:update', 'classes:read', 'bookings:read'],
        };

        const userRole = user?.role || user?.type || 'user';
        const userPermissions = permissions[userRole] || [];
        return userPermissions.includes('*') || userPermissions.includes(`${resource}:${action}`);
    };

    const redirectToDashboard = () => {
        const userRole = user?.role || user?.type || 'user';
        const redirectPath = (userRole === 'admin' || userRole === 'ADMIN') ? '/admin' : '/dashboard';
        navigate(redirectPath);
    };

    return {
        login,
        register,
        logout,
        changePassword,
        updateProfile,
        resetPassword,
        loading,
        error,
        user,
        isAuthenticated,
        hasRole,
        hasAnyRole,
        isAdmin,
        isBorrower,
        canAccess,
        redirectToDashboard,
        checkAuth
    };
};

export const useRole = () => {
    const authStore = useAuthStore();
    const user = authStore?.user || null;
    const isAuthenticated = authStore?.isAuthenticated || false;
    const hasRole = authStore?.hasRole || (() => false);
    const hasAnyRole = authStore?.hasAnyRole || (() => false);
    const isAdmin = authStore?.isAdmin || (() => false);
    const isBorrower = authStore?.isBorrower || (() => false);

    const isUser = () => hasRole('user');
    const getUserRole = () => user?.role || user?.type || null;

    return {
        hasRole,
        hasAnyRole,
        isAdmin,
        isBorrower,
        isUser,
        getUserRole,
        currentRole: user?.role || user?.type
    };
};

export const useLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            // Reset form setelah login berhasil
            resetForm();
        } catch (error) {
            // Form tidak di-reset jika ada error
            console.error('Login error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const resetForm = () => {
        setFormData({
            email: '',
            password: ''
        });
        setShowPassword(false);
    };

    // Reset form ketika component mount
    useEffect(() => {
        resetForm();
    }, []);

    return {
        formData,
        showPassword,
        loading,
        handleChange,
        handleSubmit,
        togglePasswordVisibility,
        resetForm
    };
};

export const useRegister = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const { register, loading } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            // Reset form setelah registrasi berhasil
            resetForm();
        } catch (error) {
            // Form tidak di-reset jika ada error
            console.error('Registration error:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const resetForm = () => {
        setFormData({
            fullName: '',
            email: '',
            password: '',
            phoneNumber: '',
            dateOfBirth: ''
        });
        setShowPassword(false);
    };

    // Reset form ketika component mount
    useEffect(() => {
        resetForm();
    }, []);

    return {
        formData,
        showPassword,
        loading,
        handleChange,
        handleSubmit,
        togglePasswordVisibility,
        resetForm
    };
}; 