import toast from 'react-hot-toast';

const IS_DEVELOPMENT = import.meta.env.DEV;

export const showToast = (type, message) => {
    if (!message) return;

    const toastOptions = {
        duration: 4000,
        position: 'top-right',
    };

    switch (type) {
        case 'success':
            toast.success(message, toastOptions);
            break;
        case 'error':
            toast.error(message, toastOptions);
            break;
        case 'warning':
            toast(message, {
                ...toastOptions,
                icon: '⚠️',
                style: {
                    background: '#fef3c7',
                    color: '#92400e',
                },
            });
            break;
        case 'info':
            toast(message, {
                ...toastOptions,
                icon: 'ℹ️',
                style: {
                    background: '#dbeafe',
                    color: '#1e40af',
                },
            });
            break;
        default:
            toast(message, toastOptions);
    }
};

export const handleResponseError = (error) => {
    if (IS_DEVELOPMENT) {
        console.error('API Error:', error);
    }

    // Network error
    if (!error.response) {
        const message = 'Network error. Please check your internet connection.';
        showToast('error', message);
        return {
            message,
            status: 'network_error',
            originalError: error,
        };
    }

    const { response } = error;
    const { status, data } = response;

    let message = 'An unexpected error occurred.';

    // Handle different HTTP status codes
    switch (status) {
        case 400:
            message = data?.message || 'Bad request. Please check your input.';
            break;
        case 401:
            message = data?.message || 'Unauthorized. Please login again.';
            // Optionally redirect to login
            // window.location.href = '/login';
            break;
        case 403:
            message = data?.message || 'Forbidden. You don\'t have permission to perform this action.';
            break;
        case 404:
            message = data?.message || 'Resource not found.';
            break;
        case 422:
            message = data?.message || 'Validation error. Please check your input.';
            break;
        case 429:
            message = data?.message || 'Too many requests. Please try again later.';
            break;
        case 500:
            message = data?.message || 'Internal server error. Please try again later.';
            break;
        case 502:
            message = data?.message || 'Bad gateway. Please try again later.';
            break;
        case 503:
            message = data?.message || 'Service unavailable. Please try again later.';
            break;
        default:
            message = data?.message || `Error ${status}: ${data?.error || 'Unknown error'}`;
    }

    showToast('error', message);

    return {
        message,
        status,
        data,
        originalError: error,
    };
};

export const extractErrorMessage = (error, defaultMessage = 'An error occurred') => {
    if (!error) return defaultMessage;

    // If error is already processed by handleResponseError
    if (error.message && error.status) {
        return error.message;
    }

    // If error has response data
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    // If error has a message property
    if (error.message) {
        return error.message;
    }

    // If error is a string
    if (typeof error === 'string') {
        return error;
    }

    return defaultMessage;
};

export const isNetworkError = (error) => {
    return !error.response;
};

export const isAuthError = (error) => {
    return error.response?.status === 401;
};

export const isValidationError = (error) => {
    return error.response?.status === 422;
};

export const isServerError = (error) => {
    const status = error.response?.status;
    return status >= 500 && status < 600;
};

export const getErrorDetails = (error) => {
    if (!error.response) {
        return {
            type: 'network',
            message: 'Network error',
            status: null,
            data: null,
        };
    }

    const { status, data } = error.response;

    return {
        type: getErrorType(status),
        message: data?.message || 'Unknown error',
        status,
        data,
    };
};

export const getErrorType = (status) => {
    if (status >= 200 && status < 300) return 'success';
    if (status >= 400 && status < 500) return 'client';
    if (status >= 500) return 'server';
    return 'unknown';
};

export const createErrorHandler = (options = {}) => {
    const {
        showToast: shouldShowToast = true,
        logError: shouldLogError = true,
        defaultMessage = 'An error occurred',
    } = options;

    return (error) => {
        if (shouldLogError && IS_DEVELOPMENT) {
            console.error('API Error:', error);
        }

        const processedError = handleResponseError(error);
        
        if (!shouldShowToast) {
            // Remove toast from processed error
            return {
                ...processedError,
                showToast: false,
            };
        }

        return processedError;
    };
};

export const withErrorHandling = (apiFunction) => {
    return async (...args) => {
        try {
            return await apiFunction(...args);
        } catch (error) {
            const processedError = handleResponseError(error);
            throw processedError;
        }
    };
}; 