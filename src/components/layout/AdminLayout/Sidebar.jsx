import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = ({ user, isOpen, onClose, collapsed }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState([])

  // Auto-expand menu if a sub-menu is active
  useEffect(() => {
    const activeSubMenu = menuItems.find(item => 
      item.subMenus?.some(subMenu => location.pathname === subMenu.path)
    )
    
    if (activeSubMenu && !expandedMenus.includes(activeSubMenu.label)) {
      setExpandedMenus(prev => [...prev, activeSubMenu.label])
    }
  }, [location.pathname])

  const toggleMenu = (menuLabel) => {
    setExpandedMenus(prev => 
      prev.includes(menuLabel) 
        ? prev.filter(item => item !== menuLabel)
        : [...prev, menuLabel]
    )
  }

  const menuItems = [
    { 
      path: '/admin', 
      label: 'Dashboard', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M0 13C0 5.82029 5.82029 0 13 0C20.1796 0 26 5.82029 26 13C26 20.1796 20.1796 26 13 26C5.82029 26 0 20.1796 0 13ZM9.1 12.35C9.1 10.5551 10.5551 9.1 12.35 9.1C14.1449 9.1 15.6 10.5551 15.6 12.35C15.6 14.1449 14.1449 15.6 12.35 15.6C10.5551 15.6 9.1 14.1449 9.1 12.35ZM12.35 6.5C9.11914 6.5 6.5 9.11914 6.5 12.35C6.5 15.5809 9.11914 18.2 12.35 18.2C13.4946 18.2 14.5626 17.8712 15.4644 17.303L17.2808 19.1192C17.7884 19.6269 18.6116 19.6269 19.1192 19.1192C19.6269 18.6116 19.6269 17.7884 19.1192 17.2808L17.303 15.4644C17.8712 14.5626 18.2 13.4946 18.2 12.35C18.2 9.11914 15.5809 6.5 12.35 6.5Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      path: '/admin/schedule', 
      label: 'Schedule', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.2262 0.00067262C19.2007 0.00067262 20.8014 1.60135 20.8014 3.57589V22.4248C20.8014 24.3993 19.2007 26 17.2262 26H3.57522C1.60068 26 0 24.3993 0 22.4248V3.57589C0 1.60135 1.60068 0.00067262 3.57522 0.00067262L3.95409 0V10.6179C3.95409 11.5905 4.98164 11.9363 5.66836 11.5791L5.78572 11.5088L8.50676 9.95226L11.2895 11.5505C11.8686 11.9512 12.9283 11.6817 13.0443 10.7831L13.0547 10.6179V0L17.2262 0.00067262ZM11.1045 0V9.19897L8.99632 7.98742C8.70154 7.84634 8.30063 7.84954 7.96562 8.0167L7.82658 8.09844L5.90421 9.19809V0H11.1045Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      path: '/admin/package', 
      label: 'Package', 
      icon: (
        <svg className="w-6 h-6" width="26" height="21" viewBox="0 0 26 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.1813e-06 9.09998H26V14.3855C26.0001 15.538 26.0001 16.5309 25.8933 17.3261C25.7786 18.1783 25.5203 18.9952 24.8577 19.6577C24.1952 20.3203 23.3783 20.5786 22.5261 20.6932C21.7309 20.8001 20.738 20.8001 19.5855 20.8H6.41438C5.26197 20.8001 4.26903 20.8001 3.47387 20.6932C2.62171 20.5786 1.80486 20.3203 1.1423 19.6577C0.479729 18.9952 0.221367 18.1783 0.106798 17.3261C-0.000113846 16.5309 -6.18187e-05 15.538 3.1813e-06 14.3855V9.09998ZM3.9 13C3.9 12.282 4.48204 11.7 5.2 11.7H7.8C8.51796 11.7 9.1 12.282 9.1 13C9.1 13.718 8.51796 14.3 7.8 14.3H5.2C4.48204 14.3 3.9 13.718 3.9 13ZM10.4 13C10.4 12.282 10.982 11.7 11.7 11.7H14.3C15.018 11.7 15.6 12.282 15.6 13C15.6 13.718 15.018 14.3 14.3 14.3H11.7C10.982 14.3 10.4 13.718 10.4 13Z" fill="currentColor"/>
          <path d="M26 6.50001V6.41443C26.0001 5.262 26.0001 4.26903 25.8933 3.47387C25.7786 2.62171 25.5203 1.80486 24.8577 1.1423C24.1952 0.479729 23.3783 0.221367 22.5261 0.106798C21.7309 -0.000113846 20.738 -6.18187e-05 19.5855 3.1813e-06H6.41443C5.262 -6.18187e-05 4.26905 -0.000113846 3.47389 0.106798C2.62171 0.221367 1.80486 0.479729 1.1423 1.14229C0.479729 1.80486 0.221367 2.62171 0.106798 3.47387C-0.000113846 4.26905 -6.18187e-05 5.26201 3.1813e-06 6.41446V6.5L26 6.50001Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      path: '/admin/member', 
      label: 'Member', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.15117 0C5.74512 0 2.97607 2.76904 2.97607 6.1751C2.97607 9.51615 5.58912 12.2202 8.99517 12.3372C9.09917 12.3242 9.20317 12.3242 9.28117 12.3372C9.30717 12.3372 9.32017 12.3372 9.34617 12.3372C9.35917 12.3372 9.35917 12.3372 9.37217 12.3372C12.7002 12.2202 15.3133 9.51615 15.3263 6.1751C15.3263 2.76904 12.5572 0 9.15117 0Z" fill="currentColor"/>
          <path d="M15.7562 15.7953C12.1291 13.3773 6.2141 13.3773 2.56104 15.7953C0.910014 16.9004 0 18.3954 0 19.9944C0 21.5934 0.910014 23.0755 2.54804 24.1675C4.36807 25.3895 6.76005 26.0005 9.15209 26.0005C11.5441 26.0005 13.9362 25.3895 15.7562 24.1675C17.3942 23.0625 18.3042 21.5804 18.3042 19.9684C18.2912 18.3694 17.3942 16.8874 15.7562 15.7953Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      path: '/admin/staff', 
      label: 'Staff', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 0C5.82029 0 0 5.82029 0 13C0 20.1796 5.82029 26 13 26C20.1796 26 26 20.1796 26 13C26 5.82029 20.1796 0 13 0ZM13 6.5C15.4853 6.5 17.5 8.51472 17.5 11C17.5 13.4853 15.4853 15.5 13 15.5C10.5147 15.5 8.5 13.4853 8.5 11C8.5 8.51472 10.5147 6.5 13 6.5ZM13 23.4C10.5 23.4 8.2 22.4 6.5 20.8C6.6 18.2 9.8 16.9 13 16.9C16.2 16.9 19.4 18.2 19.5 20.8C17.8 22.4 15.5 23.4 13 23.4Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      path: '/admin/report', 
      label: 'Report', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.5 19.5V6.5H19.5V19.5H6.5ZM8.5 17.5H17.5V8.5H8.5V17.5Z" fill="currentColor"/>
          <path d="M10.5 15.5H15.5V13.5H10.5V15.5Z" fill="currentColor"/>
          <path d="M10.5 12.5H15.5V10.5H10.5V12.5Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      label: 'Website', 
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 0C5.82029 0 0 5.82029 0 13C0 20.1796 5.82029 26 13 26C20.1796 26 26 20.1796 26 13C26 5.82029 20.1796 0 13 0ZM13 2C18.5228 2 23 6.47715 23 12C23 17.5228 18.5228 22 13 22C7.47715 22 3 17.5228 3 12C3 6.47715 7.47715 2 13 2ZM13 4C8.58172 4 5 7.58172 5 12C5 16.4183 8.58172 20 13 20C17.4183 20 21 16.4183 21 12C21 7.58172 17.4183 4 13 4Z" fill="currentColor"/>
          <path d="M13 6C10.2386 6 8 8.23858 8 11C8 13.7614 10.2386 16 13 16C15.7614 16 18 13.7614 18 11C18 8.23858 15.7614 6 13 6ZM13 8C14.6569 8 16 9.34315 16 11C16 12.6569 14.6569 14 13 14C11.3431 14 10 12.6569 10 11C10 9.34315 11.3431 8 13 8Z" fill="currentColor"/>
        </svg>
      ),
      subMenus: [
        { path: '/admin/website/banner', label: 'Banner' },
        { path: '/admin/website/gallery', label: 'Gallery' },
        { path: '/admin/website/trainer', label: 'Trainer' },
        { path: '/admin/website/testimonial', label: 'Testimonial' },
        { path: '/admin/website/faq', label: 'FAQ' },
        { path: '/admin/website/blog', label: 'Blog' }
      ]
    }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  const isSubMenuActive = (subMenus) => {
    return subMenus?.some(subMenu => location.pathname === subMenu.path)
  }

  const isMenuExpanded = (label) => {
    return expandedMenus.includes(label)
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-auto bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-xl
        ${collapsed ? 'w-20' : 'w-64'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6">
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
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                {item.subMenus ? (
                  // Expandable menu with sub-menus
                  <div>
                    <button
                      onClick={() => {
                        if (!collapsed) {
                          toggleMenu(item.label)
                        } else {
                          // If collapsed, navigate to first sub-menu
                          navigate(item.subMenus[0].path)
                        }
                      }}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors
                        ${isSubMenuActive(item.subMenus) 
                          ? 'bg-primary bg-opacity-20 text-primary font-semibold' 
                          : 'text-gray-600 hover:bg-primary hover:bg-opacity-20 hover:text-primary'
                        }
                      `}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-lg">{item.icon}</span>
                        {!collapsed && item.label}
                      </div>
                      {!collapsed && (
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${isMenuExpanded(item.label) ? 'rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                    
                    {/* Sub-menu items */}
                    {!collapsed && isMenuExpanded(item.label) && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.subMenus.map((subMenu) => (
                          <button
                            key={subMenu.path}
                            onClick={() => {
                              navigate(subMenu.path)
                              if (window.innerWidth < 1024) {
                                onClose()
                              }
                            }}
                            className={`
                              w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors
                              ${isActive(subMenu.path) 
                                ? 'text-primary font-semibold bg-primary bg-opacity-10' 
                                : 'text-gray-600 hover:text-primary hover:bg-primary hover:bg-opacity-10'
                              }
                            `}
                          >
                            {subMenu.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular menu item
                  <button
                    onClick={() => {
                      navigate(item.path)
                      if (window.innerWidth < 1024) {
                        onClose()
                      }
                    }}
                    className={`
                      w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors
                      ${isActive(item.path) 
                        ? 'bg-primary bg-opacity-20 text-primary font-semibold' 
                        : 'text-gray-600 hover:bg-primary hover:bg-opacity-20 hover:text-primary'
                      }
                    `}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {!collapsed && item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>


      </div>
    </>
  )
}

export default Sidebar