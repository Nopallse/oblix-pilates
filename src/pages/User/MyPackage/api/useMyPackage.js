import { useState, useEffect, useCallback } from 'react'
import { myPackageAPI } from './myPackageAPI'
import { extractErrorMessage } from '@shared/services/apiErrorHandler'

export const useMyPackage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load my packages data
  const loadMyPackages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await myPackageAPI.getMyPackages()
      
      if (response.success) {
        setData(response.data)
      } else {
        throw new Error(response.message || 'Failed to fetch packages')
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal memuat data package')
      setError(errorMessage)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Get invoice detail
  const getInvoiceDetail = useCallback(async (invoiceNumber) => {
    try {
      const response = await myPackageAPI.getInvoiceDetail(invoiceNumber)
      return response
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal memuat detail invoice')
      throw new Error(errorMessage)
    }
  }, [])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Load data on mount
  useEffect(() => {
    loadMyPackages()
  }, [loadMyPackages])

  return {
    data,
    loading,
    error,
    loadMyPackages,
    getInvoiceDetail,
    clearError
  }
}

// Hook untuk available packages (BuyPackage)
export const useAvailablePackages = () => {
  const [membershipPackages, setMembershipPackages] = useState([])
  const [trialPackages, setTrialPackages] = useState([])
  const [promoPackages, setPromoPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Group packages by category
  const groupPackagesByCategory = (packages) => {
    return packages.reduce((acc, pkg) => {
      const categoryName = pkg.category?.name || 'Other'
      if (!acc[categoryName]) {
        acc[categoryName] = []
      }
      acc[categoryName].push(pkg)
      return acc
    }, {})
  }

  // Format price to Indonesian currency
  const formatPrice = (price) => {
    const numPrice = parseFloat(price)
    if (numPrice >= 1000000) {
      return `${(numPrice / 1000000).toFixed(0)}M`
    } else if (numPrice >= 1000) {
      return `${(numPrice / 1000).toFixed(0)}K`
    }
    return numPrice.toString()
  }

  // Transform package data for display
  const transformPackageData = (packages, packageType = 'membership') => {
    return packages.map(pkg => {
      if (packageType === 'trial') {
        return {
          id: pkg.id,
          paket: pkg.name,
          harga: formatPrice(pkg.price),
          benefit: [
            `${pkg.group_session} Group Classes`,
            `${pkg.private_session} Private Classes`,
            `Duration: ${pkg.duration_value} ${pkg.duration_unit}${pkg.duration_value > 1 ? 's' : ''}`,
            `Reminder: ${pkg.reminder_day} day${pkg.reminder_day > 1 ? 's' : ''} before`
          ],
          kategori: pkg.category?.name || 'Other',
          originalData: pkg
        }
      } else {
        return {
          id: pkg.id,
          paket: pkg.name,
          harga: formatPrice(pkg.price),
          benefit: [
            `${pkg.session} ${pkg.category?.name || 'Session'}`,
            `Duration: ${pkg.duration_value} ${pkg.duration_unit}${pkg.duration_value > 1 ? 's' : ''}`,
            `Reminder: ${pkg.reminder_day} day${pkg.reminder_day > 1 ? 's' : ''} before`
          ],
          kategori: pkg.category?.name || 'Other',
          originalData: pkg
        }
      }
    })
  }

  // Load all available packages
  const loadAllPackages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Load membership packages
      const membershipResponse = await myPackageAPI.getMembershipPackages()
      if (membershipResponse.success) {
        const transformedMembership = transformPackageData(membershipResponse.data.packages)
        setMembershipPackages(transformedMembership)
      }

      // Load trial packages (if API exists)
      try {
        const trialResponse = await myPackageAPI.getTrialPackages()
        if (trialResponse.success) {
          const transformedTrial = transformPackageData(trialResponse.data.packages, 'trial')
          setTrialPackages(transformedTrial)
        }
      } catch (trialError) {
        console.log('Trial packages API not available yet')
      }

      // Load promo packages (if API exists)
      try {
        const promoResponse = await myPackageAPI.getPromoPackages()
        if (promoResponse.success) {
          const transformedPromo = transformPackageData(promoResponse.data.packages)
          setPromoPackages(transformedPromo)
        }
      } catch (promoError) {
        console.log('Promo packages API not available yet')
      }

    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal memuat data package')
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [])

  // Get grouped packages by category
  const getGroupedMembershipPackages = useCallback(() => {
    return groupPackagesByCategory(membershipPackages)
  }, [membershipPackages])

  const getGroupedTrialPackages = useCallback(() => {
    return groupPackagesByCategory(trialPackages)
  }, [trialPackages])

  const getGroupedPromoPackages = useCallback(() => {
    return groupPackagesByCategory(promoPackages)
  }, [promoPackages])

  // Load data on mount
  useEffect(() => {
    loadAllPackages()
  }, [loadAllPackages])

  return {
    membershipPackages,
    trialPackages,
    promoPackages,
    loading,
    error,
    loadAllPackages,
    getGroupedMembershipPackages,
    getGroupedTrialPackages,
    getGroupedPromoPackages
  }
}

// Hook khusus untuk trial packages (BookTrial)
export const useTrialPackages = () => {
  const [trialPackages, setTrialPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Format price to Indonesian currency
  const formatPrice = (price) => {
    const numPrice = parseFloat(price)
    if (numPrice >= 1000000) {
      return `${(numPrice / 1000000).toFixed(0)}M`
    } else if (numPrice >= 1000) {
      return `${(numPrice / 1000).toFixed(0)}K`
    }
    return numPrice.toString()
  }

  // Transform trial package data for display
  const transformTrialPackageData = (packages) => {
    return packages.map(pkg => ({
      id: pkg.id,
      paket: pkg.name,
      harga: formatPrice(pkg.price),
      benefit: [
        `${pkg.group_session} Group Classes`,
        `${pkg.private_session} Private Classes`,
        `Duration: ${pkg.duration_value} ${pkg.duration_unit}${pkg.duration_value > 1 ? 's' : ''}`,
        `Reminder: ${pkg.reminder_day} day${pkg.reminder_day > 1 ? 's' : ''} before`
      ],
      originalData: pkg
    }))
  }

  // Load trial packages
  const loadTrialPackages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await myPackageAPI.getTrialPackages()
      if (response.success) {
        const transformedTrial = transformTrialPackageData(response.data.packages)
        setTrialPackages(transformedTrial)
      } else {
        throw new Error(response.message || 'Failed to fetch trial packages')
      }
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Gagal memuat data trial package')
      setError(errorMessage)
      setTrialPackages([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Load data on mount
  useEffect(() => {
    loadTrialPackages()
  }, [loadTrialPackages])

  return {
    trialPackages,
    loading,
    error,
    loadTrialPackages
  }
} 