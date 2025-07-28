export const staffValidation = {
  // Validate full name
  validateFullName: (value) => {
    if (!value || !value.trim()) {
      return 'Nama lengkap wajib diisi';
    }
    if (value.trim().length < 2) {
      return 'Nama lengkap minimal 2 karakter';
    }
    if (value.trim().length > 100) {
      return 'Nama lengkap maksimal 100 karakter';
    }
    return null;
  },

  // Validate username
  validateUsername: (value) => {
    if (!value || !value.trim()) {
      return 'Username wajib diisi';
    }
    if (value.trim().length < 3) {
      return 'Username minimal 3 karakter';
    }
    if (value.trim().length > 50) {
      return 'Username maksimal 50 karakter';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Username hanya boleh berisi huruf, angka, dan underscore';
    }
    return null;
  },

  // Validate email
  validateEmail: (value) => {
    if (!value || !value.trim()) {
      return 'Email wajib diisi';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Format email tidak valid';
    }
    if (value.length > 255) {
      return 'Email maksimal 255 karakter';
    }
    return null;
  },

  // Validate date of birth
  validateDateOfBirth: (value) => {
    if (!value) {
      return 'Tanggal lahir wajib diisi';
    }
    
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 17) {
      return 'Usia minimal 17 tahun';
    }
    if (age > 100) {
      return 'Usia maksimal 100 tahun';
    }
    return null;
  },

  // Validate phone number
  validatePhoneNumber: (value) => {
    if (!value || !value.trim()) {
      return 'Nomor telepon wajib diisi';
    }
    if (!/^[\+]?[0-9\s\-\(\)]+$/.test(value)) {
      return 'Format nomor telepon tidak valid';
    }
    if (value.replace(/[\s\-\(\)]/g, '').length < 10) {
      return 'Nomor telepon minimal 10 digit';
    }
    if (value.replace(/[\s\-\(\)]/g, '').length > 15) {
      return 'Nomor telepon maksimal 15 digit';
    }
    return null;
  },

  // Validate password
  validatePassword: (value, isEdit = false) => {
    if (!isEdit && (!value || !value.trim())) {
      return 'Password wajib diisi';
    }
    if (value && value.length < 6) {
      return 'Password minimal 6 karakter';
    }
    if (value && value.length > 100) {
      return 'Password maksimal 100 karakter';
    }
    return null;
  },

  // Validate entire form
  validateForm: (formData, isEdit = false) => {
    const errors = {};

    const fullNameError = staffValidation.validateFullName(formData.full_name);
    if (fullNameError) errors.full_name = fullNameError;

    const usernameError = staffValidation.validateUsername(formData.username);
    if (usernameError) errors.username = usernameError;

    const emailError = staffValidation.validateEmail(formData.email);
    if (emailError) errors.email = emailError;

    const dateOfBirthError = staffValidation.validateDateOfBirth(formData.date_of_birth);
    if (dateOfBirthError) errors.date_of_birth = dateOfBirthError;

    const phoneNumberError = staffValidation.validatePhoneNumber(formData.phone_number);
    if (phoneNumberError) errors.phone_number = phoneNumberError;

    const passwordError = staffValidation.validatePassword(formData.password, isEdit);
    if (passwordError) errors.password = passwordError;

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}; 