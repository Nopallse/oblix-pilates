import React from 'react'
import Header from './Header'
import Footer from './Footer'

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout
