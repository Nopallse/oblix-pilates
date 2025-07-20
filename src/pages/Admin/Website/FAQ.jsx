import React, { useState } from 'react'
import { Table, Button } from '../../../components/ui'
import { useFaqs } from './api'
import FAQForm from './components/FAQForm'

const FAQ = () => {
  const { faqs, loading, createFaq, updateFaq, deleteFaq, fetchFaqs } = useFaqs()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedFaq, setSelectedFaq] = useState(null)

  // Ensure faqs is always an array and filter out invalid entries
  const safeFaqs = (faqs || []).filter(faq => 
    faq && faq.id && faq.title
  )

  // Debug component data
  console.log('FAQ Component - Received data:', {
    faqs: faqs,
    safeFaqs: safeFaqs,
    loading: loading,
    faqsLength: faqs?.length,
    safeFaqsLength: safeFaqs?.length
  })

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
        <h1 className="text-2xl font-semibold text-gray-900">FAQ</h1>
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
  )
}

export default FAQ 