import React from 'react'
import PublicHeader from './PublicHeader'
import PublicFooter from './PublicFooter'

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <PublicHeader />
      <main className="flex-grow w-full relative pt-12 sm:pt-14 md:pt-14 lg:pt-14 xl:pt-16">
        <div className="w-full max-w-none">
          {children}
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}

export default PublicLayout
