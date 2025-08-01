import { useState, useEffect, useCallback } from 'react'
import { useFormik } from 'formik'
import { websiteAPI, faqAPI, blogAPI } from './websiteAPI'
import { 
  bannerValidationSchema, 
  bannerUpdateValidationSchema,
  galleryValidationSchema,
  galleryUpdateValidationSchema,
  trainerValidationSchema,
  trainerUpdateValidationSchema,
  testimonialValidationSchema,
  testimonialUpdateValidationSchema,
  faqValidationSchema,
  faqUpdateValidationSchema,
  blogValidationSchema,
  blogUpdateValidationSchema
} from './websiteValidation'
import { useApiToast } from '@shared/hooks'
import { useWebsiteStore } from '@shared/store'

// ==================== BANNER HOOKS ====================

/**
 * Custom hook for banner management
 * @param {object} params - Query parameters
 * @returns {object} Banner state and actions
 */
export const useBanners = (params = {}) => {
  const store = useWebsiteStore()
  
  // Access data from store
  const banners = store.banners?.data || []
  const loading = store.banners?.loading || false
  const error = store.banners?.error
  const pagination = store.banners?.pagination
  
  const { showToast } = useApiToast()

  // Fetch banners - Remove store from dependencies to prevent infinite loop
  const fetchBanners = useCallback(async (searchParams = {}) => {
    try {
      store.setBannerLoading(true)
      
      const response = await websiteAPI.banner.getAll({
        page: searchParams.page || params.page || 1,
        limit: searchParams.limit || params.limit || 10,
        search: searchParams.search || params.search || '',
        ...searchParams
      })

      console.log('API Response:', response)
      console.log('Response data:', response.data)
      
      // Handle nested data structure
      const actualData = response.data.data || response.data
      console.log('Actual data:', actualData)
      console.log('Banners from API:', actualData?.banners)

      if (response.success) {
        store.setBannerData(
          actualData.banners || [],
          actualData.pagination
        )
        console.log('Store updated with banners:', actualData.banners)
      } else {
        store.setBannerError(response.message || 'Failed to fetch banners')
        // showToast('error', response.message || 'Failed to fetch banners')
      }
    } catch (err) {
      store.setBannerError(err.message || 'An error occurred while fetching banners')
      // showToast('error', err.message || 'An error occurred while fetching banners')
    }
  }, [params]) // Remove store from dependencies

  // Create banner - Remove store from dependencies
  const createBanner = useCallback(async (bannerData) => {
    try {
      console.log('useBanners - createBanner called with:', bannerData)
      
      const response = await websiteAPI.banner.create(bannerData)
      
      console.log('useBanners - createBanner response:', response)
      console.log('Response success:', response.success)
      console.log('Response data:', response.data)
      console.log('Response message:', response.message)
      
      if (response.success) {
        store.addBanner(response.data)
        // showToast('success', 'Banner created successfully')
        return { success: true, data: response.data }
      } else {
        // showToast('error', response.message || 'Failed to create banner')
        return { success: false, message: response.message }
      }
    } catch (err) {
      console.error('useBanners - createBanner error:', err)
      // showToast('error', err.message || 'An error occurred while creating banner')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Update banner - Remove store from dependencies
  const updateBanner = useCallback(async (id, bannerData) => {
    try {
      const response = await websiteAPI.banner.update(id, bannerData)
      
      if (response.success) {
        store.updateBanner(id, response.data)
        // showToast('success', 'Banner updated successfully')
        return { success: true, data: response.data }
      } else {
        // showToast('error', response.message || 'Failed to update banner')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while updating banner')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Delete banner - Remove store from dependencies
  const deleteBanner = useCallback(async (id) => {
    try {
      const response = await websiteAPI.banner.delete(id)
      
      if (response.success) {
        store.removeBanner(id)
        // showToast('success', 'Banner deleted successfully')
        return { success: true }
      } else {
        // showToast('error', response.message || 'Failed to delete banner')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while deleting banner')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Auto-fetch on mount - Only run once
  useEffect(() => {
    fetchBanners()
  }, []) // Empty dependency array - only run once

  // Ensure we return the correct structure
  return {
    banners: banners || [], // Ensure it's always an array
    loading: loading || false,
    error,
    pagination,
    fetchBanners,
    createBanner,
    updateBanner,
    deleteBanner
  }
}

/**
 * Custom hook for banner form
 * @param {object} initialValues - Initial form values
 * @param {boolean} isEdit - Whether editing existing banner
 * @returns {object} Form state and handlers
 */
export const useBannerForm = (initialValues = {}, isEdit = false) => {
  const { showToast } = useApiToast()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      picture: null,
      ...initialValues
    },
    enableReinitialize: true,
    validationSchema: isEdit ? bannerUpdateValidationSchema : bannerValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true)
      try {
        // Create FormData for file upload
        const formData = new FormData()
        formData.append('title', values.title)
        if (values.picture) {
          formData.append('picture', values.picture)
        }

        console.log('Form submitted:', values)
        console.log('FormData entries:')
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value)
        }
        
        // Note: API functions will be passed from parent component
        // This hook only handles form validation and FormData creation
        
        setSubmitting(false)
        // Don't reset form here - let parent handle it
      } catch (error) {
        setSubmitting(false)
        showToast('error', error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
  })

  return { formik, loading }
}

// ==================== GALLERY HOOKS ====================

/**
 * Custom hook for gallery management
 * @param {object} params - Query parameters
 * @returns {object} Gallery state and actions
 */
export const useGalleries = (params = {}) => {
  const store = useWebsiteStore()
  
  // Access data from store
  const galleries = store.galleries?.data || []
  const loading = store.galleries?.loading || false
  const error = store.galleries?.error
  const pagination = store.galleries?.pagination
  
  const { showToast } = useApiToast()

  // Fetch galleries - Remove store from dependencies
  const fetchGalleries = useCallback(async (searchParams = {}) => {
    try {
      store.setGalleryLoading(true)
      
      const response = await websiteAPI.gallery.getAll({
        page: searchParams.page || params.page || 1,
        limit: searchParams.limit || params.limit || 10,
        search: searchParams.search || params.search || '',
        ...searchParams
      })

      // Handle nested data structure
      const actualData = response.data.data || response.data

      if (response.success) {
        store.setGalleryData(
          actualData.galleries || [],
          actualData.pagination
        )
      } else {
        store.setGalleryError(response.message || 'Failed to fetch galleries')
        // showToast('error', response.message || 'Failed to fetch galleries')
      }
    } catch (err) {
      store.setGalleryError(err.message || 'An error occurred while fetching galleries')
      // showToast('error', err.message || 'An error occurred while fetching galleries')
    }
  }, [params]) // Remove store from dependencies

  // Create gallery - Remove store from dependencies
  const createGallery = useCallback(async (galleryData) => {
    try {
      const response = await websiteAPI.gallery.create(galleryData)
      
      if (response.success) {
        store.addGallery(response.data)
        // showToast('success', 'Gallery item created successfully')
        return { success: true, data: response.data }
      } else {
        // showToast('error', response.message || 'Failed to create gallery item')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while creating gallery item')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Update gallery - Remove store from dependencies
  const updateGallery = useCallback(async (id, galleryData) => {
    try {
      const response = await websiteAPI.gallery.update(id, galleryData)
      
      if (response.success) {
        store.updateGallery(id, response.data)
        // showToast('success', 'Gallery item updated successfully')
        return { success: true, data: response.data }
      } else {
        // showToast('error', response.message || 'Failed to update gallery item')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while updating gallery item')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Delete gallery - Remove store from dependencies
  const deleteGallery = useCallback(async (id) => {
    try {
      const response = await websiteAPI.gallery.delete(id)
      
      if (response.success) {
        store.removeGallery(id)
        // showToast('success', 'Gallery item deleted successfully')
        return { success: true }
      } else {
        // showToast('error', response.message || 'Failed to delete gallery item')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while deleting gallery item')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Auto-fetch on mount - Only run once
  useEffect(() => {
    fetchGalleries()
  }, []) // Empty dependency array - only run once

  return {
    galleries,
    loading,
    error,
    pagination,
    fetchGalleries,
    createGallery,
    updateGallery,
    deleteGallery
  }
}

/**
 * Custom hook for gallery form
 * @param {object} initialValues - Initial form values
 * @param {boolean} isEdit - Whether editing existing gallery
 * @returns {object} Form state and handlers
 */
export const useGalleryForm = (initialValues = {}, isEdit = false) => {
  const { showToast } = useApiToast()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      picture: null,
      ...initialValues
    },
    enableReinitialize: true,
    validationSchema: isEdit ? galleryUpdateValidationSchema : galleryValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true)
      try {
        // Handle form submission logic here
        setSubmitting(false)
        resetForm()
      } catch (error) {
        setSubmitting(false)
        showToast('error', error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
  })

  return { formik, loading }
}

// ==================== TRAINER HOOKS ====================

/**
 * Custom hook for trainer management
 * @param {object} params - Query parameters
 * @returns {object} Trainer state and actions
 */
export const useTrainers = (params = {}) => {
  const store = useWebsiteStore()
  
  // Access data from store
  const trainers = store.trainers?.data || []
  const loading = store.trainers?.loading || false
  const error = store.trainers?.error
  const pagination = store.trainers?.pagination
  
  const { showToast } = useApiToast()

  // Fetch trainers - Remove store from dependencies
  const fetchTrainers = useCallback(async (searchParams = {}) => {
    try {
      store.setTrainerLoading(true)
      
      const response = await websiteAPI.trainer.getAll({
        page: searchParams.page || params.page || 1,
        limit: searchParams.limit || params.limit || 10,
        search: searchParams.search || params.search || '',
        ...searchParams
      })

      // Handle nested data structure
      const actualData = response.data.data || response.data

      if (response.success) {
        store.setTrainerData(
          actualData.trainers || [],
          actualData.pagination
        )
      } else {
        store.setTrainerError(response.message || 'Failed to fetch trainers')
        // showToast('error', response.message || 'Failed to fetch trainers')
      }
    } catch (err) {
      store.setTrainerError(err.message || 'An error occurred while fetching trainers')
      // showToast('error', err.message || 'An error occurred while fetching trainers')
    }
  }, [params]) // Remove store from dependencies

  // Create trainer - Remove store from dependencies
  const createTrainer = useCallback(async (trainerData) => {
    try {
      console.log('useTrainers - createTrainer called with:', trainerData)
      
      const response = await websiteAPI.trainer.create(trainerData)
      
      console.log('useTrainers - createTrainer response:', response)
      console.log('Response success:', response.success)
      console.log('Response data:', response.data)
      console.log('Response message:', response.message)
      
      if (response.success) {
        store.addTrainer(response.data)
        // showToast('success', 'Trainer created successfully')
        return { success: true, data: response.data }
      } else {
        // showToast('error', response.message || 'Failed to create trainer')
        return { success: false, message: response.message }
      }
    } catch (err) {
      console.error('useTrainers - createTrainer error:', err)
      // showToast('error', err.message || 'An error occurred while creating trainer')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Update trainer - Remove store from dependencies
  const updateTrainer = useCallback(async (id, trainerData) => {
    try {
      const response = await websiteAPI.trainer.update(id, trainerData)
      
      if (response.success) {
        store.updateTrainer(id, response.data)
        // showToast('success', 'Trainer updated successfully')
        return { success: true, data: response.data }
      } else {
        // showToast('error', response.message || 'Failed to update trainer')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while updating trainer')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Delete trainer - Remove store from dependencies
  const deleteTrainer = useCallback(async (id) => {
    try {
      const response = await websiteAPI.trainer.delete(id)
      
      if (response.success) {
        store.removeTrainer(id)
        // showToast('success', 'Trainer deleted successfully')
        return { success: true }
      } else {
        // showToast('error', response.message || 'Failed to delete trainer')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while deleting trainer')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Auto-fetch on mount - Only run once
  useEffect(() => {
    fetchTrainers()
  }, []) // Empty dependency array - only run once

  return {
    trainers: trainers || [], // Ensure it's always an array
    loading: loading || false,
    error,
    pagination,
    fetchTrainers,
    createTrainer,
    updateTrainer,
    deleteTrainer
  }
}

/**
 * Custom hook for trainer form
 * @param {object} initialValues - Initial form values
 * @param {boolean} isEdit - Whether editing existing trainer
 * @returns {object} Form state and handlers
 */
export const useTrainerForm = (initialValues = {}, isEdit = false) => {
  const { showToast } = useApiToast()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      instagram: '',
      tiktok: '',
      rate_group_class: '',
      rate_semi_private_class: '',
      rate_private_class: '',
      picture: null,
      ...initialValues
    },
    enableReinitialize: true, // <--- Tambahkan ini!
    validationSchema: isEdit ? trainerUpdateValidationSchema : trainerValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true)
      try {
        // Create FormData for file upload
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('description', values.description)
        if (values.instagram) {
          formData.append('instagram', values.instagram)
        }
        if (values.tiktok) {
          formData.append('tiktok', values.tiktok)
        }
        formData.append('rate_group_class', values.rate_group_class)
        formData.append('rate_semi_private_class', values.rate_semi_private_class)
        formData.append('rate_private_class', values.rate_private_class)
        if (values.picture) {
          formData.append('picture', values.picture)
        }

        console.log('Form submitted:', values)
        console.log('FormData entries:')
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value)
        }
        
        // Note: API functions will be passed from parent component
        // This hook only handles form validation and FormData creation
        
        setSubmitting(false)
        // Don't reset form here - let parent handle it
      } catch (error) {
        setSubmitting(false)
        showToast('error', error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
  })

  return { formik, loading }
} 

// ==================== FAQ HOOKS ====================

/**
 * Custom hook for FAQ management
 * @param {object} params - Query parameters
 * @returns {object} FAQ state and actions
 */
export const useFaqs = (params = {}) => {
  const store = useWebsiteStore()
  
  // Access data from store
  const faqs = store.faqs?.data || []
  const loading = store.faqs?.loading || false
  const error = store.faqs?.error
  const pagination = store.faqs?.pagination
  
  const { showToast } = useApiToast()

  // Fetch FAQs - Remove store from dependencies
  const fetchFaqs = useCallback(async (searchParams = {}) => {
    try {
      store.setFaqLoading(true)
      
      const response = await faqAPI.getAll(
        searchParams.page || params.page || 1,
        searchParams.limit || params.limit || 10
      )

      console.log('FAQ API Response:', response)
      console.log('Response data:', response.data)
      
      // Handle nested data structure
      const actualData = response.data.data || response.data
      console.log('Actual FAQ data:', actualData)
      console.log('FAQs from API:', actualData?.faqs)

      if (response.success) {
        store.setFaqData(
          actualData.faqs || [],
          actualData.pagination
        )
        console.log('Store updated with FAQs:', actualData.faqs)
      } else {
        store.setFaqError(response.message || 'Failed to fetch FAQs')
        // showToast('error', response.message || 'Failed to fetch FAQs')
      }
    } catch (err) {
      store.setFaqError(err.message || 'An error occurred while fetching FAQs')
      // showToast('error', err.message || 'An error occurred while fetching FAQs')
    }
  }, [params]) // Remove store from dependencies

  // Create FAQ - Remove store from dependencies
  const createFaq = useCallback(async (faqData) => {
    try {
      console.log('useFaqs - createFaq called with:', faqData)
      
      const response = await faqAPI.create(faqData)
      
      console.log('useFaqs - createFaq response:', response)
      console.log('Response success:', response.success)
      console.log('Response data:', response.data)
      console.log('Response message:', response.message)
      
      if (response.success) {
        store.addFaq(response.data)
        // showToast('success', 'FAQ created successfully')
        return { success: true, data: response.data }
      } else {
        // showToast('error', response.message || 'Failed to create FAQ')
        return { success: false, message: response.message }
      }
    } catch (err) {
      console.error('useFaqs - createFaq error:', err)
      // showToast('error', err.message || 'An error occurred while creating FAQ')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Update FAQ - Remove store from dependencies
  const updateFaq = useCallback(async (id, faqData) => {
    try {
      const response = await faqAPI.update(id, faqData)
      
      if (response.success) {
        store.updateFaq(id, response.data)
        // showToast('success', 'FAQ updated successfully')
        return { success: true, data: response.data }
      } else {
        // showToast('error', response.message || 'Failed to update FAQ')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while updating FAQ')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Delete FAQ - Remove store from dependencies
  const deleteFaq = useCallback(async (id) => {
    try {
      const response = await faqAPI.delete(id)
      
      if (response.success) {
        store.removeFaq(id)
        // showToast('success', 'FAQ deleted successfully')
        return { success: true }
      } else {
        // showToast('error', response.message || 'Failed to delete FAQ')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while deleting FAQ')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Auto-fetch on mount - Only run once
  useEffect(() => {
    fetchFaqs()
  }, []) // Empty dependency array - only run once

  return {
    faqs: faqs || [], // Ensure it's always an array
    loading: loading || false,
    error,
    pagination,
    fetchFaqs,
    createFaq,
    updateFaq,
    deleteFaq
  }
}

/**
 * Custom hook for FAQ form
 * @param {object} initialValues - Initial form values
 * @param {boolean} isEdit - Whether editing existing FAQ
 * @returns {object} Form state and handlers
 */
export const useFaqForm = (initialValues = {}, isEdit = false) => {
  const { showToast } = useApiToast()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      ...initialValues
    },
    enableReinitialize: true,
    validationSchema: isEdit ? faqUpdateValidationSchema : faqValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true)
      try {
        // Create JSON data for API
        const jsonData = {
          title: values.title,
          content: values.content
        }

        console.log('Form submitted:', values)
        console.log('JSON data:', jsonData)
        
        // Note: API functions will be passed from parent component
        // This hook only handles form validation and JSON creation
        
        setSubmitting(false)
        // Don't reset form here - let parent handle it
      } catch (error) {
        setSubmitting(false)
        showToast('error', error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
  })

  return { formik, loading }
}

// ==================== TESTIMONIAL HOOKS ====================

/**
 * Custom hook for testimonial management
 * @param {object} params - Query parameters
 * @returns {object} Testimonial state and actions
 */
export const useTestimonials = (params = {}) => {
  const store = useWebsiteStore()
  
  // Access data from store
  const testimonials = store.testimonials?.data || []
  const loading = store.testimonials?.loading || false
  const error = store.testimonials?.error
  const pagination = store.testimonials?.pagination
  
  const { showToast } = useApiToast()

  // Fetch testimonials - Remove store from dependencies
  const fetchTestimonials = useCallback(async (searchParams = {}) => {
    try {
      store.setTestimonialLoading(true)
      
      const response = await websiteAPI.testimonial.getAll({
        page: searchParams.page || params.page || 1,
        limit: searchParams.limit || params.limit || 10,
        search: searchParams.search || params.search || '',
        ...searchParams
      })

      // Handle nested data structure
      const actualData = response.data.data || response.data

      if (response.success) {
        store.setTestimonialData(
          actualData.testimonials || [],
          actualData.pagination
        )
      } else {
        store.setTestimonialError(response.message || 'Failed to fetch testimonials')
        // showToast('error', response.message || 'Failed to fetch testimonials')
      }
    } catch (err) {
      store.setTestimonialError(err.message || 'An error occurred while fetching testimonials')
      // showToast('error', err.message || 'An error occurred while fetching testimonials')
    }
  }, [params]) // Remove store from dependencies

  // Create testimonial - Remove store from dependencies
  const createTestimonial = useCallback(async (testimonialData) => {
    try {
      console.log('useTestimonials - createTestimonial called with:', testimonialData)
      
      const response = await websiteAPI.testimonial.create(testimonialData)
      
      console.log('useTestimonials - createTestimonial response:', response)
      console.log('Response success:', response.success)
      console.log('Response data:', response.data)
      console.log('Response message:', response.message)
      
      if (response.success) {
        store.addTestimonial(response.data)
        // showToast('success', 'Testimonial created successfully')
        return { success: true, data: response.data }
      } else {
        // showToast('error', response.message || 'Failed to create testimonial')
        return { success: false, message: response.message }
      }
    } catch (err) {
      console.error('useTestimonials - createTestimonial error:', err)
      // showToast('error', err.message || 'An error occurred while creating testimonial')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Update testimonial - Remove store from dependencies
  const updateTestimonial = useCallback(async (id, testimonialData) => {
    try {
      const response = await websiteAPI.testimonial.update(id, testimonialData)
      
      if (response.success) {
        store.updateTestimonial(id, response.data)
        // showToast('success', 'Testimonial updated successfully')
        return { success: true, data: response.data }
      } else {
        // showToast('error', response.message || 'Failed to update testimonial')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while updating testimonial')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Delete testimonial - Remove store from dependencies
  const deleteTestimonial = useCallback(async (id) => {
    try {
      const response = await websiteAPI.testimonial.delete(id)
      
      if (response.success) {
        store.removeTestimonial(id)
        // showToast('success', 'Testimonial deleted successfully')
        return { success: true }
      } else {
        // showToast('error', response.message || 'Failed to delete testimonial')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while deleting testimonial')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Auto-fetch on mount - Only run once
  useEffect(() => {
    fetchTestimonials()
  }, []) // Empty dependency array - only run once

  return {
    testimonials: testimonials || [], // Ensure it's always an array
    loading: loading || false,
    error,
    pagination,
    fetchTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
  }
}

/**
 * Custom hook for testimonial form
 * @param {object} initialValues - Initial form values
 * @param {boolean} isEdit - Whether editing existing testimonial
 * @returns {object} Form state and handlers
 */
export const useTestimonialForm = (initialValues = {}, isEdit = false) => {
  const { showToast } = useApiToast()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      content: '',
      age: 25,
      ...initialValues
    },
    enableReinitialize: true,
    validationSchema: isEdit ? testimonialUpdateValidationSchema : testimonialValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true)
      try {
        // Create JSON data for API
        const jsonData = {
          name: values.name,
          content: values.content,
          age: values.age
        }

        console.log('Form submitted:', values)
        console.log('JSON data:', jsonData)
        
        // Note: API functions will be passed from parent component
        // This hook only handles form validation and JSON creation
        
        setSubmitting(false)
        // Don't reset form here - let parent handle it
      } catch (error) {
        setSubmitting(false)
        showToast('error', error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
  })

  return { formik, loading }
} 

// ==================== PUBLIC TESTIMONIAL HOOKS ====================

/**
 * Custom hook for public testimonial data (no pagination, all testimonials)
 * @returns {object} Testimonial state and actions
 */
export const usePublicTestimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { showToast } = useApiToast()

  // Fetch all testimonials for public display
  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await websiteAPI.testimonial.getAll({
        page: 1,
        limit: 100, // Get all testimonials
        search: ''
      })

      console.log('Public Testimonial API Response:', response)
      
      // Handle nested data structure
      const actualData = response.data.data || response.data
      const testimonialList = actualData.testimonials || []

      if (response.success) {
        setTestimonials(testimonialList)
        console.log('Public testimonials loaded:', testimonialList)
      } else {
        setError(response.message || 'Failed to fetch testimonials')
        showToast('error', response.message || 'Failed to fetch testimonials')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching testimonials')
      showToast('error', err.message || 'An error occurred while fetching testimonials')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  // Auto-fetch on mount
  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  return {
    testimonials: testimonials || [],
    loading,
    error,
    fetchTestimonials
  }
}

// ==================== PUBLIC FAQ HOOKS ====================

/**
 * Custom hook for public FAQ data (no pagination, all FAQs)
 * @returns {object} FAQ state and actions
 */
export const usePublicFaqs = () => {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { showToast } = useApiToast()

  // Fetch all FAQs for public display
  const fetchFaqs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await faqAPI.getAll(1, 100) // Get all FAQs

      console.log('Public FAQ API Response:', response)
      
      // Handle nested data structure
      const actualData = response.data.data || response.data
      const faqList = actualData.faqs || []

      if (response.success) {
        setFaqs(faqList)
        console.log('Public FAQs loaded:', faqList)
      } else {
        setError(response.message || 'Failed to fetch FAQs')
        showToast('error', response.message || 'Failed to fetch FAQs')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching FAQs')
      showToast('error', err.message || 'An error occurred while fetching FAQs')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  // Auto-fetch on mount
  useEffect(() => {
    fetchFaqs()
  }, [fetchFaqs])

  return {
    faqs: faqs || [],
    loading,
    error,
    fetchFaqs
  }
}

// ==================== PUBLIC TRAINER HOOKS ====================

/**
 * Custom hook for public trainer data (no pagination, all trainers)
 * @returns {object} Trainer state and actions
 */
export const usePublicTrainers = () => {
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { showToast } = useApiToast()

  // Fetch all trainers for public display
  const fetchTrainers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await websiteAPI.trainer.getAll({
        page: 1,
        limit: 100, // Get all trainers
        search: ''
      })

      console.log('Public Trainer API Response:', response)
      
      // Handle nested data structure
      const actualData = response.data.data || response.data
      const trainerList = actualData.trainers || []

      if (response.success) {
        setTrainers(trainerList)
        console.log('Public trainers loaded:', trainerList)
      } else {
        setError(response.message || 'Failed to fetch trainers')
        showToast('error', response.message || 'Failed to fetch trainers')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching trainers')
      showToast('error', err.message || 'An error occurred while fetching trainers')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  // Auto-fetch on mount
  useEffect(() => {
    fetchTrainers()
  }, [fetchTrainers])

  return {
    trainers: trainers || [],
    loading,
    error,
    fetchTrainers
  }
} 

// ==================== PUBLIC GALLERY HOOKS ====================

/**
 * Custom hook for public gallery data (no pagination, all galleries)
 * @returns {object} Gallery state and actions
 */
export const usePublicGalleries = () => {
  const [galleries, setGalleries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { showToast } = useApiToast()

  // Fetch all galleries for public display
  const fetchGalleries = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await websiteAPI.gallery.getAll({
        page: 1,
        limit: 100, // Get all galleries
        search: ''
      })

      console.log('Public Gallery API Response:', response)
      
      // Handle nested data structure
      const actualData = response.data.data || response.data
      const galleryList = actualData.galleries || []

      if (response.success) {
        setGalleries(galleryList)
        console.log('Public galleries loaded:', galleryList)
      } else {
        setError(response.message || 'Failed to fetch galleries')
        showToast('error', response.message || 'Failed to fetch galleries')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching galleries')
      showToast('error', err.message || 'An error occurred while fetching galleries')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  // Auto-fetch on mount
  useEffect(() => {
    fetchGalleries()
  }, [fetchGalleries])

  return {
    galleries: galleries || [],
    loading,
    error,
    fetchGalleries
  }
} 

// ==================== PUBLIC BANNER HOOKS ====================

/**
 * Custom hook for public banner data (no pagination, all banners)
 * @returns {object} Banner state and actions
 */
export const usePublicBanners = () => {
  const [banners, setBanners] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { showToast } = useApiToast()

  // Fetch all banners for public display
  const fetchBanners = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await websiteAPI.banner.getAll({
        page: 1,
        limit: 100, // Get all banners
        search: ''
      })

      console.log('Public Banner API Response:', response)
      
      // Handle nested data structure
      const actualData = response.data.data || response.data
      const bannerList = actualData.banners || []

      if (response.success) {
        setBanners(bannerList)
        console.log('Public banners loaded:', bannerList)
      } else {
        setError(response.message || 'Failed to fetch banners')
        showToast('error', response.message || 'Failed to fetch banners')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching banners')
      showToast('error', err.message || 'An error occurred while fetching banners')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  // Auto-fetch on mount
  useEffect(() => {
    fetchBanners()
  }, [fetchBanners])

  return {
    banners: banners || [],
    loading,
    error,
    fetchBanners
  }
} 

// ==================== BLOG HOOKS ====================

/**
 * Custom hook for blog management
 * @param {object} params - Query parameters
 * @returns {object} Blog state and actions
 */
export const useBlogs = (params = {}) => {
  const store = useWebsiteStore()
  
  // Access data from store
  const blogs = store.blogs?.data || []
  const loading = store.blogs?.loading || false
  const error = store.blogs?.error
  const pagination = store.blogs?.pagination
  
  const { showToast } = useApiToast()

  // Fetch blogs - Remove store from dependencies to prevent infinite loop
  const fetchBlogs = useCallback(async (searchParams = {}) => {
    try {
      store.setBlogLoading(true)
      
      const response = await websiteAPI.blog.getAll({
        page: searchParams.page || params.page || 1,
        limit: searchParams.limit || params.limit || 10,
        search: searchParams.search || params.search || '',
        ...searchParams
      })

      console.log('API Response:', response)
      console.log('Response data:', response.data)
      
      // Handle nested data structure
      const actualData = response.data.data || response.data
      console.log('Actual data:', actualData)
      console.log('Blogs from API:', actualData?.blogs)

      if (response.success) {
        store.setBlogData(
          actualData.blogs || [],
          actualData.pagination
        )
        console.log('Store updated with blogs:', actualData.blogs)
      } else {
        store.setBlogError(response.message || 'Failed to fetch blogs')
        // showToast('error', response.message || 'Failed to fetch blogs')
      }
    } catch (err) {
      store.setBlogError(err.message || 'An error occurred while fetching blogs')
      // showToast('error', err.message || 'An error occurred while fetching blogs')
    }
  }, [params]) // Remove store from dependencies

  // Create blog - Remove store from dependencies
  const createBlog = useCallback(async (blogData) => {
    try {
      console.log('useBlogs - createBlog called with:', blogData)
      
      const response = await websiteAPI.blog.create(blogData)
      
      console.log('useBlogs - createBlog response:', response)
      console.log('Response success:', response.success)
      console.log('Response data:', response.data)
      console.log('Response message:', response.message)
      
      if (response.success) {
        // Handle nested data structure
        const blogData = response.data.data || response.data
        store.addBlog(blogData)
        // showToast('success', 'Blog created successfully')
        return { success: true, data: blogData }
      } else {
        // showToast('error', response.message || 'Failed to create blog')
        return { success: false, message: response.message }
      }
    } catch (err) {
      console.error('useBlogs - createBlog error:', err)
      // showToast('error', err.message || 'An error occurred while creating blog')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Update blog - Remove store from dependencies
  const updateBlog = useCallback(async (id, blogData) => {
    try {
      const response = await websiteAPI.blog.update(id, blogData)
      
      if (response.success) {
        // Handle nested data structure
        const updatedBlogData = response.data.data || response.data
        store.updateBlog(id, updatedBlogData)
        // showToast('success', 'Blog updated successfully')
        return { success: true, data: updatedBlogData }
      } else {
        // showToast('error', response.message || 'Failed to update blog')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while updating blog')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Delete blog - Remove store from dependencies
  const deleteBlog = useCallback(async (id) => {
    try {
      const response = await websiteAPI.blog.delete(id)
      
      if (response.success) {
        store.removeBlog(id)
        // showToast('success', 'Blog deleted successfully')
        return { success: true }
      } else {
        // showToast('error', response.message || 'Failed to delete blog')
        return { success: false, message: response.message }
      }
    } catch (err) {
      // showToast('error', err.message || 'An error occurred while deleting blog')
      return { success: false, message: err.message }
    }
  }, []) // Remove store from dependencies

  // Auto-fetch on mount - Only run once
  useEffect(() => {
    fetchBlogs()
  }, []) // Empty dependency array - only run once

  // Ensure we return the correct structure
  return {
    blogs: blogs || [], // Ensure it's always an array
    loading: loading || false,
    error,
    pagination,
    fetchBlogs,
    createBlog,
    updateBlog,
    deleteBlog
  }
}

/**
 * Custom hook for blog form
 * @param {object} initialValues - Initial form values
 * @param {boolean} isEdit - Whether editing existing blog
 * @returns {object} Form state and handlers
 */
export const useBlogForm = (initialValues = {}, isEdit = false) => {
  const { showToast } = useApiToast()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      picture: null,
      ...initialValues
    },
    enableReinitialize: true,
    validationSchema: isEdit ? blogUpdateValidationSchema : blogValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true)
      try {
        // Create FormData for file upload
        const formData = new FormData()
        formData.append('title', values.title)
        formData.append('content', values.content)
        if (values.picture) {
          formData.append('picture', values.picture)
        }

        console.log('Form submitted:', values)
        console.log('FormData entries:')
        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value)
        }
        
        // Note: API functions will be passed from parent component
        // This hook only handles form validation and FormData creation
        
        setSubmitting(false)
        // Don't reset form here - let parent handle it
      } catch (error) {
        setSubmitting(false)
        showToast('error', error.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
  })

  return { formik, loading }
}

// ==================== PUBLIC BLOG HOOKS ====================

/**
 * Custom hook for public blog data (no pagination, all blogs)
 * @returns {object} Blog state and actions
 */
export const usePublicBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const { showToast } = useApiToast()

  // Fetch all blogs for public display
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await websiteAPI.blog.getAll({
        page: 1,
        limit: 100, // Get all blogs
        search: ''
      })

      console.log('Public Blog API Response:', response)
      
      // Handle nested data structure
      const actualData = response.data.data || response.data
      const blogList = actualData.blogs || []

      if (response.success) {
        setBlogs(blogList)
        console.log('Public blogs loaded:', blogList)
      } else {
        setError(response.message || 'Failed to fetch blogs')
        showToast('error', response.message || 'Failed to fetch blogs')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching blogs')
      showToast('error', err.message || 'An error occurred while fetching blogs')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  // Auto-fetch on mount
  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  return {
    blogs: blogs || [],
    loading,
    error,
    fetchBlogs
  }
} 