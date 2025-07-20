/**
 * Utility functions for common operations
 */

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @param {boolean} immediate - Whether to execute immediately
 * @returns {Function} - The debounced function
 */
export const debounce = (func, wait, immediate = false) => {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        
        const callNow = immediate && !timeout;
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func(...args);
    };
};

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to limit
 * @returns {Function} - The throttled function
 */
export const throttle = (func, limit) => {
    let inThrottle;
    
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

/**
 * Deep clone an object
 * @param {any} obj - The object to clone
 * @returns {any} - The cloned object
 */
export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
};

/**
 * Generate a random string
 * @param {number} length - The length of the string
 * @returns {string} - The random string
 */
export const generateRandomString = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Format a date to a readable string
 * @param {Date|string} date - The date to format
 * @param {string} locale - The locale to use
 * @returns {string} - The formatted date
 */
export const formatDate = (date, locale = 'id-ID') => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Format a number to currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code
 * @param {string} locale - The locale to use
 * @returns {string} - The formatted currency
 */
export const formatCurrency = (amount, currency = 'IDR', locale = 'id-ID') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
};

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
export const capitalize = (str) => {
    if (typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert a string to title case
 * @param {string} str - The string to convert
 * @returns {string} - The title case string
 */
export const toTitleCase = (str) => {
    if (typeof str !== 'string') return str;
    return str.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}; 