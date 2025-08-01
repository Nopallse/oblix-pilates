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
        <svg className="w-6 h-6" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.65024 5.4H17.5502C18.0452 5.4 18.4502 4.995 18.4502 4.5V2.7C18.4502 1.215 17.2352 0 15.7502 0H9.45024C7.96524 0 6.75024 1.215 6.75024 2.7V4.5C6.75024 4.995 7.15524 5.4 7.65024 5.4Z" fill="currentColor"/>
          <path d="M22.5 2.25H21.6C21.33 2.25 21.15 2.43 21.15 2.7V4.5C21.15 6.48 19.53 8.1 17.55 8.1H7.65C5.67 8.1 4.05 6.48 4.05 4.5V2.7C4.05 2.43 3.87 2.25 3.6 2.25H2.7C1.215 2.25 0 3.465 0 4.95V24.3C0 25.785 1.215 27 2.7 27H22.5C23.985 27 25.2 25.785 25.2 24.3V4.95C25.2 3.465 23.985 2.25 22.5 2.25ZM9.45 20.7C9.45 21.195 9.045 21.6 8.55 21.6H7.65C7.155 21.6 6.75 21.195 6.75 20.7V16.2C6.75 15.705 7.155 15.3 7.65 15.3H8.55C9.045 15.3 9.45 15.705 9.45 16.2V20.7ZM13.95 20.7C13.95 21.195 13.545 21.6 13.05 21.6H12.15C11.655 21.6 11.25 21.195 11.25 20.7V12.15C11.25 11.655 11.655 11.25 12.15 11.25H13.05C13.545 11.25 13.95 11.655 13.95 12.15V20.7ZM18.45 20.7C18.45 21.195 18.045 21.6 17.55 21.6H16.65C16.155 21.6 15.75 21.195 15.75 20.7V13.95C15.75 13.455 16.155 13.05 16.65 13.05H17.55C18.045 13.05 18.45 13.455 18.45 13.95V20.7Z" fill="currentColor"/>
        </svg>
      )
    },
    { 
      label: 'Website', 
      icon: (
        <svg className="w-6 h-6" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.47583 16.7031C8.53236 17.2698 8.59854 17.8275 8.67438 18.3763C8.92669 20.1591 9.28449 21.7536 9.73949 23.1186C9.95252 23.7515 10.1821 24.3265 10.4261 24.827C11.7996 25.0558 13.2015 25.0558 14.5749 24.827C14.819 24.3265 15.0485 23.7515 15.2616 23.1186C15.7166 21.7536 16.0744 20.1591 16.3267 18.3763C16.4039 17.8289 16.4701 17.2712 16.5252 16.7031H8.47583Z" fill="currentColor"/>
          <path d="M16.6614 10.1562H8.33903C8.29767 10.9256 8.27905 11.7074 8.27905 12.4995C8.27905 13.2916 8.29767 14.0734 8.33903 14.8428H16.6614C16.7028 14.0734 16.7214 13.2916 16.7214 12.4995C16.7214 11.7074 16.7028 10.9256 16.6614 10.1562Z" fill="currentColor"/>
          <path d="M17.0278 1.29025C17.6876 3.27365 18.155 5.67688 18.3949 8.29521H24.2748C24.1962 8.07185 24.1114 7.85262 24.0183 7.63339C22.7483 4.63721 20.3632 2.25213 17.367 0.982094C17.1954 0.909708 17.0216 0.841458 16.8479 0.777344C16.9079 0.942799 16.9679 1.11446 17.0278 1.29025Z" fill="currentColor"/>
          <path d="M18.5829 12.4995C18.5829 13.2909 18.5643 14.072 18.5271 14.8428H24.7813C25.0736 13.2943 25.0736 11.7047 24.7813 10.1562H18.5271C18.5643 10.9256 18.5829 11.7067 18.5829 12.4995Z" fill="currentColor"/>
          <path d="M6.4176 12.4995C6.4176 11.7081 6.43621 10.927 6.47344 10.1562H0.219233C-0.0730777 11.7047 -0.0730777 13.2943 0.219233 14.8428H6.47344C6.43621 14.0734 6.4176 13.2923 6.4176 12.4995Z" fill="currentColor"/>
          <path d="M7.97301 23.7081C7.31325 21.7247 6.84584 19.3215 6.60593 16.7031H0.726074C0.804665 16.9265 0.889461 17.1457 0.982529 17.3649C2.25256 20.3611 4.63765 22.7462 7.63382 24.0162C7.80548 24.0886 7.97921 24.1569 8.15294 24.221C8.09296 24.0555 8.03298 23.8839 7.97301 23.7081Z" fill="currentColor"/>
          <path d="M18.3949 16.7031C18.155 19.3215 17.6876 21.7247 17.0278 23.7081C16.9679 23.8839 16.9079 24.0555 16.8479 24.221C17.0216 24.1569 17.1954 24.0886 17.367 24.0162C20.3632 22.7462 22.7483 20.3611 24.0183 17.3649C24.1114 17.1457 24.1962 16.9265 24.2748 16.7031H18.3949Z" fill="currentColor"/>
          <path d="M16.5252 8.2955C16.4701 7.72882 16.4039 7.17109 16.3267 6.62233C16.0744 4.83956 15.7166 3.24498 15.2616 1.87998C15.0485 1.24711 14.819 0.672155 14.5749 0.171654C13.2015 -0.057218 11.7996 -0.057218 10.4261 0.171654C10.1821 0.672155 9.95252 1.24711 9.73949 1.87998C9.28449 3.24498 8.92669 4.83956 8.67438 6.62233C8.59716 7.17109 8.53098 7.72882 8.47583 8.2955H16.5252Z" fill="currentColor"/>
          <path d="M6.60593 8.29521C6.84584 5.67688 7.31325 3.27365 7.97301 1.29025C8.03298 1.11446 8.09296 0.942799 8.15294 0.777344C7.97921 0.841458 7.80548 0.909708 7.63382 0.982094C4.63765 2.25213 2.25256 4.63721 0.982529 7.63339C0.889461 7.85262 0.804665 8.07185 0.726074 8.29521H6.60593Z" fill="currentColor"/>
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
    // Special handling for member routes
    if (path === '/admin/member') {
      return location.pathname === '/admin/member' || location.pathname.startsWith('/admin/member/');
    }
    return location.pathname === path
  }

  const isSubMenuActive = (subMenus) => {
    return subMenus?.some(subMenu => location.pathname === subMenu.path)
  }

  const isMenuExpanded = (label) => {
    return expandedMenus.includes(label)
  }

  return (
    <div className={`
      h-full bg-white shadow-xl flex flex-col relative z-50
      ${collapsed ? 'w-20' : 'w-64'}
    `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
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
  )
}

export default Sidebar