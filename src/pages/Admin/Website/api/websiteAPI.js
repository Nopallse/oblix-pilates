import { apiClient } from '@shared/services'

/**
 * Website API Service
 * RESTful API endpoints for website content management
 */

// ==================== BANNER API ====================

export const bannerAPI = {
  /**
   * Get all banners with pagination and filters
   * GET /api/banner
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get('/api/banner', { 
      params, 
      silent: true 
    })
    
    // Handle nested response structure
    if (response.success && response.data?.data) {
      return {
        ...response,
        data: response.data.data // Extract the actual data
      }
    }
    
    return response
  },

  /**
   * Get banner by ID
   * GET /api/banner/{id}
   */
  getById: async (id) => {
    return await apiClient.get(`/api/banner/${id}`, { 
      silent: true 
    })
  },

  /**
   * Create new banner
   * POST /api/banner
   */
  create: async (bannerData) => {
    console.log('Creating banner with data:', bannerData)
    console.log('Data type:', typeof bannerData)
    console.log('Is FormData:', bannerData instanceof FormData)
    
    // If bannerData is already FormData, use it directly
    if (bannerData instanceof FormData) {
      console.log('Using existing FormData')
      console.log('FormData entries:')
      for (let [key, value] of bannerData.entries()) {
        console.log(`  ${key}:`, value)
        if (value instanceof File) {
          console.log(`    File name: ${value.name}`)
          console.log(`    File size: ${value.size}`)
          console.log(`    File type: ${value.type}`)
        }
      }
      
      return await apiClient.post('/api/banner', bannerData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        successMessage: 'Banner created successfully'
      })
    }
    
    // Otherwise, create FormData from object
    const formData = new FormData()
    formData.append('title', bannerData.title)
    if (bannerData.picture) {
      formData.append('picture', bannerData.picture)
    }

    console.log('Created new FormData:')
    console.log('Title:', bannerData.title)
    console.log('Picture:', bannerData.picture)
    console.log('FormData entries:')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value)
      if (value instanceof File) {
        console.log(`    File name: ${value.name}`)
        console.log(`    File size: ${value.size}`)
        console.log(`    File type: ${value.type}`)
      }
    }

    return await apiClient.post('/api/banner', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      successMessage: 'Banner created successfully'
    })
  },

  /**
   * Update banner
   * PUT /api/banner/{id}
   */
  update: async (id, bannerData) => {
    console.log('Updating banner with data:', bannerData)
    console.log('Data type:', typeof bannerData)
    console.log('Is FormData:', bannerData instanceof FormData)
    
    // If bannerData is already FormData, use it directly
    if (bannerData instanceof FormData) {
      console.log('Using existing FormData for update')
      console.log('FormData entries:')
      for (let [key, value] of bannerData.entries()) {
        console.log(`  ${key}:`, value)
        if (value instanceof File) {
          console.log(`    File name: ${value.name}`)
          console.log(`    File size: ${value.size}`)
          console.log(`    File type: ${value.type}`)
        }
      }
      
      return await apiClient.put(`/api/banner/${id}`, bannerData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        successMessage: 'Banner updated successfully'
      })
    }
    
    // Otherwise, create FormData from object
    const formData = new FormData()
    formData.append('title', bannerData.title)
    if (bannerData.picture) {
      formData.append('picture', bannerData.picture)
    }

    console.log('Created new FormData for update:')
    console.log('Title:', bannerData.title)
    console.log('Picture:', bannerData.picture)
    console.log('FormData entries:')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value)
      if (value instanceof File) {
        console.log(`    File name: ${value.name}`)
        console.log(`    File size: ${value.size}`)
        console.log(`    File type: ${value.type}`)
      }
    }

    return await apiClient.put(`/api/banner/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      successMessage: 'Banner updated successfully'
    })
  },

  /**
   * Delete banner
   * DELETE /api/banner/{id}
   */
  delete: async (id) => {
    return await apiClient.delete(`/api/banner/${id}`, {
      successMessage: 'Banner deleted successfully'
    })
  }
}

// ==================== GALLERY API ====================

export const galleryAPI = {
  /**
   * Get all galleries with pagination and filters
   * GET /api/gallery
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get('/api/gallery', { 
      params, 
      silent: true 
    })
    
    // Handle nested response structure
    if (response.success && response.data?.data) {
      return {
        ...response,
        data: response.data.data // Extract the actual data
      }
    }
    
    return response
  },

  /**
   * Get gallery by ID
   * GET /api/gallery/{id}
   */
  getById: async (id) => {
    return await apiClient.get(`/api/gallery/${id}`, { 
      silent: true 
    })
  },

  /**
   * Create new gallery item
   * POST /api/gallery
   */
  create: async (galleryData) => {
    console.log('Creating gallery with data:', galleryData)
    console.log('Data type:', typeof galleryData)
    console.log('Is FormData:', galleryData instanceof FormData)
    
    // If galleryData is already FormData, use it directly
    if (galleryData instanceof FormData) {
      console.log('Using existing FormData for gallery')
      console.log('FormData entries:')
      for (let [key, value] of galleryData.entries()) {
        console.log(`  ${key}:`, value)
        if (value instanceof File) {
          console.log(`    File name: ${value.name}`)
          console.log(`    File size: ${value.size}`)
          console.log(`    File type: ${value.type}`)
        }
      }
      
      return await apiClient.post('/api/gallery', galleryData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        successMessage: 'Gallery created successfully'
      })
    }
    
    // Otherwise, create FormData from object
    const formData = new FormData()
    formData.append('title', galleryData.title)
    if (galleryData.picture) {
      formData.append('picture', galleryData.picture)
    }

    console.log('Created new FormData for gallery:')
    console.log('Title:', galleryData.title)
    console.log('Picture:', galleryData.picture)
    console.log('FormData entries:')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value)
      if (value instanceof File) {
        console.log(`    File name: ${value.name}`)
        console.log(`    File size: ${value.size}`)
        console.log(`    File type: ${value.type}`)
      }
    }

    return await apiClient.post('/api/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      successMessage: 'Gallery created successfully'
    })
  },

  /**
   * Update gallery item
   * PUT /api/gallery/{id}
   */
  update: async (id, galleryData) => {
    console.log('Updating gallery with data:', galleryData)
    console.log('Data type:', typeof galleryData)
    console.log('Is FormData:', galleryData instanceof FormData)
    
    // If galleryData is already FormData, use it directly
    if (galleryData instanceof FormData) {
      console.log('Using existing FormData for gallery update')
      console.log('FormData entries:')
      for (let [key, value] of galleryData.entries()) {
        console.log(`  ${key}:`, value)
        if (value instanceof File) {
          console.log(`    File name: ${value.name}`)
          console.log(`    File size: ${value.size}`)
          console.log(`    File type: ${value.type}`)
        }
      }
      
      return await apiClient.put(`/api/gallery/${id}`, galleryData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        successMessage: 'Gallery updated successfully'
      })
    }
    
    // Otherwise, create FormData from object
    const formData = new FormData()
    formData.append('title', galleryData.title)
    if (galleryData.picture) {
      formData.append('picture', galleryData.picture)
    }

    console.log('Created new FormData for gallery update:')
    console.log('Title:', galleryData.title)
    console.log('Picture:', galleryData.picture)
    console.log('FormData entries:')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value)
      if (value instanceof File) {
        console.log(`    File name: ${value.name}`)
        console.log(`    File size: ${value.size}`)
        console.log(`    File type: ${value.type}`)
      }
    }

    return await apiClient.put(`/api/gallery/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      successMessage: 'Gallery updated successfully'
    })
  },

  /**
   * Delete gallery item
   * DELETE /api/gallery/{id}
   */
  delete: async (id) => {
    return await apiClient.delete(`/api/gallery/${id}`, {
      successMessage: 'Gallery item deleted successfully'
    })
  }
}

