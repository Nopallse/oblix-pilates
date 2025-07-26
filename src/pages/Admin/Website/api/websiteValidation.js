import * as Yup from 'yup';

/**
 * Website Validation Schemas
 */

// ==================== BANNER VALIDATION ====================

export const bannerValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must not exceed 100 characters')
        .trim(),
    picture: Yup.mixed()
        .required('Picture is required')
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024; // 5MB
        })
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return true;
            return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type);
        }),
});

export const bannerUpdateValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must not exceed 100 characters')
        .trim(),
    picture: Yup.mixed()
        .nullable()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value) return true;
            // Skip validation if value is a string (existing picture path)
            if (typeof value === 'string') return true;
            // Only validate if it's a File object
            if (value instanceof File) {
            return value.size <= 5 * 1024 * 1024; // 5MB
            }
            return true;
        })
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return true;
            // Skip validation if value is a string (existing picture path)
            if (typeof value === 'string') return true;
            // Only validate if it's a File object
            if (value instanceof File) {
            return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type);
            }
            return true;
        }),
});

// ==================== GALLERY VALIDATION ====================

export const galleryValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must not exceed 100 characters')
        .trim(),
    picture: Yup.mixed()
        .required('Picture is required')
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024; // 5MB
        })
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return true;
            return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type);
        }),
});

export const galleryUpdateValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must not exceed 100 characters')
        .trim(),
    picture: Yup.mixed()
        .nullable()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value) return true;
            // Skip validation if value is a string (existing picture path)
            if (typeof value === 'string') return true;
            // Only validate if it's a File object
            if (value instanceof File) {
            return value.size <= 5 * 1024 * 1024; // 5MB
            }
            return true;
        })
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return true;
            // Skip validation if value is a string (existing picture path)
            if (typeof value === 'string') return true;
            // Only validate if it's a File object
            if (value instanceof File) {
            return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type);
            }
            return true;
        }),
});

// ==================== TRAINER VALIDATION ====================

export const trainerValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title must not exceed 100 characters')
        .trim(),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must not exceed 500 characters')
        .trim(),
    instagram: Yup.string()
        .nullable()
        .url('Instagram must be a valid URL')
        .trim(),
    tiktok: Yup.string()
        .nullable()
        .url('TikTok must be a valid URL')
        .trim(),
    picture: Yup.mixed()
        .nullable()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024; // 5MB
        })
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return true;
            return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type);
        }),
});

export const trainerUpdateValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title must not exceed 100 characters')
        .trim(),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must not exceed 500 characters')
        .trim(),
    instagram: Yup.string()
        .nullable()
        .url('Instagram must be a valid URL')
        .trim(),
    tiktok: Yup.string()
        .nullable()
        .url('TikTok must be a valid URL')
        .trim(),
    picture: Yup.mixed()
        .nullable()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value) return true;
            // Skip validation if value is a string (existing picture path)
            if (typeof value === 'string') return true;
            // Only validate if it's a File object
            if (value instanceof File) {
            return value.size <= 5 * 1024 * 1024; // 5MB
            }
            return true;
        })
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return true;
            // Skip validation if value is a string (existing picture path)
            if (typeof value === 'string') return true;
            // Only validate if it's a File object
            if (value instanceof File) {
            return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type);
            }
            return true;
        }),
});

// ==================== COMMON VALIDATION HELPERS ====================

export const validateFileSize = (file, maxSizeMB = 5) => {
    if (!file) return null;
    if (file.size > maxSizeMB * 1024 * 1024) {
        return `File size must be less than ${maxSizeMB}MB`;
    }
    return null;
};

export const validateFileType = (file, allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']) => {
    if (!file) return null;
    if (!allowedTypes.includes(file.type)) {
        return 'Only image files (JPEG, PNG, WebP) are allowed';
    }
    return null;
};

export const validateImageDimensions = (file, minWidth = 100, minHeight = 100) => {
    return new Promise((resolve) => {
        if (!file) {
            resolve(null);
            return;
        }

        const img = new Image();
        img.onload = () => {
            if (img.width < minWidth || img.height < minHeight) {
                resolve(`Image dimensions must be at least ${minWidth}x${minHeight} pixels`);
            } else {
                resolve(null);
            }
        };
        img.onerror = () => {
            resolve('Invalid image file');
        };
        img.src = URL.createObjectURL(file);
    });
};

