import React, { useState } from 'react'
import { Table, Button } from '../../../components/ui'
import { useTrainers } from './api'
import TrainerForm from './components/TrainerForm'
import { icons } from '../../../shared/utils/assets'

const Trainer = () => {
  const { trainers, loading, createTrainer, updateTrainer, deleteTrainer, fetchTrainers } = useTrainers()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState(null)

  // Ensure trainers is always an array and filter out invalid entries
  const safeTrainers = (trainers || []).filter(trainer => 
    trainer && trainer.id && trainer.title
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
    return `${baseURL}/uploads/trainers/${imagePath}`
  }

  // Debug component data
  console.log('Trainer Component - Received data:', {
    trainers: trainers,
    safeTrainers: safeTrainers,
    loading: loading,
    trainersLength: trainers?.length,
    safeTrainersLength: safeTrainers?.length
  })

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      const result = await deleteTrainer(id)
      if (!result.success) {
        console.error('Failed to delete trainer:', result.message)
      }
    }
  }

  const handleEdit = (trainer) => {
    setSelectedTrainer(trainer)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setSelectedTrainer(null)
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
      header: 'Trainer Name', 
      span: 2,
      render: (title, row) => (
        <div className="font-medium text-gray-900">
          {title || row.title || 'No Name'}
        </div>
      )
    },
    { 
      key: 'picture', 
      header: 'Picture', 
      span: 1,
      render: (picture, row) => {
        const imageUrl = getImageUrl(picture || row.picture)
        const title = row.title || 'Trainer'
        
        console.log('Image URL for trainer:', { 
          original: picture || row.picture, 
          constructed: imageUrl,
          title: title 
        })
        
        return (
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Image failed to load:', imageUrl)
                // Prevent infinite loop by checking if already set to fallback
                if (e.target.src !== 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeXg9IjI0IiBjeT0iMjQiIHI9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAxMkMyNy4zMTM3IDEyIDMwIDE0LjY4NjMgMzAgMThDMzAgMjEuMzEzNyAyNy4zMTM3IDI0IDI0IDI0QzIwLjY4NjMgMjQgMTggMjEuMzEzNyAxOCAxOEMxOCAxNC42ODYzIDIwLjY4NjMgMTIgMjQgMTJaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xMiA0MEMxMiAzNC40NzczMiAxNi40NzczMiAzMCAyMiAzMEgyNkMzMS41MjI4IDMwIDM2IDM0LjQ3NzIgMzYgNDBIMTJaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=') {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeXg9IjI0IiBjeT0iMjQiIHI9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNCAxMkMyNy4zMTM3IDEyIDMwIDE0LjY4NjMgMzAgMThDMzAgMjEuMzEzNyAyNy4zMTM3IDI0IDI0IDI0QzIwLjY4NjMgMjQgMTggMjEuMzEzNyAxOCAxOEMxOCAxNC42ODYzIDIwLjY4NjMgMTIgMjQgMTJaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0xMiA0MEMxMiAzNC40NzczMiAxNi40NzczMiAzMCAyMiAzMEgyNkMzMS41MjI4IDMwIDM2IDM0LjQ3NzIgMzYgNDBIMTJaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo='
                }
              }}
            />
          </div>
        )
      }
    },
    { 
      key: 'rate_group_class', 
      header: <div className="text-center w-full">Group Rate</div>, 
      span: 2,
      render: (_, row) => {
        const formatCurrency = (amount) => {
          if (!amount) return '-'
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          }).format(amount)
        }
        
        return (
          <div className="text-sm font-medium text-gray-900 flex justify-center items-center">
            {formatCurrency(row.rate_group_class)}
          </div>
        )
      }
    },
    { 
      key: 'rate_semi_private_class', 
      header: <div className="text-center w-full">Semi-Private Rate</div>, 
      span: 2,
      render: (_, row) => {
        const formatCurrency = (amount) => {
          if (!amount) return '-'
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          }).format(amount)
        }
        
        return (
          <div className="text-sm font-medium text-gray-900 flex justify-center items-center">
            {formatCurrency(row.rate_semi_private_class)}
          </div>
        )
      }
    },
    { 
      key: 'rate_private_class', 
      header: <div className="text-center w-full">Private Rate</div>, 
      span: 2,
      render: (_, row) => {
        const formatCurrency = (amount) => {
          if (!amount) return '-'
          return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
          }).format(amount)
        }
        
        return (
          <div className="text-sm font-medium text-gray-900 flex justify-center items-center">
            {formatCurrency(row.rate_private_class)}
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
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">Trainer</h1>
          <Button variant="primary" size="medium" onClick={handleAdd}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Trainer
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading trainers...</p>
          </div>
        )}

        {/* Custom Table - Only render when not loading */}
        {!loading && (
          <Table 
            columns={columns} 
            data={safeTrainers} 
            emptyMessage="Get started by creating a new trainer profile."
          />
        )}

        {/* Trainer Form Modal */}
        <TrainerForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false)
            setSelectedTrainer(null)
          }}
          trainer={selectedTrainer}
          onSuccess={() => {
            // Refresh trainers after successful operation
            if (fetchTrainers) {
              fetchTrainers()
            }
            setIsFormOpen(false)
            setSelectedTrainer(null)
          }}
          createTrainer={createTrainer}
          updateTrainer={updateTrainer}
          fetchTrainers={fetchTrainers}
        />
      </div>
    </div>
  )
}

export default Trainer 