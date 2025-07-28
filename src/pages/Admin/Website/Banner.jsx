import React, { useState } from 'react'
import { Table, Button } from '../../../components/ui'
import { useBanners } from './api'
import BannerForm from './components/BannerForm'
import { icons } from '../../../shared/utils/assets'

const Banner = () => {
  const { banners, loading, createBanner, updateBanner, deleteBanner, fetchBanners } = useBanners()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState(null)

  // Ensure banners is always an array and filter out invalid entries
  const safeBanners = (banners || []).filter(banner => 
    banner && banner.id && banner.title
  )

  // Helper function to construct image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null
    

    // Construct full URL with API base URL
    const baseURL = import.meta.env.VITE_API_BASE_URL 
    return `${baseURL}/uploads/banners/${imagePath}`
  }


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      const result = await deleteBanner(id)
      if (!result.success) {
        console.error('Failed to delete banner:', result.message)
      }
    }
  }

  const handleEdit = (banner) => {
    setSelectedBanner(banner)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedBanner(null)
    setIsFormOpen(true)
  }

  const handleFormSuccess = () => {
    // The API hook will automatically refresh the data
    setIsFormOpen(false)
    setSelectedBanner(null)
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
        const title = row.title || 'Banner'
        
        console.log('Image URL for banner:', { 
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
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-semibold text-gray-900">Banner</h1>
        <Button variant="primary" size="medium" onClick={handleAdd}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Banner
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading banners...</p>
        </div>
      )}

      {/* Custom Table - Only render when not loading */}
      {!loading && (
        <Table 
          columns={columns} 
          data={safeBanners} 
          emptyMessage="Get started by creating a new banner."
        />
      )}

      {/* Banner Form Modal */}
      <BannerForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedBanner(null)
        }}
        banner={selectedBanner}
        onSuccess={() => {
          // Refresh banners after successful operation
          if (fetchBanners) {
            fetchBanners()
          }
          setIsFormOpen(false)
          setSelectedBanner(null)
        }}
        createBanner={createBanner}
        updateBanner={updateBanner}
        fetchBanners={fetchBanners}
      />
    </div>
    </div>
  )
}

export default Banner 