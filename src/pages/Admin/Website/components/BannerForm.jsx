import React, { useState, useEffect } from 'react'
import { Button, Modal } from '@components/ui'
import { useBannerForm } from '../api'
import { useApiToast } from '@shared/hooks'

const BannerForm = ({ isOpen, onClose, banner = null, onSuccess, createBanner, updateBanner, fetchBanners }) => {
  const isEdit = !!banner
  const { showToast } = useApiToast()
  
  // Helper function to construct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // Construct full URL with API base URL
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://34.101.143.2:3020'
    return `${baseURL}/uploads/banners/${imagePath}`
  }
  
  const { formik, loading } = useBannerForm(
    banner ? {
      title: banner.title,
      picture: banner.picture
    } : {},
    isEdit,
    { enableReinitialize: true }
  )
  const [imagePreview, setImagePreview] = useState(banner?.picture || null)

  // Tambahkan efek ini agar imagePreview update saat banner berubah
  useEffect(() => {
    // Jika ada banner picture, gunakan full URL
    if (banner?.picture) {
      setImagePreview(getImageUrl(banner.picture))
    } else {
      setImagePreview(null)
    }
  }, [banner])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    console.log('File selected:', file)
    
    if (file) {
      // Set the file in formik
      formik.setFieldValue('picture', file)
      console.log('File set in formik:', formik.values.picture)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        console.log('Preview created')
      }
      reader.readAsDataURL(file)
    } else {
      // Clear the file but keep existing picture if in edit mode
      if (isEdit && banner?.picture) {
        formik.setFieldValue('picture', banner.picture)
        setImagePreview(getImageUrl(banner.picture))
        console.log('Kept existing picture for edit mode')
      } else {
      formik.setFieldValue('picture', null)
      setImagePreview(null)
      console.log('File cleared')
      }
    }
  }

  const handleFormSubmit = async (values) => {
    try {
      // Create FormData for file upload
      const formData = new FormData()
      
      // Only append fields that have changed
      if (isEdit) {
        // For edit mode, compare with original banner data
        if (values.title !== banner.title) {
          formData.append('title', values.title)
          console.log('Title changed:', values.title)
        }
        
        // Handle picture changes
        if (values.picture instanceof File) {
          // New file selected
          formData.append('picture', values.picture)
          console.log('New picture selected')
        } else if (values.picture !== banner.picture) {
          // Picture path changed (shouldn't happen normally)
        formData.append('picture', values.picture)
          console.log('Picture path changed')
        }
        // If picture is the same, don't append anything
      } else {
        // For create mode, append all required fields
        formData.append('title', values.title)
        if (values.picture) {
          formData.append('picture', values.picture)
        }
      }
      
      console.log('Form values:', values)
      console.log('Original banner data:', banner)
      console.log('FormData entries:')
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value)
        if (value instanceof File) {
          console.log(`  File name: ${value.name}`)
          console.log(`  File size: ${value.size}`)
          console.log(`  File type: ${value.type}`)
        }
      }
      
      // Check if there are any changes
      if (isEdit && formData.entries().next().done) {
        console.log('No changes detected')
        showToast('info', 'No changes to update')
        onClose()
        return
      }
      
      // Call the API function with FormData directly
      const result = isEdit 
        ? await updateBanner(banner.id, formData)
        : await createBanner(formData)
      
      if (result.success) {
        onSuccess()
        onClose()
      }
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  // Override formik onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form first
    const errors = await formik.validateForm()
    if (Object.keys(errors).length === 0) {
      // Form is valid, proceed with submission
      await handleFormSubmit(formik.values)
    } else {
      // Show validation errors
      formik.setTouched(errors)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Banner' : 'Add Banner'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Title *
          </label>
          <div className="flex-1">
            <input
              id="title"
              name="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                formik.touched.title && formik.errors.title
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="Enter banner title"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
            )}
          </div>
        </div>

        {/* Picture Field */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="picture" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Picture {!isEdit && '*'}
          </label>
          <div className="flex-1">
            <input
              id="picture"
              name="picture"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                formik.touched.picture && formik.errors.picture
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-primary'
              }`}
            />
            {formik.touched.picture && formik.errors.picture && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.picture}</p>
            )}
            {/* Image Preview */}
            {(imagePreview || banner?.picture) && (
              <div className="mt-3">
                <img
                  src={imagePreview || getImageUrl(banner?.picture)}
                  alt="Preview"
                  className="w-32 h-24 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGM0Y0RjYiLz4KPHBhdGggZD0iTTI0IDEyQzI3LjMxMzcgMTIgMzAgMTQuNjg2MyAzMCAxOEMzMCAyMS4zMTM3IDI3LjMxMzcgMjQgMjQgMjRDMjAuNjg2MyAyNCAxOCAyMS4zMTM3IDE4IDE4QzE4IDE0LjY4NjMgMjAuNjg2MyAxMiAyNCAxMloiIGZpbGw9IiM5QjlCQTAiLz4KPHBhdGggZD0iTTEyIDQwQzEyIDM0LjQ3NzIgMTYuNDc3MiAzMCAyMiAzMEgyNkMzMS41MjI4IDMwIDM2IDM0LjQ3NzIgMzYgNDBIMTJaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo='
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            {isEdit ? 'Update Banner' : 'Create Banner'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default BannerForm 