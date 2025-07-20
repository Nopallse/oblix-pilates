import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Types (for better structure)
const createInitialState = () => ({
  banners: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  },
  galleries: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  },
  trainers: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  },
  testimonials: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  },
  faqs: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  },
  blogs: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0
    }
  }
})

export const useWebsiteStore = create(
  devtools(
    persist(
      immer((set, get) => ({
        // Initial state
        ...createInitialState(),

        // ==================== BANNER ACTIONS ====================
        setBannerLoading: (loading) => set((state) => {
          state.banners.loading = loading
        }),

        setBannerData: (data, pagination = null) => set((state) => {
          state.banners.data = data
          if (pagination) {
            state.banners.pagination = { ...state.banners.pagination, ...pagination }
          }
          state.banners.loading = false
          state.banners.error = null
        }),

        setBannerError: (error) => set((state) => {
          state.banners.error = error
          state.banners.loading = false
        }),

        addBanner: (banner) => set((state) => {
          state.banners.data.unshift(banner)
        }),

        updateBanner: (id, updatedBanner) => set((state) => {
          const index = state.banners.data.findIndex(banner => banner.id === id)
          if (index !== -1) {
            state.banners.data[index] = { ...state.banners.data[index], ...updatedBanner }
          }
        }),

        removeBanner: (id) => set((state) => {
          state.banners.data = state.banners.data.filter(banner => banner.id !== id)
        }),

        clearBanners: () => set((state) => {
          state.banners = createInitialState().banners
        }),

        // ==================== GALLERY ACTIONS ====================
        setGalleryLoading: (loading) => set((state) => {
          state.galleries.loading = loading
        }),

        setGalleryData: (data, pagination = null) => set((state) => {
          state.galleries.data = data
          if (pagination) {
            state.galleries.pagination = { ...state.galleries.pagination, ...pagination }
          }
          state.galleries.loading = false
          state.galleries.error = null
        }),

        setGalleryError: (error) => set((state) => {
          state.galleries.error = error
          state.galleries.loading = false
        }),

        addGallery: (gallery) => set((state) => {
          state.galleries.data.unshift(gallery)
        }),

        updateGallery: (id, updatedGallery) => set((state) => {
          const index = state.galleries.data.findIndex(gallery => gallery.id === id)
          if (index !== -1) {
            state.galleries.data[index] = { ...state.galleries.data[index], ...updatedGallery }
          }
        }),

        removeGallery: (id) => set((state) => {
          state.galleries.data = state.galleries.data.filter(gallery => gallery.id !== id)
        }),

        clearGalleries: () => set((state) => {
          state.galleries = createInitialState().galleries
        }),

        // ==================== TRAINER ACTIONS ====================
        setTrainerLoading: (loading) => set((state) => {
          state.trainers.loading = loading
        }),

        setTrainerData: (data, pagination = null) => set((state) => {
          state.trainers.data = data
          if (pagination) {
            state.trainers.pagination = { ...state.trainers.pagination, ...pagination }
          }
          state.trainers.loading = false
          state.trainers.error = null
        }),

        setTrainerError: (error) => set((state) => {
          state.trainers.error = error
          state.trainers.loading = false
        }),

        addTrainer: (trainer) => set((state) => {
          state.trainers.data.unshift(trainer)
        }),

        updateTrainer: (id, updatedTrainer) => set((state) => {
          const index = state.trainers.data.findIndex(trainer => trainer.id === id)
          if (index !== -1) {
            state.trainers.data[index] = { ...state.trainers.data[index], ...updatedTrainer }
          }
        }),

        removeTrainer: (id) => set((state) => {
          state.trainers.data = state.trainers.data.filter(trainer => trainer.id !== id)
        }),

        clearTrainers: () => set((state) => {
          state.trainers = createInitialState().trainers
        }),

        // ==================== TESTIMONIAL ACTIONS ====================
        setTestimonialLoading: (loading) => set((state) => {
          state.testimonials.loading = loading
        }),

        setTestimonialData: (data, pagination = null) => set((state) => {
          state.testimonials.data = data
          if (pagination) {
            state.testimonials.pagination = { ...state.testimonials.pagination, ...pagination }
          }
          state.testimonials.loading = false
          state.testimonials.error = null
        }),

        setTestimonialError: (error) => set((state) => {
          state.testimonials.error = error
          state.testimonials.loading = false
        }),

        addTestimonial: (testimonial) => set((state) => {
          state.testimonials.data.unshift(testimonial)
        }),

        updateTestimonial: (id, updatedTestimonial) => set((state) => {
          const index = state.testimonials.data.findIndex(testimonial => testimonial.id === id)
          if (index !== -1) {
            state.testimonials.data[index] = { ...state.testimonials.data[index], ...updatedTestimonial }
          }
        }),

        removeTestimonial: (id) => set((state) => {
          state.testimonials.data = state.testimonials.data.filter(testimonial => testimonial.id !== id)
        }),

        clearTestimonials: () => set((state) => {
          state.testimonials = createInitialState().testimonials
        }),

        // ==================== FAQ ACTIONS ====================
        setFaqLoading: (loading) => set((state) => {
          state.faqs.loading = loading
        }),

        setFaqData: (data, pagination = null) => set((state) => {
          state.faqs.data = data
          if (pagination) {
            state.faqs.pagination = { ...state.faqs.pagination, ...pagination }
          }
          state.faqs.loading = false
          state.faqs.error = null
        }),

        setFaqError: (error) => set((state) => {
          state.faqs.error = error
          state.faqs.loading = false
        }),

        addFaq: (faq) => set((state) => {
          state.faqs.data.unshift(faq)
        }),

        updateFaq: (id, updatedFaq) => set((state) => {
          const index = state.faqs.data.findIndex(faq => faq.id === id)
          if (index !== -1) {
            state.faqs.data[index] = { ...state.faqs.data[index], ...updatedFaq }
          }
        }),

        removeFaq: (id) => set((state) => {
          state.faqs.data = state.faqs.data.filter(faq => faq.id !== id)
        }),

        clearFaqs: () => set((state) => {
          state.faqs = createInitialState().faqs
        }),

        // ==================== BLOG ACTIONS ====================
        setBlogLoading: (loading) => set((state) => {
          state.blogs.loading = loading
        }),

        setBlogData: (data, pagination = null) => set((state) => {
          state.blogs.data = data
          if (pagination) {
            state.blogs.pagination = { ...state.blogs.pagination, ...pagination }
          }
          state.blogs.loading = false
          state.blogs.error = null
        }),

        setBlogError: (error) => set((state) => {
          state.blogs.error = error
          state.blogs.loading = false
        }),

        addBlog: (blog) => set((state) => {
          state.blogs.data.unshift(blog)
        }),

        updateBlog: (id, updatedBlog) => set((state) => {
          const index = state.blogs.data.findIndex(blog => blog.id === id)
          if (index !== -1) {
            state.blogs.data[index] = { ...state.blogs.data[index], ...updatedBlog }
          }
        }),

        removeBlog: (id) => set((state) => {
          state.blogs.data = state.blogs.data.filter(blog => blog.id !== id)
        }),

        clearBlogs: () => set((state) => {
          state.blogs = createInitialState().blogs
        }),

        // ==================== GLOBAL ACTIONS ====================
        
        // Clear all website data
        clearAll: () => set(() => createInitialState()),

        // Reset specific section
        reset: (section) => set((state) => {
          const initialState = createInitialState()
          if (section === 'banners') {
            state.banners = initialState.banners
          } else if (section === 'galleries') {
            state.galleries = initialState.galleries
          } else if (section === 'trainers') {
            state.trainers = initialState.trainers
          } else if (section === 'testimonials') {
            state.testimonials = initialState.testimonials
          } else if (section === 'faqs') {
            state.faqs = initialState.faqs
          } else if (section === 'blogs') {
            state.blogs = initialState.blogs
          }
        }),

        // Get state for specific section
        getState: (section) => {
          const state = get()
          return state[section]
        }
      })),
      {
        name: 'website-store',
        partialize: (state) => ({
          // Only persist pagination settings, not the actual data
          banners: { pagination: state.banners.pagination },
          galleries: { pagination: state.galleries.pagination },
          trainers: { pagination: state.trainers.pagination },
          testimonials: { pagination: state.testimonials.pagination },
          faqs: { pagination: state.faqs.pagination },
          blogs: { pagination: state.blogs.pagination }
        })
      }
    ),
    {
      name: 'website-store'
    }
  )
) 