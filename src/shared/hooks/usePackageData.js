import { useState, useEffect } from 'react';
import { getMembershipPackages, getTrialPackages, getPromoPackages } from '../services/packageService';

export const usePackageData = () => {
  const [membershipPackages, setMembershipPackages] = useState([]);
  const [trialPackages, setTrialPackages] = useState([]);
  const [promoPackages, setPromoPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Group packages by category
  const groupPackagesByCategory = (packages) => {
    return packages.reduce((acc, pkg) => {
      const categoryName = pkg.category?.name || 'Other';
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(pkg);
      return acc;
    }, {});
  };

  // Format price to Indonesian currency
  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    if (numPrice >= 1000000) {
      return `${(numPrice / 1000000).toFixed(0)}M`;
    } else if (numPrice >= 1000) {
      return `${(numPrice / 1000).toFixed(0)}K`;
    }
    return numPrice.toString();
  };

  // Transform package data for display
  const transformPackageData = (packages) => {
    return packages.map(pkg => ({
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
    }));
  };

  // Load all packages
  const loadAllPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      // Load membership packages
      const membershipResponse = await getMembershipPackages();
      if (membershipResponse.success) {
        const transformedMembership = transformPackageData(membershipResponse.data.packages);
        setMembershipPackages(transformedMembership);
      }

      // Load trial packages (if API exists)
      try {
        const trialResponse = await getTrialPackages();
        if (trialResponse.success) {
          const transformedTrial = transformPackageData(trialResponse.data.packages);
          setTrialPackages(transformedTrial);
        }
      } catch (trialError) {
        console.log('Trial packages API not available yet');
      }

      // Load promo packages (if API exists)
      try {
        const promoResponse = await getPromoPackages();
        if (promoResponse.success) {
          const transformedPromo = transformPackageData(promoResponse.data.packages);
          setPromoPackages(transformedPromo);
        }
      } catch (promoError) {
        console.log('Promo packages API not available yet');
      }

    } catch (err) {
      setError('Gagal memuat data package');
      console.error('Error loading packages:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get grouped packages by category
  const getGroupedMembershipPackages = () => {
    return groupPackagesByCategory(membershipPackages);
  };

  const getGroupedTrialPackages = () => {
    return groupPackagesByCategory(trialPackages);
  };

  const getGroupedPromoPackages = () => {
    return groupPackagesByCategory(promoPackages);
  };

  // Load packages on mount
  useEffect(() => {
    loadAllPackages();
  }, []);

  return {
    membershipPackages,
    trialPackages,
    promoPackages,
    loading,
    error,
    loadAllPackages,
    getGroupedMembershipPackages,
    getGroupedTrialPackages,
    getGroupedPromoPackages,
    formatPrice
  };
}; 