// ==================== TRAINER API ====================

export const trainerAPI = {
  /**
   * Get all trainers with pagination and filters
   * GET /api/trainer
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get('/api/trainer', { 
      params, 
      silent: true 
    })
    
    // Handle nested response structure
    if (response.success && response.data?.data) {
      return {
        ...response,
        data: response.data.data // Extract the actual data
      }
    }
    
    return response
  },

  /**
   * Get trainer by ID
   * GET /api/trainer/{id}
   */
  getById: async (id) => {
    return await apiClient.get(`/api/trainer/${id}`, { 
      silent: true 
    })
  },

  /**
   * Create new trainer
   * POST /api/trainer
   */
  create: async (trainerData) => {
    console.log('Creating trainer with data:', trainerData)
    console.log('Data type:', typeof trainerData)
    console.log('Is FormData:', trainerData instanceof FormData)
    
    // If trainerData is already FormData, use it directly
    if (trainerData instanceof FormData) {
      console.log('Using existing FormData for trainer')
      console.log('FormData entries:')
      for (let [key, value] of trainerData.entries()) {
        console.log(`  ${key}:`, value)
        if (value instanceof File) {
          console.log(`    File name: ${value.name}`)
          console.log(`    File size: ${value.size}`)
          console.log(`    File type: ${value.type}`)
        }
      }
      
      return await apiClient.post('/api/trainer', trainerData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        successMessage: 'Trainer created successfully'
      })
    }
    
    // Otherwise, create FormData from object
    const formData = new FormData()
    formData.append('title', trainerData.title)
    formData.append('description', trainerData.description)
    if (trainerData.instagram) {
      formData.append('instagram', trainerData.instagram)
    }
    if (trainerData.tiktok) {
      formData.append('tiktok', trainerData.tiktok)
    }
    if (trainerData.picture) {
      formData.append('picture', trainerData.picture)
    }

    console.log('Created new FormData for trainer:')
    console.log('Title:', trainerData.title)
    console.log('Description:', trainerData.description)
    console.log('Instagram:', trainerData.instagram)
    console.log('TikTok:', trainerData.tiktok)
    console.log('Picture:', trainerData.picture)
    console.log('FormData entries:')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value)
      if (value instanceof File) {
        console.log(`    File name: ${value.name}`)
        console.log(`    File size: ${value.size}`)
        console.log(`    File type: ${value.type}`)
      }
    }

    return await apiClient.post('/api/trainer', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      successMessage: 'Trainer created successfully'
    })
  },

  /**
   * Update trainer
   * PUT /api/trainer/{id}
   */
  update: async (id, trainerData) => {
    console.log('Updating trainer with data:', trainerData)
    console.log('Data type:', typeof trainerData)
    console.log('Is FormData:', trainerData instanceof FormData)
    
    // If trainerData is already FormData, use it directly
    if (trainerData instanceof FormData) {
      console.log('Using existing FormData for trainer update')
      console.log('FormData entries:')
      for (let [key, value] of trainerData.entries()) {
        console.log(`  ${key}:`, value)
        if (value instanceof File) {
          console.log(`    File name: ${value.name}`)
          console.log(`    File size: ${value.size}`)
          console.log(`    File type: ${value.type}`)
        }
      }
      
      return await apiClient.put(`/api/trainer/${id}`, trainerData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        successMessage: 'Trainer updated successfully'
      })
    }
    
    // Otherwise, create FormData from object
    const formData = new FormData()
    formData.append('title', trainerData.title)
    formData.append('description', trainerData.description)
    if (trainerData.instagram) {
      formData.append('instagram', trainerData.instagram)
    }
    if (trainerData.tiktok) {
      formData.append('tiktok', trainerData.tiktok)
    }
    if (trainerData.picture) {
      formData.append('picture', trainerData.picture)
    }

    console.log('Created new FormData for trainer update:')
    console.log('Title:', trainerData.title)
    console.log('Description:', trainerData.description)
    console.log('Instagram:', trainerData.instagram)
    console.log('TikTok:', trainerData.tiktok)
    console.log('Picture:', trainerData.picture)
    console.log('FormData entries:')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value)
      if (value instanceof File) {
        console.log(`    File name: ${value.name}`)
        console.log(`    File size: ${value.size}`)
        console.log(`    File type: ${value.type}`)
      }
    }

    return await apiClient.put(`/api/trainer/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      successMessage: 'Trainer updated successfully'
    })
  },

  /**
   * Delete trainer
   * DELETE /api/trainer/{id}
   */
  delete: async (id) => {
    return await apiClient.delete(`/api/trainer/${id}`, {
      successMessage: 'Trainer deleted successfully'
    })
  },

  /**
   * Delete trainer picture
   * DELETE /api/trainer/{id}/picture
   */
  deletePicture: async (id) => {
    return await apiClient.delete(`/api/trainer/${id}/picture`, {
      successMessage: 'Trainer picture deleted successfully'
    })
  }
}

// ==================== TESTIMONIAL API ====================

export const testimonialAPI = {
  /**
   * Get all testimonials with pagination and filters
   * GET /api/testimonial
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get('/api/testimonial', { 
      params, 
      silent: true 
    })
    
    // Handle nested response structure
    if (response.success && response.data?.data) {
      return {
        ...response,
        data: response.data.data // Extract the actual data
      }
    }
    
    return response
  },

  /**
   * Get testimonial by ID
   * GET /api/testimonial/{id}
   */
  getById: async (id) => {
    return await apiClient.get(`/api/testimonial/${id}`, { 
      silent: true 
    })
  },

  /**
   * Create new testimonial
   * POST /api/testimonial
   */
  create: async (testimonialData) => {
    console.log('Creating testimonial with data:', testimonialData)
    console.log('Data type:', typeof testimonialData)
    console.log('Is FormData:', testimonialData instanceof FormData)
    
    // If testimonialData is already FormData, convert to JSON
    if (testimonialData instanceof FormData) {
      console.log('Converting FormData to JSON for testimonial')
      const jsonData = {}
      for (let [key, value] of testimonialData.entries()) {
        jsonData[key] = value
      }
      console.log('Converted JSON data:', jsonData)
      
      return await apiClient.post('/api/testimonial', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
        successMessage: 'Testimonial created successfully'
      })
    }
    
    // Otherwise, use the object directly as JSON
    console.log('Using JSON data for testimonial:')
    console.log('Name:', testimonialData.name)
    console.log('Content:', testimonialData.content)
    console.log('Age:', testimonialData.age)

    return await apiClient.post('/api/testimonial', testimonialData, {
      headers: {
        'Content-Type': 'application/json',
      },
      successMessage: 'Testimonial created successfully'
    })
  },

  /**
   * Update testimonial
   * PUT /api/testimonial/{id}
   */
  update: async (id, testimonialData) => {
    console.log('Updating testimonial with data:', testimonialData)
    console.log('Data type:', typeof testimonialData)
    console.log('Is FormData:', testimonialData instanceof FormData)
    
    // If testimonialData is already FormData, convert to JSON
    if (testimonialData instanceof FormData) {
      console.log('Converting FormData to JSON for testimonial update')
      const jsonData = {}
      for (let [key, value] of testimonialData.entries()) {
        jsonData[key] = value
      }
      console.log('Converted JSON data:', jsonData)
      
      return await apiClient.put(`/api/testimonial/${id}`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
        successMessage: 'Testimonial updated successfully'
      })
    }
    
    // Otherwise, use the object directly as JSON
    console.log('Using JSON data for testimonial update:')
    console.log('Name:', testimonialData.name)
    console.log('Content:', testimonialData.content)
    console.log('Age:', testimonialData.age)

    return await apiClient.put(`/api/testimonial/${id}`, testimonialData, {
      headers: {
        'Content-Type': 'application/json',
      },
      successMessage: 'Testimonial updated successfully'
    })
  },

  /**
   * Delete testimonial
   * DELETE /api/testimonial/{id}
   */
  delete: async (id) => {
    return await apiClient.delete(`/api/testimonial/${id}`, {
      successMessage: 'Testimonial deleted successfully'
    })
  },

  /**
   * Delete testimonial picture
   * DELETE /api/testimonial/{id}/picture
   */
  deletePicture: async (id) => {
    return await apiClient.delete(`/api/testimonial/${id}/picture`, {
      successMessage: 'Testimonial picture deleted successfully'
    })
  }
}

// ==================== FAQ API ====================

export const faqAPI = {
  /**
   * Get all FAQs with pagination
   * GET /api/faq?page={page}&limit={limit}
   */
  getAll: async (page = 1, limit = 10) => {
    console.log('Fetching FAQs with pagination:', { page, limit })
    return await apiClient.get(`/api/faq?page=${page}&limit=${limit}`)
  },

  /**
   * Get FAQ by ID
   * GET /api/faq/{id}
   */
  getById: async (id) => {
    console.log('Fetching FAQ by ID:', id)
    return await apiClient.get(`/api/faq/${id}`)
  },

  /**
   * Create new FAQ
   * POST /api/faq
   */
  create: async (faqData) => {
    console.log('Creating FAQ with data:', faqData)
    console.log('Data type:', typeof faqData)
    console.log('Is FormData:', faqData instanceof FormData)
    
    // If faqData is already FormData, convert to JSON
    if (faqData instanceof FormData) {
      console.log('Converting FormData to JSON for FAQ')
      const jsonData = {}
      for (let [key, value] of faqData.entries()) {
        jsonData[key] = value
      }
      console.log('Converted JSON data:', jsonData)
      
      return await apiClient.post('/api/faq', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
        successMessage: 'FAQ created successfully'
      })
    }
    
    // Otherwise, use the object directly as JSON
    console.log('Using JSON data for FAQ:')
    console.log('Title:', faqData.title)
    console.log('Content:', faqData.content)

    return await apiClient.post('/api/faq', faqData, {
      headers: {
        'Content-Type': 'application/json',
      },
      successMessage: 'FAQ created successfully'
    })
  },

  /**
   * Update FAQ
   * PUT /api/faq/{id}
   */
  update: async (id, faqData) => {
    console.log('Updating FAQ with data:', faqData)
    console.log('Data type:', typeof faqData)
    console.log('Is FormData:', faqData instanceof FormData)
    
    // If faqData is already FormData, convert to JSON
    if (faqData instanceof FormData) {
      console.log('Converting FormData to JSON for FAQ update')
      const jsonData = {}
      for (let [key, value] of faqData.entries()) {
        jsonData[key] = value
      }
      console.log('Converted JSON data:', jsonData)
      
      return await apiClient.put(`/api/faq/${id}`, jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
        successMessage: 'FAQ updated successfully'
      })
    }
    
    // Otherwise, use the object directly as JSON
    console.log('Using JSON data for FAQ update:')
    console.log('Title:', faqData.title)
    console.log('Content:', faqData.content)

    return await apiClient.put(`/api/faq/${id}`, faqData, {
      headers: {
        'Content-Type': 'application/json',
      },
      successMessage: 'FAQ updated successfully'
    })
  },

  /**
   * Delete FAQ
   * DELETE /api/faq/{id}
   */
  delete: async (id) => {
    console.log('Deleting FAQ with ID:', id)
    return await apiClient.delete(`/api/faq/${id}`, {
      successMessage: 'FAQ deleted successfully'
    })
  }
}

// ==================== BLOG API ====================

export const blogAPI = {
  /**
   * Get all blogs with pagination and filters
   * GET /api/blog
   */
  getAll: async (params = {}) => {
    const response = await apiClient.get('/api/blog', { 
      params, 
      silent: true 
    })
    
    // Handle nested response structure
    if (response.success && response.data?.data) {
      return {
        ...response,
        data: response.data.data // Extract the actual data
      }
    }
    
    return response
  },

  /**
   * Get blog by ID
   * GET /api/blog/{id}
   */
  getById: async (id) => {
    console.log('Fetching blog by ID:', id)
    return await apiClient.get(`/api/blog/${id}`)
  },

  /**
   * Create new blog
   * POST /api/blog
   */
  create: async (blogData) => {
    console.log('Creating blog with data:', blogData)
    console.log('Data type:', typeof blogData)
    console.log('Is FormData:', blogData instanceof FormData)
    
    // If blogData is already FormData, use it directly
    if (blogData instanceof FormData) {
      console.log('Using existing FormData for blog')
      console.log('FormData entries:')
      for (let [key, value] of blogData.entries()) {
        console.log(`  ${key}:`, value)
        if (value instanceof File) {
          console.log(`    File name: ${value.name}`)
          console.log(`    File size: ${value.size}`)
          console.log(`    File type: ${value.type}`)
        }
      }
      
      return await apiClient.post('/api/blog', blogData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        successMessage: 'Blog created successfully'
      })
    }
    
    // Otherwise, create FormData from object
    const formData = new FormData()
    formData.append('title', blogData.title)
    formData.append('content', blogData.content)
    if (blogData.picture) {
      formData.append('picture', blogData.picture)
    }

    console.log('Created new FormData for blog:')
    console.log('Title:', blogData.title)
    console.log('Content:', blogData.content)
    console.log('Picture:', blogData.picture)
    console.log('FormData entries:')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value)
      if (value instanceof File) {
        console.log(`    File name: ${value.name}`)
        console.log(`    File size: ${value.size}`)
        console.log(`    File type: ${value.type}`)
      }
    }

    return await apiClient.post('/api/blog', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      successMessage: 'Blog created successfully'
    })
  },

  /**
   * Update blog
   * PUT /api/blog/{id}
   */
  update: async (id, blogData) => {
    console.log('Updating blog with data:', blogData)
    console.log('Data type:', typeof blogData)
    console.log('Is FormData:', blogData instanceof FormData)
    
    // If blogData is already FormData, use it directly
    if (blogData instanceof FormData) {
      console.log('Using existing FormData for blog update')
      console.log('FormData entries:')
      for (let [key, value] of blogData.entries()) {
        console.log(`  ${key}:`, value)
        if (value instanceof File) {
          console.log(`    File name: ${value.name}`)
          console.log(`    File size: ${value.size}`)
          console.log(`    File type: ${value.type}`)
        }
      }
      
      return await apiClient.put(`/api/blog/${id}`, blogData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        successMessage: 'Blog updated successfully'
      })
    }
    
    // Otherwise, create FormData from object
    const formData = new FormData()
    formData.append('title', blogData.title)
    formData.append('content', blogData.content)
    if (blogData.picture) {
      formData.append('picture', blogData.picture)
    }

    console.log('Created new FormData for blog update:')
    console.log('Title:', blogData.title)
    console.log('Content:', blogData.content)
    console.log('Picture:', blogData.picture)
    console.log('FormData entries:')
    for (let [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value)
      if (value instanceof File) {
        console.log(`    File name: ${value.name}`)
        console.log(`    File size: ${value.size}`)
        console.log(`    File type: ${value.type}`)
      }
    }

    return await apiClient.put(`/api/blog/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      successMessage: 'Blog updated successfully'
    })
  },

  /**
   * Delete blog
   * DELETE /api/blog/{id}
   */
  delete: async (id) => {
    console.log('Deleting blog with ID:', id)
    return await apiClient.delete(`/api/blog/${id}`, {
      successMessage: 'Blog deleted successfully'
    })
  }
}

// ==================== EXPORT ====================

export const websiteAPI = {
  banner: bannerAPI,
  gallery: galleryAPI,
  trainer: trainerAPI,
  testimonial: testimonialAPI,
  faq: faqAPI,
  blog: blogAPI
}

export default websiteAPI 