import { useEffect } from 'react'

const ConfettiToast = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 1500)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div className="bg-green-600 text-white py-2 px-4 rounded-lg bounce-toast">
        🎉 Great job!
      </div>
    </div>
  )
}

export default ConfettiToast
