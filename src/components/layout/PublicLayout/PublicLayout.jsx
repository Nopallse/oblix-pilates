import React from 'react'
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <PublicHeader />
      <main className="flex-grow w-full relative pt-14 sm:pt-18 md:pt-20 lg:pt-22 xl:pt-22">
        <div className="w-full max-w-none">
          {children}
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}

export default PublicLayout
