import { apiClient } from "@shared/services";

/**
 * Profile API Functions
 * Base URL: /api/profile
 */

export const profileAPI = {
    // GET /api/profile
    getProfile: async () => {
        const response = await apiClient.get('/api/profile', { silent: true });
        return response;
    },

    // PUT /api/profile
    updateProfile: async (profileData) => {
        console.log('Updating profile with data:', profileData);
        
        // Create FormData for file upload
        const formData = new FormData();
        
        // Only append fields that have values
        if (profileData.email) {
            formData.append('email', profileData.email);
        }
        if (profileData.full_name) {
            formData.append('full_name', profileData.full_name);
        }
        if (profileData.username) {
            formData.append('username', profileData.username);
        }
        if (profileData.phone_number) {
            formData.append('phone_number', profileData.phone_number);
        }
        if (profileData.dob) {
            formData.append('dob', profileData.dob);
        }
        if (profileData.address) {
            formData.append('address', profileData.address);
        }
        if (profileData.picture) {
            formData.append('picture', profileData.picture);
        }

        console.log('FormData entries:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
            if (value instanceof File) {
                console.log(`  File name: ${value.name}`);
                console.log(`  File size: ${value.size}`);
                console.log(`  File type: ${value.type}`);
            }
        }

        const response = await apiClient.put('/api/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            successMessage: 'Profile updated successfully'
        });
        return response;
    },

    // POST /api/profile/change-password
    changePassword: async (passwordData) => {
        const response = await apiClient.put('/api/profile/change-password', passwordData, {
            successMessage: 'Password changed successfully. Please login again.'
        });
        return response;
    }
}; 