import React from 'react'
import { useContent } from '../contexts/ContentProvider'

const ErrorBanner = () => {
  const { error, loadWeek } = useContent()
  if (!error) return null
  return (
    <div className="bg-red-100 text-red-700 p-2 text-center" role="alert">
      Failed to load week data: {error.message}
      <button type="button" onClick={loadWeek} className="ml-2 underline">
        Retry
      </button>
    </div>
  )
}

export default ErrorBanner