// ==================== SEARCH AND FILTER VALIDATION ====================

export const searchValidationSchema = Yup.object({
    search: Yup.string()
        .max(100, 'Search term must not exceed 100 characters')
        .trim(),
    page: Yup.number()
        .min(1, 'Page number must be at least 1')
        .max(1000, 'Page number must not exceed 1000'),
    limit: Yup.number()
        .min(1, 'Limit must be at least 1')
        .max(100, 'Limit must not exceed 100'),
});

// ==================== TESTIMONIAL VALIDATION ====================

export const testimonialValidationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must not exceed 100 characters')
        .trim(),
    content: Yup.string()
        .required('Content is required')
        .min(10, 'Content must be at least 10 characters')
        .max(500, 'Content must not exceed 500 characters')
        .trim(),
    age: Yup.number()
        .required('Age is required')
        .min(1, 'Age must be at least 1')
        .max(120, 'Age must not exceed 120')
        .integer('Age must be a whole number'),
});

export const testimonialUpdateValidationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must not exceed 100 characters')
        .trim(),
    content: Yup.string()
        .required('Content is required')
        .min(10, 'Content must be at least 10 characters')
        .max(500, 'Content must not exceed 500 characters')
        .trim(),
    age: Yup.number()
        .required('Age is required')
        .min(1, 'Age must be at least 1')
        .max(120, 'Age must not exceed 120')
        .integer('Age must be a whole number'),
});

// ==================== FAQ VALIDATION ====================

export const faqValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(200, 'Title must not exceed 200 characters')
        .trim(),
    content: Yup.string()
        .required('Content is required')
        .min(10, 'Content must be at least 10 characters')
        .max(1000, 'Content must not exceed 1000 characters')
        .trim(),
});

export const faqUpdateValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(200, 'Title must not exceed 200 characters')
        .trim(),
    content: Yup.string()
        .required('Content is required')
        .min(10, 'Content must be at least 10 characters')
        .max(1000, 'Content must not exceed 1000 characters')
        .trim(),
});

// ==================== BLOG VALIDATION ====================

export const blogValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(200, 'Title must not exceed 200 characters')
        .trim(),
    content: Yup.string()
        .required('Content is required')
        .min(10, 'Content must be at least 10 characters')
        .max(5000, 'Content must not exceed 5000 characters')
        .trim(),
    picture: Yup.mixed()
        .required('Picture is required')
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value) return true;
            return value.size <= 5 * 1024 * 1024; // 5MB
        })
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return true;
            return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type);
        }),
});

export const blogUpdateValidationSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .min(5, 'Title must be at least 5 characters')
        .max(200, 'Title must not exceed 200 characters')
        .trim(),
    content: Yup.string()
        .required('Content is required')
        .min(10, 'Content must be at least 10 characters')
        .max(5000, 'Content must not exceed 5000 characters')
        .trim(),
    picture: Yup.mixed()
        .nullable()
        .test('fileSize', 'File size must be less than 5MB', (value) => {
            if (!value) return true;
            // Skip validation if value is a string (existing picture path)
            if (typeof value === 'string') return true;
            // Only validate if it's a File object
            if (value instanceof File) {
                return value.size <= 5 * 1024 * 1024; // 5MB
            }
            return true;
        })
        .test('fileType', 'Only image files are allowed', (value) => {
            if (!value) return true;
            // Skip validation if value is a string (existing picture path)
            if (typeof value === 'string') return true;
            // Only validate if it's a File object
            if (value instanceof File) {
                return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value.type);
            }
            return true;
        }),
});

// ==================== EXPORT ALL SCHEMAS ====================

export const websiteValidationSchemas = {
    banner: {
        create: bannerValidationSchema,
        update: bannerUpdateValidationSchema,
    },
    gallery: {
        create: galleryValidationSchema,
        update: galleryUpdateValidationSchema,
    },
    trainer: {
        create: trainerValidationSchema,
        update: trainerUpdateValidationSchema,
    },
    testimonial: {
        create: testimonialValidationSchema,
        update: testimonialUpdateValidationSchema,
    },
    faq: {
        create: faqValidationSchema,
        update: faqUpdateValidationSchema,
    },
    blog: {
        create: blogValidationSchema,
        update: blogUpdateValidationSchema,
    },
    search: searchValidationSchema,
}; 