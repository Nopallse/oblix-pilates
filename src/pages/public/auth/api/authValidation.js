// Validation schemas untuk auth forms
export const loginValidation = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters'
    }
  }
}

export const registerValidation = {
  name: {
    required: 'Full name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters'
    }
  },
  username: {
    required: 'Username is required',
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters'
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: 'Username can only contain letters, numbers, and underscores'
    }
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  },
  dateOfBirth: {
    required: 'Date of birth is required',
    validate: (value) => {
      if (!value) return 'Date of birth is required'
      
      const today = new Date()
      const birthDate = new Date(value)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      if (age < 13) {
        return 'You must be at least 13 years old to register'
      }
      
      if (age > 100) {
        return 'Please enter a valid date of birth'
      }
      
      return true
    }
  },
  phoneNumber: {
    required: 'Phone number is required',
    pattern: {
      value: /^\+62[1-9][0-9]{6,14}$/,
      message: 'Phone number must start with +62 followed by 7-15 digits (e.g., +6281234567890)'
    },
    validate: (value) => {
      if (!value) return 'Phone number is required';
      
      // Check if starts with 08 (invalid format)
      if (value.startsWith('08')) {
        return 'Phone number must start with +62, not 08. Please use format: +6281234567890';
      }
      
      // Check if starts with +62
      if (!value.startsWith('+62')) {
        return 'Phone number must start with +62. Please use format: +6281234567890';
      }
      
      // Check if after +62 is valid number
      const numberAfterPrefix = value.substring(3);
      if (!/^[1-9][0-9]{6,14}$/.test(numberAfterPrefix)) {
        return 'Invalid phone number format. Please use format: +6281234567890';
      }
      
      return true;
    }
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters'
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    }
  },
  confirmPassword: {
    required: 'Please confirm your password',
    validate: (value, allValues) => {
      return value === allValues.password || 'Passwords do not match'
    }
  }
}

export const resetPasswordValidation = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address'
    }
  }
}

// Utility functions untuk validation
export const validateField = (value, rules, allValues = {}) => {
  const errors = []

  if (rules.required && !value) {
    errors.push(rules.required)
  }

  if (rules.minLength && value && value.length < rules.minLength.value) {
    errors.push(rules.minLength.message)
  }

  if (rules.pattern && value && !rules.pattern.value.test(value)) {
    errors.push(rules.pattern.message)
  }

  // Handle custom validation function
  if (rules.validate && value) {
    const validationResult = rules.validate(value, allValues)
    if (validationResult !== true) {
      errors.push(validationResult)
    }
  }

  return errors
}

export const validateForm = (data, schema) => {
  const errors = {}

  Object.keys(schema).forEach(field => {
    const fieldErrors = validateField(data[field], schema[field], data)
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors[0] // Take first error
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Custom validation untuk password confirmation
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match'
  }
  return null
} 