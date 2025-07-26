import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard, Schedule, Package, Member, Staff, Report, Website, Banner, Gallery, Trainer, Testimonial, FAQ, Blog } from './index'

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/package" element={<Package />} />
      <Route path="/member" element={<Member />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/report" element={<Report />} />
      <Route path="/website" element={<Website />} />
      <Route path="/website/banner" element={<Banner />} />
      <Route path="/website/gallery" element={<Gallery />} />
      <Route path="/website/trainer" element={<Trainer />} />
              <Route path="/website/testimonial" element={<Testimonial />} />
        <Route path="/website/faq" element={<FAQ />} />
      <Route path="/website/blog" element={<Blog />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default Admin 