import React, { useState } from 'react'
import { useBlogs } from './api/useWebsite'
import { useApiToast } from '@shared/hooks'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Loading from '../../../components/ui/Loading'
import Table from '../../../components/ui/Table'
import BlogForm from './components/BlogForm'
import { icons } from '../../../shared/utils/assets'

const Blog = () => {
  const { blogs, loading, error, pagination, fetchBlogs, createBlog, updateBlog, deleteBlog } = useBlogs()
  const { showToast } = useApiToast()
  
  const [showModal, setShowModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [deletingBlog, setDeletingBlog] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  // Ensure blogs is always an array and filter out invalid entries
  const safeBlogs = (blogs || []).filter(blog => 
    blog && blog.id && blog.title
  )

  // Get image URL for display
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    return `${import.meta.env.VITE_API_BASE_URL || 'http://34.101.143.2:3020'}/uploads/blogs/${imagePath}`
  }

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const result = await deleteBlog(id)
      if (result.success) {
        fetchBlogs({ page: currentPage, search: searchTerm })
      }
    } catch (error) {
      console.error('Delete error:', error)
    }
  }

  // Handle edit
  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setShowModal(true)
  }

  // Handle add
  const handleAdd = () => {
    setEditingBlog(null)
    setShowModal(true)
  }

  // Handle form success
  const handleFormSuccess = () => {
    fetchBlogs({ page: currentPage, search: searchTerm })
  }

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchBlogs({ page: 1, search: searchTerm })
  }

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    fetchBlogs({ page, search: searchTerm })
  }

  // Table columns
  const columns = [
    { 
      key: 'index', 
      header: 'No', 
      span: 1,
      render: (_, row, index) => (
        <div className="text-sm text-gray-500 font-medium">
          {((pagination?.currentPage || 1) - 1) * (pagination?.itemsPerPage || 10) + index + 1}
        </div>
      )
    },
    { 
      key: 'title', 
      header: 'Title', 
      span: 4,
      render: (title, row) => (
        <div className="font-medium text-gray-900 max-w-xs truncate">
          {title || row.title || 'No Title'}
        </div>
      )
    },
    { 
      key: 'picture', 
      header: 'Image', 
      span: 3,
      render: (picture, row) => {
        const imageUrl = getImageUrl(picture || row.picture)
        const title = row.title || 'Blog'
        
        return (
          <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Image failed to load:', imageUrl)
                  // Prevent infinite loop by checking if already set to fallback
                  if (e.target.src !== 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGM0Y0RjYiLz4KPHBhdGggZD0iTTI0IDEyQzI3LjMxMzcgMTIgMzAgMTQuNjg2MyAzMCAxOEMzMCAyMS4zMTM3IDI3LjMxMzcgMjQgMjQgMjRDMjAuNjg2MyAyNCAxOCAyMS4zMTM3IDE4IDE4QzE4IDE0LjY4NjMgMjAuNjg2MyAxMiAyNCAxMloiIGZpbGw9IiM5QjlCQTAiLz4KPHBhdGggZD0iTTEyIDQwQzEyIDM0LjQ3NzIgMTYuNDc3MiAzMCAyMiAzMEgyNkMzMS41MjI4IDMwIDM2IDM0LjQ3NzIgMzYgNDBIMTJaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=') {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiNGM0Y0RjYiLz4KPHBhdGggZD0iTTI0IDEyQzI3LjMxMzcgMTIgMzAgMTQuNjg2MyAzMCAxOEMzMCAyMS4zMTM3IDI3LjMxMzcgMjQgMjQgMjRDMjAuNjg2MyAyNCAxOCAyMS4zMTM3IDE4IDE4QzE4IDE0LjY4NjMgMjAuNjg2MyAxMiAyNCAxMloiIGZpbGw9IiM5QjlCQTAiLz4KPHBhdGggZD0iTTEyIDQwQzEyIDM0LjQ3NzIgMTYuNDc3MiAzMCAyMiAzMEgyNkMzMS41MjI4IDMwIDM2IDM0LjQ3NzIgMzYgNDBIMTJaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo='
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Image</span>
              </div>
            )}
          </div>
        )
      }
    },
    { 
      key: 'createdAt', 
      header: 'Created At', 
      span: 2,
      render: (createdAt, row) => (
        <div className="text-sm text-gray-500">
          {new Date(createdAt || row.createdAt).toLocaleDateString()}
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
            onClick={() => setDeletingBlog(row)}
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
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
        </div>
        <Button onClick={handleAdd}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          Add New Blog
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <Loading />
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p>Failed to load blogs</p>
            <p className="text-sm text-gray-500 mt-2">{error}</p>
          </div>
        </div>
      )}

      {/* Blog Table */}
      {!loading && !error && (
        <Table 
          columns={columns} 
          data={safeBlogs} 
          emptyMessage="Get started by creating a new blog post."
        />
      )}

      {/* Blog Form Modal */}
      <BlogForm
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
          setEditingBlog(null)
        }}
        blog={editingBlog}
        onSuccess={handleFormSuccess}
        createBlog={createBlog}
        updateBlog={updateBlog}
        fetchBlogs={fetchBlogs}
      />

      {/* Delete Confirmation Modal */}
      {deletingBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete Blog
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete "{deletingBlog.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setDeletingBlog(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDelete(deletingBlog.id)
                    setDeletingBlog(null)
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default Blog 