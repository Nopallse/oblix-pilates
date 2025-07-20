import React, { useState } from 'react'
import { Table, Button } from '../../../components/ui'
import { useTestimonials } from './api'
import TestimonialForm from './components/TestimonialForm'

const Testimonial = () => {
  const { testimonials, loading, createTestimonial, updateTestimonial, deleteTestimonial, fetchTestimonials } = useTestimonials()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)

  // Ensure testimonials is always an array and filter out invalid entries
  const safeTestimonials = (testimonials || []).filter(testimonial => 
    testimonial && testimonial.id && testimonial.name
  )

  // Helper function to render age
  const renderAge = (age) => {
    return (
      <div className="flex items-center space-x-1">
        <span className="text-sm font-medium text-gray-900">{age || 0}</span>
        <span className="text-sm text-gray-600">years old</span>
      </div>
    )
  }

  // Debug component data
  console.log('Testimonial Component - Received data:', {
    testimonials: testimonials,
    safeTestimonials: safeTestimonials,
    loading: loading,
    testimonialsLength: testimonials?.length,
    safeTestimonialsLength: safeTestimonials?.length
  })

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      const result = await deleteTestimonial(id)
      if (!result.success) {
        console.error('Failed to delete testimonial:', result.message)
      }
    }
  }

  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedTestimonial(null)
    setIsFormOpen(true)
  }

  const columns = [
    { 
      key: 'index', 
      header: 'No', 
      span: 1,
      render: (_, row, index) => (
        <div className="text-sm text-gray-500 font-medium">
          {index + 1}
        </div>
      )
    },
    { 
      key: 'name', 
      header: 'Name', 
      span: 3,
      render: (name, row) => (
        <div className="font-medium text-gray-900">
          {name || row.name || 'No Name'}
        </div>
      )
    },
    { 
      key: 'age', 
      header: 'Age', 
      span: 4,
      render: (age, row) => (
        <div className="flex items-center space-x-1">
          {renderAge(age || row.age || 0)}
        </div>
      )
    },
    { 
      key: 'actions', 
      header: 'Actions', 
      span: 2,
      className: 'text-right',
      render: (_, row) => (
        <div className="flex items-center justify-end space-x-2">
          <Button
            onClick={() => handleEdit(row)}
            variant="outline"
            size="small"
            className="!min-w-0 !px-2 !py-1"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
          <Button
            onClick={() => handleDelete(row.id)}
            variant="danger"
            size="small"
            className="!min-w-0 !px-2 !py-1"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Testimonial</h1>
        <Button variant="primary" size="medium" onClick={handleAdd}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Testimonial
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading testimonials...</p>
        </div>
      )}

      {/* Custom Table - Only render when not loading */}
      {!loading && (
        <Table 
          columns={columns} 
          data={safeTestimonials} 
          emptyMessage="Get started by creating a new testimonial."
        />
      )}

      {/* Testimonial Form Modal */}
      <TestimonialForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedTestimonial(null)
        }}
        testimonial={selectedTestimonial}
        onSuccess={() => {
          // Refresh testimonials after successful operation
          if (fetchTestimonials) {
            fetchTestimonials()
          }
          setIsFormOpen(false)
          setSelectedTestimonial(null)
        }}
        createTestimonial={createTestimonial}
        updateTestimonial={updateTestimonial}
        fetchTestimonials={fetchTestimonials}
      />
    </div>
  )
}

export default Testimonial 