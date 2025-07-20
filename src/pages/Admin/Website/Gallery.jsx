import React, { useState } from 'react'
import { Table, Button } from '../../../components/ui'
import { useGalleries } from './api'
import GalleryForm from './components/GalleryForm'

const Gallery = () => {
  const { galleries, loading, createGallery, updateGallery, deleteGallery, fetchGalleries } = useGalleries()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedGallery, setSelectedGallery] = useState(null)

  // Ensure galleries is always an array and filter out invalid entries
  const safeGalleries = (galleries || []).filter(gallery => 
    gallery && gallery.id && gallery.title
  )

  // Helper function to construct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // Construct full URL with API base URL
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
    return `${baseURL}/uploads/galleries/${imagePath}`
  }

  // Debug component data
  console.log('Gallery Component - Received data:', {
    galleries: galleries,
    safeGalleries: safeGalleries,
    loading: loading,
    galleriesLength: galleries?.length,
    safeGalleriesLength: safeGalleries?.length
  })

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      const result = await deleteGallery(id)
      if (!result.success) {
        console.error('Failed to delete gallery:', result.message)
      }
    }
  }

  const handleEdit = (gallery) => {
    setSelectedGallery(gallery)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedGallery(null)
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
      key: 'picture', 
      header: 'Content', 
      span: 5,
      render: (picture, row) => {
        const imageUrl = getImageUrl(picture || row.picture)
        const title = row.title || 'Gallery'
        
        console.log('Image URL for gallery:', { 
          original: picture || row.picture, 
          constructed: imageUrl,
          title: title 
        })
        
        return (
          <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Image failed to load:', imageUrl)
                // Prevent infinite loop by checking if already set to fallback
                if (e.target.src !== 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA2NCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyNEMzNC4yMDkxIDI0IDM2IDI1Ljc5MDkgMzYgMjhDMzYgMzAuMjA5MSAzNC4yMDkxIDMyIDMyIDMyQzI5Ljc5MDkgMzIgMjggMzAuMjA5MSAyOCAyOEMyOCAyNS43OTA5IDI5Ljc5MDkgMjQgMzIgMjRaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0yMCA0MEg0NEM0Ni4yMDkxIDQwIDQ4IDM4LjIwOTEgNDggMzZWMjBDNDggMTcuNzkwOSA0Ni4yMDkxIDE2IDQ0IDE2SDIwQzE3Ljc5MDkgMTYgMTYgMTcuNzkwOSAxNiAyMFYzNkMxNiAzOC4yMDkxIDE3Ljc5MDkgNDAgMjAgNDBaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=') {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA2NCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyNEMzNC4yMDkxIDI0IDM2IDI1Ljc5MDkgMzYgMjhDMzYgMzAuMjA5MSAzNC4yMDkxIDMyIDMyIDMyQzI5Ljc5MDkgMzIgMjggMzAuMjA5MSAyOCAyOEMyOCAyNS43OTA5IDI5Ljc5MDkgMjQgMzIgMjRaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0yMCA0MEg0NEM0Ni4yMDkxIDQwIDQ4IDM4LjIwOTEgNDggMzZWMjBDNDggMTcuNzkwOSA0Ni4yMDkxIDE2IDQ0IDE2SDIwQzE3Ljc5MDkgMTYgMTYgMTcuNzkwOSAxNiAyMFYzNkMxNiAzOC4yMDkxIDE3Ljc5MDkgNDAgMjAgNDBaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo='
                }
              }}
            />
          </div>
        )
      }
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
        <h1 className="text-2xl font-semibold text-gray-900">Gallery</h1>
        <Button variant="primary" size="medium" onClick={handleAdd}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Gallery
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading galleries...</p>
        </div>
      )}

      {/* Custom Table - Only render when not loading */}
      {!loading && (
        <Table 
          columns={columns} 
          data={safeGalleries} 
          emptyMessage="Get started by creating a new gallery item."
        />
      )}

      {/* Gallery Form Modal */}
      <GalleryForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedGallery(null)
        }}
        gallery={selectedGallery}
        onSuccess={() => {
          // Refresh galleries after successful operation
          if (fetchGalleries) {
            fetchGalleries()
          }
          setIsFormOpen(false)
          setSelectedGallery(null)
        }}
        createGallery={createGallery}
        updateGallery={updateGallery}
        fetchGalleries={fetchGalleries}
      />
    </div>
  )
}

export default Gallery 