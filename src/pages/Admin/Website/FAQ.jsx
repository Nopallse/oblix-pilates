import React, { useState } from 'react'
import { Table, Button } from '../../../components/ui'
import { useFaqs } from './api'
import FAQForm from './components/FAQForm'
import { icons } from '../../../shared/utils/assets'

const FAQ = () => {
  const { faqs, loading, createFaq, updateFaq, deleteFaq, fetchFaqs } = useFaqs()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedFaq, setSelectedFaq] = useState(null)

  // Ensure faqs is always an array and filter out invalid entries
  const safeFaqs = (faqs || []).filter(faq => 
    faq && faq.id && faq.title
  )

  // Debug component data
  // console.log('FAQ Component - Received data:', { faqs, safeFaqs, loading })

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      const result = await deleteFaq(id)
      if (!result.success) {
        console.error('Failed to delete FAQ:', result.message)
      }
    }
  }

  const handleEdit = (faq) => {
    setSelectedFaq(faq)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedFaq(null)
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
      key: 'title', 
      header: 'Title', 
      span: 4,
      render: (title, row) => (
        <div className="font-medium text-gray-900">
          {title || row.title || 'No Title'}
        </div>
      )
    },
    { 
      key: 'content', 
      header: 'Content', 
      span: 5,
      render: (content, row) => (
        <div className="text-sm text-gray-600 line-clamp-2">
          {content || row.content || 'No Content'}
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
          <h1 className="text-3xl font-semibold text-gray-900">FAQ</h1>
          <Button variant="primary" size="medium" onClick={handleAdd}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add FAQ
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading FAQs...</p>
          </div>
        )}

        {/* Custom Table - Only render when not loading */}
        {!loading && (
          <Table 
            columns={columns} 
            data={safeFaqs} 
            emptyMessage="Get started by creating a new FAQ."
          />
        )}

        {/* FAQ Form Modal */}
        <FAQForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false)
            setSelectedFaq(null)
          }}
          faq={selectedFaq}
          onSuccess={() => {
            // Refresh FAQs after successful operation
            if (fetchFaqs) {
              fetchFaqs()
            }
            setIsFormOpen(false)
            setSelectedFaq(null)
          }}
          createFaq={createFaq}
          updateFaq={updateFaq}
          fetchFaqs={fetchFaqs}
        />
      </div>
    </div>
  )
}

export default FAQ 