import React, { useState, useEffect } from 'react'
import { Button, Modal } from '@components/ui'
import { useFaqForm } from '../api'
import { useApiToast } from '@shared/hooks'

const FAQForm = ({ isOpen, onClose, faq = null, onSuccess, createFaq, updateFaq, fetchFaqs }) => {
  const isEdit = !!faq
  const { showToast } = useApiToast()
  const { formik, loading } = useFaqForm(
    faq ? {
      title: faq.title,
      content: faq.content
    } : {},
    isEdit
  )

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
        formik.resetForm()
    }
  }, [isOpen]) // Remove formik from dependencies

  const handleFormSubmit = async (values) => {
    try {
      // Create JSON data for API
      const jsonData = {}
      
      // Only append fields that have changed
      if (isEdit) {
        // For edit mode, compare with original FAQ data
        if (values.title !== faq.title) {
          jsonData.title = values.title
          console.log('Title changed:', values.title)
        }
        
        if (values.content !== faq.content) {
          jsonData.content = values.content
          console.log('Content changed:', values.content)
        }
      } else {
        // For create mode, append all required fields
        jsonData.title = values.title
        jsonData.content = values.content
      }
      
      console.log('Form values:', values)
      console.log('Original FAQ data:', faq)
      console.log('JSON data to send:', jsonData)
      
      // Check if there are any changes
      if (isEdit && Object.keys(jsonData).length === 0) {
        console.log('No changes detected')
        showToast('info', 'No changes to update')
        onClose()
        return
      }
      
      // Call the API function with JSON data directly
      const result = isEdit 
        ? await updateFaq(faq.id, jsonData)
        : await createFaq(jsonData)
      
      if (result.success) {
        // Reset form after successful submission
        formik.resetForm()
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

  // Handle modal close with form reset
  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isEdit ? 'Edit FAQ' : 'Add FAQ'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
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
            placeholder="Enter FAQ title"
          />
          {formik.touched.title && formik.errors.title && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.title}</p>
          )}
        </div>

        {/* Content Field */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            rows={6}
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              formik.touched.content && formik.errors.content
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter FAQ content"
          />
          {formik.touched.content && formik.errors.content && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.content}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
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
            {isEdit ? 'Update FAQ' : 'Create FAQ'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default FAQForm 