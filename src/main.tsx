import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { PageLoader } from './components/Loader'
import './index.css'

const queryClient = new QueryClient()

function Root() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Minimum loading time to show the loader (better UX)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Also hide loader when the app is ready
    const handleLoad = () => {
      clearTimeout(timer)
      setIsLoading(false)
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearTimeout(timer)
      window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <React.StrictMode>
      {isLoading && <PageLoader />}
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" />
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Root />
)
