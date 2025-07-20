const IS_DEVELOPMENT = import.meta.env.DEV;

// Default retry configuration
const DEFAULT_RETRY_CONFIG = {
    maxRetries: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    backoffMultiplier: 2,
    retryableStatuses: [408, 429, 500, 502, 503, 504],
    retryableErrors: ['ECONNRESET', 'ECONNABORTED', 'ETIMEDOUT', 'NETWORK_ERROR'],
};

// Calculate delay with exponential backoff
const calculateDelay = (attempt, config = DEFAULT_RETRY_CONFIG) => {
    const delay = config.baseDelay * Math.pow(config.backoffMultiplier, attempt);
    return Math.min(delay, config.maxDelay);
};

// Check if error is retryable
const isRetryableError = (error, config = DEFAULT_RETRY_CONFIG) => {
    // Network errors (no response)
    if (!error.response) {
        return true;
    }

    // HTTP status codes
    if (error.response?.status && config.retryableStatuses.includes(error.response.status)) {
        return true;
    }

    // Specific error codes
    if (error.code && config.retryableErrors.includes(error.code)) {
        return true;
    }

    // Timeout errors
    if (error.message && error.message.includes('timeout')) {
        return true;
    }

    return false;
};

// Main retry function
export const retryRequest = async (
    requestFn,
    config = DEFAULT_RETRY_CONFIG
) => {
    let lastError;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
        try {
            const result = await requestFn();
            return result;
        } catch (error) {
            lastError = error;

            // Don't retry if it's the last attempt
            if (attempt === config.maxRetries) {
                break;
            }

            // Don't retry if error is not retryable
            if (!isRetryableError(error, config)) {
                break;
            }

            // Don't retry if request was cancelled
            if (error.code === 'ERR_CANCELED' || error.message?.includes('canceled')) {
                break;
            }

            // Don't retry authentication errors
            if (error.response?.status === 401 || error.response?.status === 403) {
                break;
            }

            // Calculate delay for next retry
            const delay = calculateDelay(attempt, config);

            if (IS_DEVELOPMENT) {
                console.warn(
                    `🔄 Retry attempt ${attempt + 1}/${config.maxRetries + 1} in ${delay}ms:`,
                    error.message || error
                );
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    // If we get here, all retries failed
    if (IS_DEVELOPMENT) {
        console.error('❌ All retry attempts failed:', lastError);
    }

    throw lastError;
};

// Retry with custom configuration
export const retryWithConfig = (config) => {
    return (requestFn) => retryRequest(requestFn, config);
};

// Quick retry functions for common scenarios
export const retryOnNetworkError = (requestFn) => {
    return retryRequest(requestFn, {
        ...DEFAULT_RETRY_CONFIG,
        retryableStatuses: [], // Only retry network errors
    });
};

export const retryOnServerError = (requestFn) => {
    return retryRequest(requestFn, {
        ...DEFAULT_RETRY_CONFIG,
        retryableStatuses: [500, 502, 503, 504], // Only retry server errors
    });
};

export const retryOnTimeout = (requestFn) => {
    return retryRequest(requestFn, {
        ...DEFAULT_RETRY_CONFIG,
        maxRetries: 2,
        baseDelay: 2000, // Start with 2 seconds
    });
};

// Retry with exponential backoff and jitter
export const retryWithJitter = async (
    requestFn,
    config = DEFAULT_RETRY_CONFIG
) => {
    let lastError;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
        try {
            const result = await requestFn();
            return result;
        } catch (error) {
            lastError = error;

            if (attempt === config.maxRetries) {
                break;
            }

            if (!isRetryableError(error, config)) {
                break;
            }

            // Calculate delay with jitter
            const baseDelay = calculateDelay(attempt, config);
            const jitter = Math.random() * 0.1 * baseDelay; // 10% jitter
            const delay = baseDelay + jitter;

            if (IS_DEVELOPMENT) {
                console.warn(
                    `🔄 Retry with jitter attempt ${attempt + 1}/${config.maxRetries + 1} in ${Math.round(delay)}ms:`,
                    error.message || error
                );
            }

            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
};

// Retry with custom error handling
export const retryWithErrorHandler = (
    requestFn,
    errorHandler,
    config = DEFAULT_RETRY_CONFIG
) => {
    return async () => {
        let lastError;

        for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
            try {
                const result = await requestFn();
                return result;
            } catch (error) {
                lastError = error;

                // Call custom error handler
                const shouldRetry = await errorHandler(error, attempt, config);

                if (!shouldRetry || attempt === config.maxRetries) {
                    break;
                }

                const delay = calculateDelay(attempt, config);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        throw lastError;
    };
};

// Utility function to create retryable API functions
export const createRetryableApiFunction = (
    apiFunction,
    config = DEFAULT_RETRY_CONFIG
) => {
    return async (...args) => {
        const requestFn = () => apiFunction(...args);
        return retryRequest(requestFn, config);
    };
};

// Export default configuration for easy customization
export const retryConfig = DEFAULT_RETRY_CONFIG; 