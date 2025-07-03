import React from 'react'
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PublicHeader />
      <main className="flex-grow">
        {children}
      </main>
      <PublicFooter />
    </div>
  )
}

export default PublicLayout
