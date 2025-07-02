import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl font-bold text-gray-400">404</span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">
          Halaman yang Anda cari tidak dapat ditemukan. 
          Mungkin halaman telah dipindahkan atau URL salah.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Button>
          <Button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800"
          >
            <Home className="w-4 h-4" />
            Beranda
          </Button>
        </div>
      </div>
    </div>
  )
}
