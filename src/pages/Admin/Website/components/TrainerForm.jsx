import React, { useState, useEffect } from 'react'
import { Button, Modal } from '@components/ui'
import { useTrainerForm } from '../api'
import { useApiToast } from '@shared/hooks'

const TrainerForm = ({ isOpen, onClose, trainer = null, onSuccess, createTrainer, updateTrainer, fetchTrainers }) => {
  const isEdit = !!trainer
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
    return `${baseURL}/uploads/trainers/${imagePath}`
  }
  
  const { formik, loading } = useTrainerForm(
    trainer ? {
      title: trainer.title,
      description: trainer.description,
      instagram: trainer.instagram,
      tiktok: trainer.tiktok,
      picture: trainer.picture // Pertahankan picture yang sudah ada
    } : {},
    isEdit
  )
  const [imagePreview, setImagePreview] = useState(trainer?.picture ? getImageUrl(trainer.picture) : null)

  // Tambahkan efek ini agar imagePreview update saat trainer berubah
  useEffect(() => {
    // Jika ada trainer picture, gunakan full URL
    if (trainer?.picture) {
      setImagePreview(getImageUrl(trainer.picture))
    } else {
      setImagePreview(null)
    }
  }, [trainer])

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
      if (isEdit && trainer?.picture) {
        formik.setFieldValue('picture', trainer.picture)
        setImagePreview(getImageUrl(trainer.picture))
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
        // For edit mode, compare with original trainer data
        if (values.title !== trainer.title) {
          formData.append('title', values.title)
          console.log('Title changed:', values.title)
        }
        
        if (values.description !== trainer.description) {
          formData.append('description', values.description)
          console.log('Description changed:', values.description)
        }
        
        if (values.instagram !== trainer.instagram) {
          if (values.instagram) {
            formData.append('instagram', values.instagram)
          }
          console.log('Instagram changed:', values.instagram)
        }
        
        if (values.tiktok !== trainer.tiktok) {
          if (values.tiktok) {
            formData.append('tiktok', values.tiktok)
          }
          console.log('TikTok changed:', values.tiktok)
        }
        
        // Handle picture changes
        if (values.picture instanceof File) {
          // New file selected
          formData.append('picture', values.picture)
          console.log('New picture selected')
        } else if (values.picture !== trainer.picture) {
          // Picture path changed (shouldn't happen normally)
          formData.append('picture', values.picture)
          console.log('Picture path changed')
        }
        // If picture is the same, don't append anything
      } else {
        // For create mode, append all required fields
      formData.append('title', values.title)
      formData.append('description', values.description)
      if (values.instagram) {
        formData.append('instagram', values.instagram)
      }
      if (values.tiktok) {
        formData.append('tiktok', values.tiktok)
        }
        if (values.picture) {
          formData.append('picture', values.picture)
        }
      }
      
      console.log('Form values:', values)
      console.log('Original trainer data:', trainer)
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
        ? await updateTrainer(trainer.id, formData)
        : await createTrainer(formData)
      
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
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Trainer' : 'Add Trainer'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Title
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
              placeholder="Enter trainer title"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
            )}
          </div>
        </div>

        {/* Picture Field (moved here) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="picture" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Picture
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
          </div>
        </div>

        {/* Description Field */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Description
          </label>
          <div className="flex-1">
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                formik.touched.description && formik.errors.description
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="Enter trainer description"
            />
            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.description}</p>
            )}
          </div>
        </div>

        {/* Instagram Field */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Instagram URL
          </label>
          <div className="flex-1">
            <input
              id="instagram"
              name="instagram"
              type="url"
              value={formik.values.instagram}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                formik.touched.instagram && formik.errors.instagram
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="https://instagram.com/username"
            />
            {formik.touched.instagram && formik.errors.instagram && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.instagram}</p>
            )}
          </div>
        </div>

        {/* TikTok Field */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
            TikTok URL
          </label>
          <div className="flex-1">
            <input
              id="tiktok"
              name="tiktok"
              type="url"
              value={formik.values.tiktok}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                formik.touched.tiktok && formik.errors.tiktok
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="https://tiktok.com/@username"
            />
            {formik.touched.tiktok && formik.errors.tiktok && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.tiktok}</p>
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
            {isEdit ? 'Save' : 'Create Trainer'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default TrainerForm 