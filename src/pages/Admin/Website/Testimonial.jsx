import React, { useState } from 'react'
import { Table, Button } from '../../../components/ui'
import { useTestimonials } from './api'
import TestimonialForm from './components/TestimonialForm'
import { icons } from '../../../shared/utils/assets'

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
  // console.log('Testimonial Component - Received data:', { testimonials, safeTestimonials, loading })

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
      span: 5,
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
      span: 2,
      className: 'text-right',
      render: (_, row) => (
        <div className="flex items-center justify-end space-x-2">
          <button 
            className="p-2 hover:bg-gray-100 rounded" 
            title="Edit" 
            aria-label="Edit"
            onClick={() => handleEdit(row)}
          >
            <img src={icons.edit} alt="Edit" className="w-5 h-5" />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 rounded" 
            title="Hapus" 
            aria-label="Delete"
            onClick={() => handleDelete(row.id)}
          >
            <img src={icons.delete} alt="Delete" className="w-5 h-5" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-900">Testimonial</h1>
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
    </div>
  )
}

export default Testimonial 