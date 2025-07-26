import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@shared/store/authStore'

const Sidebar = ({ user, isOpen, onClose, collapsed }) => {
  const location = useLocation()
  const authStore = useAuthStore()
  const hasPurchasedPackage = authStore?.hasPurchasedPackage || null
  const userHasPackage = hasPurchasedPackage === true

  const menuItems = [
    {
      path: '/dashboard',
      label: 'Check Classes',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 13C0 5.82029 5.82029 0 13 0C20.1796 0 26 5.82029 26 13C26 20.1796 20.1796 26 13 26C5.82029 26 0 20.1796 0 13ZM9.1 12.35C9.1 10.5551 10.5551 9.1 12.35 9.1C14.1449 9.1 15.6 10.5551 15.6 12.35C15.6 14.1449 14.1449 15.6 12.35 15.6C10.5551 15.6 9.1 14.1449 9.1 12.35ZM12.35 6.5C9.11914 6.5 6.5 9.11914 6.5 12.35C6.5 15.5809 9.11914 18.2 12.35 18.2C13.4946 18.2 14.5626 17.8712 15.4644 17.303L17.2808 19.1192C17.7884 19.6269 18.6116 19.6269 19.1192 17.2808L17.303 15.4644C17.8712 14.5626 18.2 13.4946 18.2 12.35C18.2 9.11914 15.5809 6.5 12.35 6.5Z" fill="currentColor"/>
        </svg>
      ),
      showWhen: () => true // Always show
    },
    {
      path: '/my-classes',
      label: 'My Classes',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.2262 0.00067262C19.2007 0.00067262 20.8014 1.60135 20.8014 3.57589V22.4248C20.8014 24.3993 19.2007 26 17.2262 26H3.57522C1.60068 26 0 24.3993 0 22.4248V3.57589C0 1.60135 1.60068 0.00067262 3.57522 0.00067262L3.95409 0V10.6179C3.95409 11.5905 4.98164 11.9363 5.66836 11.5791L5.78572 11.5088L8.50676 9.95226L11.2895 11.5505C11.8686 11.9512 12.9283 11.6817 13.0443 10.7831L13.0547 10.6179V0L17.2262 0.00067262ZM11.1045 0V9.19897L8.99632 7.98742C8.70154 7.84634 8.30063 7.84954 7.96562 8.0167L7.82658 8.09844L5.90421 9.19809V0H11.1045Z" fill="currentColor"/>
        </svg>
      ),
      showWhen: () => userHasPackage // Only show if user has package
    },
    {
      path: '/my-package',
      label: 'My Package',
      icon: (
        <svg className="w-6 h-6" width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.1813e-06 9.09998H26V14.3855C26.0001 15.538 26.0001 16.5309 25.8933 17.3261C25.7786 18.1783 25.5203 18.9952 24.8577 19.6577C24.1952 20.3203 23.3783 20.5786 22.5261 20.6932C21.7309 20.8001 20.738 20.8001 19.5855 20.8H6.41438C5.26197 20.8001 4.26903 20.8001 3.47387 20.6932C2.62171 20.5786 1.80486 20.3203 1.1423 19.6577C0.479729 18.9952 0.221367 18.1783 0.106798 17.3261C-0.000113846 16.5309 -6.18187e-05 15.538 3.1813e-06 14.3855V9.09998ZM3.9 13C3.9 12.282 4.48204 11.7 5.2 11.7H7.8C8.51796 11.7 9.1 12.282 9.1 13C9.1 13.718 8.51796 14.3 7.8 14.3H5.2C4.48204 14.3 3.9 13.718 3.9 13ZM10.4 13C10.4 12.282 10.982 11.7 11.7 11.7H14.3C15.018 11.7 15.6 12.282 15.6 13C15.6 13.718 15.018 14.3 14.3 14.3H11.7C10.982 14.3 10.4 13.718 10.4 13Z" fill="currentColor"/>
          <path d="M26 6.50001V6.41443C26.0001 5.262 26.0001 4.26903 25.8933 3.47387C25.7786 2.62171 25.5203 1.80486 24.8577 1.1423C24.1952 0.479729 23.3783 0.221367 22.5261 0.106798C21.7309 -0.000113846 20.738 -6.18187e-05 19.5855 3.1813e-06H6.41443C5.262 -6.18187e-05 4.26905 -0.000113846 3.47389 0.106798C2.62171 0.221367 1.80486 0.479729 1.1423 1.14229C0.479729 1.80486 0.221367 2.62171 0.106798 3.47387C-0.000113846 4.26905 -6.18187e-05 5.26201 3.1813e-06 6.41446V6.5L26 6.50001Z" fill="currentColor"/>
        </svg>
        
      ),
      showWhen: () => userHasPackage // Only show if user has package
    },
    {
      path: '/profile',
      label: 'My Profile',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.15117 0C5.74512 0 2.97607 2.76904 2.97607 6.1751C2.97607 9.51615 5.58912 12.2202 8.99517 12.3372C9.09917 12.3242 9.20317 12.3242 9.28117 12.3372C9.30717 12.3372 9.32017 12.3372 9.34617 12.3372C9.35917 12.3372 9.35917 12.3372 9.37217 12.3372C12.7002 12.2202 15.3133 9.51615 15.3263 6.1751C15.3263 2.76904 12.5572 0 9.15117 0Z" fill="currentColor"/>
          <path d="M15.7562 15.7953C12.1291 13.3773 6.2141 13.3773 2.56104 15.7953C0.910014 16.9004 0 18.3954 0 19.9944C0 21.5934 0.910014 23.0755 2.54804 24.1675C4.36807 25.3895 6.76005 26.0005 9.15209 26.0005C11.5441 26.0005 13.9362 25.3895 15.7562 24.1675C17.3942 23.0625 18.3042 21.5804 18.3042 19.9684C18.2912 18.3694 17.3942 16.8874 15.7562 15.7953Z" fill="currentColor"/>
        </svg>
      ),
      showWhen: () => true // Always show
    }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  // Filter menu items based on user's package status

  return (
    <div className={`
      h-full bg-white shadow-xl flex flex-col
      ${collapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        {!collapsed && <h2 className="text-lg font-semibold text-gray-800">Menu</h2>}
        <button 
          onClick={onClose}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`
                  flex items-center px-3 py-3 rounded-xl text-sm font-medium transition-colors
                  ${isActive(item.path) 
                    ? 'bg-primary bg-opacity-20 text-primary font-semibold ' 
                    : 'text-gray-600 hover:bg-primary hover:bg-opacity-20 hover:text-primary'
                  }
                `}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {!collapsed && item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar 