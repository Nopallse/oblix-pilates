import React, { useState, useEffect } from 'react'
import { Button, Modal } from '@components/ui'
import { useTestimonialForm } from '../api'
import { useApiToast } from '@shared/hooks'

const TestimonialForm = ({ isOpen, onClose, testimonial = null, onSuccess, createTestimonial, updateTestimonial, fetchTestimonials }) => {
  const isEdit = !!testimonial
  const { showToast } = useApiToast()
  const { formik, loading } = useTestimonialForm(
    testimonial ? {
      name: testimonial.name,
      content: testimonial.content,
      age: testimonial.age
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
        // For edit mode, compare with original testimonial data
        if (values.name !== testimonial.name) {
          jsonData.name = values.name
          console.log('Name changed:', values.name)
        }
        
        if (values.content !== testimonial.content) {
          jsonData.content = values.content
          console.log('Content changed:', values.content)
        }
        
        if (values.age !== testimonial.age) {
          jsonData.age = values.age
          console.log('Age changed:', values.age)
        }
      } else {
        // For create mode, append all required fields
        jsonData.name = values.name
        jsonData.content = values.content
        jsonData.age = values.age
      }
      
      console.log('Form values:', values)
      console.log('Original testimonial data:', testimonial)
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
        ? await updateTestimonial(testimonial.id, jsonData)
        : await createTestimonial(jsonData)
      
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

  // Helper function to render age input
  const renderAgeInput = () => {
    return (
      <input
        type="number"
        min="1"
        max="120"
        value={formik.values.age}
        onChange={(e) => formik.setFieldValue('age', parseInt(e.target.value) || 0)}
        className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isEdit ? 'Edit Testimonial' : 'Add Testimonial'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              formik.touched.name && formik.errors.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter customer name"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.name}</p>
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
            rows={4}
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              formik.touched.content && formik.errors.content
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-primary'
            }`}
            placeholder="Enter testimonial content"
          />
          {formik.touched.content && formik.errors.content && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.content}</p>
          )}
        </div>

        {/* Age Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age *
          </label>
          <div className="flex items-center space-x-2">
            {renderAgeInput()}
            <span className="text-sm text-gray-600">
              years old
            </span>
          </div>
          {formik.touched.age && formik.errors.age && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.age}</p>
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
            {isEdit ? 'Update Testimonial' : 'Create Testimonial'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default TestimonialForm 