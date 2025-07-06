import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import AppRoutes from './routes/AppRoutes'
import ErrorBoundary from './components/common/ErrorBoundary'
import ScrollToTop from './components/common/ScrollToTop.jsx'
function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <BrowserRouter>
        <ScrollToTop />
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  )
}

export default App
