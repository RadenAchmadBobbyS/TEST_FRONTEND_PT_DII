import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { usePasienStore } from '@/stores/pasienStore'
import PasienTable from '@/components/pasien/Pasien.table'
import { CheckCircle, X } from 'lucide-react'

export default function IndexPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { fetchPasien, filterAndSortPasien, pasienList } = usePasienStore()
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)

  useEffect(() => {
    fetchPasien()
  }, [fetchPasien])

  // Refresh the filtered list when coming back to this page or when pasienList changes
  useEffect(() => {
    filterAndSortPasien()
  }, [filterAndSortPasien, pasienList])

  useEffect(() => {
    // Show notification if redirected from form
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type || 'success'
      })
      
      // Clear notification after 5 seconds
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      
      // Clear location state
      navigate(location.pathname, { replace: true })
      
      return () => clearTimeout(timer)
    }
  }, [location.state, navigate, location.pathname])

  const handleAddNew = () => {
    navigate('/pasien-baru')
  }

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg border flex items-center justify-between ${
            notification.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <PasienTable onAddNew={handleAddNew} />
      </div>
    </div>
  )
}
