// Import all images

import banner1 from '@assets/images/banners/banner1.png';
import banner2 from '@assets/images/banners/banner2.png';
import about1 from '@assets/images/about/about1.png';
import about2 from '@assets/images/about/about2.png';
import classes1 from '@assets/images/classes/classes1.png';
import classes2 from '@assets/images/classes/classes2.png';
import classes3 from '@assets/images/classes/classes3.png';
import classesScheduleBanner from '@assets/images/classes-schedule/classes-schedule-banner.png';
import item1 from '@assets/images/item1.png';
import item2 from '@assets/images/item2.png';
import item3 from '@assets/images/item3.png';
import item4 from '@assets/images/item4.png';
import item5 from '@assets/images/item5.png';
import item6 from '@assets/images/item6.png';
import item7 from '@assets/images/item7.png';
import trainer1 from '@assets/images/trainers/trainer1.png';
import trainer2 from '@assets/images/trainers/trainer2.png';
import trainer3 from '@assets/images/trainers/trainer3.png';

// Import logos
import logoPrimer from '@assets/logos/logo_primer.png';
import logoSekunder from '@assets/logos/logo_sekunder.png';

// Import SVG
import flowerIcon from '@assets/svg/flower.svg';
import instagramIcon from '@assets/svg/icons/instagram.svg';
import locationIcon from '@assets/svg/icons/location.svg';
import phoneIcon from '@assets/svg/icons/phone.svg';
import tiktokIcon from '@assets/svg/icons/tiktok.svg';
import editIcon from '@assets/svg/icons/edit.svg';
import deleteIcon from '@assets/svg/icons/delete.svg';

// Import Equipment SVG
import barrelSvg from '@assets/svg/equipment/barrel.svg';
import caformer2in1Svg from '@assets/svg/equipment/caformer2in1.svg';
import spineCorrectorSvg from '@assets/svg/equipment/spine_corrector.svg';
import wundaChairSvg from '@assets/svg/equipment/wunda_chair.svg';
import reformerSvg from '@assets/svg/equipment/reformer.svg';

// Export all assets
export const images = {
    banners: {
        banner1,
        banner2
    },
    about: {
        about1,
        about2
    },
    classes: {
        classes1,
        classes2,
        classes3,
        scheduleBanner: classesScheduleBanner
    },
    items: {
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        item7
    },
    trainers: {
        trainer1,
        trainer2,
        trainer3
    }
}

export const logos = {
    primer: logoPrimer,
    sekunder: logoSekunder
}

export const icons = {
    flower: flowerIcon,
    instagram: instagramIcon,
    location: locationIcon,
    phone: phoneIcon,
    tiktok: tiktokIcon,
    edit: editIcon,
    delete: deleteIcon
}

export const equipment = {
    barrel: barrelSvg,
    caformer2in1: caformer2in1Svg,
    spineCorrector: spineCorrectorSvg,
    wundaChair: wundaChairSvg,
    reformer: reformerSvg,
}

/**
 * Get profile image URL
 * @param {string} imagePath - Image path or filename
 * @returns {string|null} Full URL or null if no image
 */
export const getProfileImageUrl = (imagePath) => {
  if (!imagePath) return null
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // If it's just a filename, construct the full URL
  return `${import.meta.env.VITE_API_BASE_URL || 'http://34.101.143.2:3020'}/uploads/profiles/${imagePath}`
}

/**
 * Get general image URL for uploads
 * @param {string} imagePath - Image path or filename
 * @param {string} folder - Folder name (e.g., 'profiles', 'blogs', 'trainers')
 * @returns {string|null} Full URL or null if no image
 */
export const getImageUrl = (imagePath, folder = 'profiles') => {
  if (!imagePath) return null
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // If it's just a filename, construct the full URL
  return `${import.meta.env.VITE_API_BASE_URL || 'http://34.101.143.2:3020'}/uploads/${folder}/${imagePath}`
}

// Export individual assets for backward compatibility
export {
    banner1,
    banner2,
    about1,
    about2,
    classes1,
    classes2,
    classes3,
    classesScheduleBanner,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    trainer1,
    trainer2,
    trainer3,
    logoPrimer,
    logoSekunder,
    flowerIcon,
    instagramIcon,
    locationIcon,
    phoneIcon,
    tiktokIcon,
    barrelSvg,
    caformer2in1Svg,
    spineCorrectorSvg,
    wundaChairSvg,
    reformerSvg
}