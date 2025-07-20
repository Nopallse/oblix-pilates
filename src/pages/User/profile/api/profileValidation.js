// Validation schemas untuk profile forms
export const profileUpdateValidation = {
  name: {
    required: 'Full name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters'
    },
    maxLength: {
      value: 50,
      message: 'Name cannot exceed 50 characters'
    }
  },
  username: {
    required: 'Username is required',
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters'
    },
    maxLength: {
      value: 30,
      message: 'Username cannot exceed 30 characters'
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
  phoneNumber: {
    required: 'Phone number is required',
    pattern: {
      value: /^[\+]?[1-9][\d]{0,15}$/,
      message: 'Please enter a valid phone number'
    }
  },
  dateOfBirth: {
    required: 'Date of birth is required',
    validate: (value) => {
      if (!value) return 'Date of birth is required'
      
      const today = new Date()
      const birthDate = new Date(value)
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      if (age < 13) {
        return 'You must be at least 13 years old'
      }
      
      if (age > 100) {
        return 'Please enter a valid date of birth'
      }
      
      return true
    }
  }
}

export const changePasswordValidation = {
  currentPassword: {
    required: 'Current password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters'
    }
  },
  newPassword: {
    required: 'New password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters'
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    },
    validate: (value, allValues) => {
      if (value === allValues.currentPassword) {
        return 'New password must be different from current password'
      }
      return true
    }
  },
  confirmPassword: {
    required: 'Please confirm your new password',
    validate: (value, allValues) => {
      return value === allValues.newPassword || 'Passwords do not match'
    }
  }
}

export const deleteAccountValidation = {
  password: {
    required: 'Password is required to confirm account deletion',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters'
    }
  },
  confirmation: {
    required: 'Please type "DELETE" to confirm account deletion',
    validate: (value) => {
      return value === 'DELETE' || 'Please type "DELETE" to confirm'
    }
  }
}

export const profilePictureValidation = {
  file: {
    required: 'Profile picture is required',
    validate: (file) => {
      if (!file) return 'Profile picture is required'
      
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        return 'Please upload a valid image file (JPEG, PNG, or WebP)'
      }
      
      // Check file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        return 'File size must be less than 5MB'
      }
      
      return true
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

  if (rules.maxLength && value && value.length > rules.maxLength.value) {
    errors.push(rules.maxLength.message)
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

// Custom validation untuk profile picture
export const validateProfilePicture = (file) => {
  const errors = []

  if (!file) {
    errors.push('Profile picture is required')
    return errors
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    errors.push('Please upload a valid image file (JPEG, PNG, or WebP)')
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    errors.push('File size must be less than 5MB')
  }

  return errors
}

// Custom validation untuk password confirmation
export const validatePasswordConfirmation = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return 'Passwords do not match'
  }
  return null
}

// Custom validation untuk account deletion confirmation
export const validateDeleteConfirmation = (confirmation) => {
  if (confirmation !== 'DELETE') {
    return 'Please type "DELETE" to confirm account deletion'
  }
  return null
} 