import React, { useState, useEffect } from 'react'
import { useBlogForm } from '../api'
import { Button, Modal } from '@components/ui'
import { useApiToast } from '@shared/hooks'


const BlogForm = ({ isOpen, onClose, blog = null, onSuccess, createBlog, updateBlog, fetchBlogs }) => {
  const isEdit = !!blog
  const { showToast } = useApiToast()
  

  // Get image URL for preview
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    return `${import.meta.env.VITE_API_BASE_URL || 'http://34.101.143.2:3020'}/uploads/blogs/${imagePath}`
  }


  const { formik, loading } = useBlogForm(
    blog ? {
      title: blog.title,
      content: blog.content,
      picture: blog.picture
    } : {},
    isEdit,
    { enableReinitialize: true }
  )

  const [imagePreview, setImagePreview] = useState(blog?.picture || null)


  // Reset form when modal opens/closes
  useEffect(() => {
    if (blog?.picture) {
      setImagePreview(getImageUrl(blog.picture))
    } else {
      setImagePreview(null)
    }
  }, [blog])

  // Handle image change
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
      if (isEdit && blog?.picture) {
        formik.setFieldValue('picture', blog.picture)
        setImagePreview(getImageUrl(blog.picture))
        console.log('Kept existing picture for edit mode')
      } else {
      formik.setFieldValue('picture', null)
      setImagePreview(null)
      console.log('File cleared')
      }
    }
  }

  // Handle form submission
  const handleFormSubmit = async (values) => {
    try {
      // Create FormData for file upload
      const formData = new FormData()
      
      // Only append fields that have changed
      if (isEdit) {
        // For edit mode, compare with original blog data
        if (values.title !== blog.title) {
          formData.append('title', values.title)
          console.log('Title changed:', values.title)
        }
        
        if (values.content !== blog.content) {
          formData.append('content', values.content)
          console.log('Content changed:', values.content)
        }
        
        // Handle picture changes
        if (values.picture instanceof File) {
          // New file selected
          formData.append('picture', values.picture)
          console.log('New picture selected')
        } else if (values.picture !== blog.picture) {
          // Picture path changed (shouldn't happen normally)
          formData.append('picture', values.picture)
          console.log('Picture path changed')
        }
        // If picture is the same, don't append anything
      } else {
        // For create mode, append all required fields
        formData.append('title', values.title)
        formData.append('content', values.content)
        if (values.picture) {
          formData.append('picture', values.picture)
        }
      }
      
      console.log('Form values:', values)
      console.log('Original blog data:', blog)
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
        ? await updateBlog(blog.id, formData)
        : await createBlog(formData)
      
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
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Blog' : 'Add Blog'}>
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
              placeholder="Enter blog title"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
            )}
          </div>
        </div>

        {/* Content Field */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-0 sm:w-40">
            Content *
          </label>
          <div className="flex-1">
            <textarea
              id="content"
              name="content"
              rows={4}
              value={formik.values.content}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                formik.touched.content && formik.errors.content
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-primary'
              }`}
              placeholder="Enter blog content"
            />
            {formik.touched.content && formik.errors.content && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.content}</p>
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
            {(imagePreview || blog?.picture) && (
              <div className="mt-3">
                <img
                  src={imagePreview || getImageUrl(blog?.picture)}
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
            {isEdit ? 'Update Blog' : 'Create Blog'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default BlogForm 