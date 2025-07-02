import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePasienStore } from '@/stores/pasienStore'
import type { PasienFormData, FormErrors, Pasien } from '@/types/type'
import { dokterOptions, ruanganOptions } from '@/utils/mockData'
import { generateId, validateNIK, sanitizeInput } from '@/lib/utils'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

export default function PasienForm() {
  const navigate = useNavigate()
  const { addPasien } = usePasienStore()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState<PasienFormData>({
    nama: '',
    nik: '',
    diagnosa: '',
    tanggalMasuk: new Date().toISOString().split('T')[0],
    dokter: '',
    ruangan: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama pasien wajib diisi'
    } else if (formData.nama.trim().length < 2) {
      newErrors.nama = 'Nama minimal 2 karakter'
    }
    
    if (!formData.nik.trim()) {
      newErrors.nik = 'NIK wajib diisi'
    } else if (!validateNIK(formData.nik)) {
      newErrors.nik = 'NIK harus 16 digit angka'
    }
    
    if (!formData.diagnosa.trim()) {
      newErrors.diagnosa = 'Diagnosa wajib diisi'
    } else if (formData.diagnosa.trim().length < 5) {
      newErrors.diagnosa = 'Diagnosa minimal 5 karakter'
    }
    
    if (!formData.tanggalMasuk) {
      newErrors.tanggalMasuk = 'Tanggal masuk wajib diisi'
    } else {
      const selectedDate = new Date(formData.tanggalMasuk)
      const today = new Date()
      today.setHours(0, 0, 0, 0) // Reset to start of day
      
      const maxDate = new Date()
      maxDate.setDate(today.getDate() + 30)
      
      if (selectedDate < today) {
        newErrors.tanggalMasuk = 'Tanggal masuk tidak boleh di masa lalu'
      } else if (selectedDate > maxDate) {
        newErrors.tanggalMasuk = 'Tanggal masuk maksimal 30 hari ke depan'
      }
    }
    
    if (!formData.dokter) {
      newErrors.dokter = 'Dokter penanggung jawab wajib dipilih'
    }
    
    if (!formData.ruangan) {
      newErrors.ruangan = 'Ruangan wajib dipilih'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newPasien: Pasien = {
      id: generateId(),
      nama: sanitizeInput(formData.nama),
      nik: formData.nik,
      diagnosa: sanitizeInput(formData.diagnosa),
      tanggalMasuk: formData.tanggalMasuk,
      dokter: formData.dokter,
      ruangan: formData.ruangan
    }
    
    addPasien(newPasien)
    setLoading(false)
    
    // Show success message and redirect
    navigate('/', { 
      state: { 
        message: `Pasien ${formData.nama} berhasil didaftarkan!`,
        type: 'success' 
      } 
    })
  }

  const handleInputChange = (field: keyof PasienFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 text-gray-600 hover:text-gray-900 p-0"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Tambah Pasien Baru</h1>
          <p className="text-gray-600">Isi data pasien yang akan dirawat inap</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => handleInputChange('nama', e.target.value)}
                  placeholder="Nama lengkap pasien"
                  className={errors.nama ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'}
                />
                {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
              </div>

              <div>
                <label htmlFor="nik" className="block text-sm font-medium text-gray-700 mb-2">
                  NIK
                </label>
                <Input
                  id="nik"
                  value={formData.nik}
                  onChange={(e) => handleInputChange('nik', e.target.value.replace(/\D/g, '').slice(0, 16))}
                  placeholder="16 digit NIK"
                  className={errors.nik ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'}
                />
                {errors.nik && <p className="text-red-500 text-sm mt-1">{errors.nik}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="diagnosa" className="block text-sm font-medium text-gray-700 mb-2">
                Diagnosa
              </label>
              <Textarea
                id="diagnosa"
                value={formData.diagnosa}
                onChange={(e) => handleInputChange('diagnosa', e.target.value)}
                placeholder="Diagnosa pasien"
                className={errors.diagnosa ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'}
                rows={3}
              />
              {errors.diagnosa && <p className="text-red-500 text-sm mt-1">{errors.diagnosa}</p>}
            </div>

            <div>
              <label htmlFor="tanggalMasuk" className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Masuk
              </label>
              <Input
                id="tanggalMasuk"
                type="date"
                value={formData.tanggalMasuk}
                onChange={(e) => handleInputChange('tanggalMasuk', e.target.value)}
                className={errors.tanggalMasuk ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'}
              />
              {errors.tanggalMasuk && <p className="text-red-500 text-sm mt-1">{errors.tanggalMasuk}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="dokter" className="block text-sm font-medium text-gray-700 mb-2">
                  Dokter
                </label>
                <Select value={formData.dokter} onValueChange={(value) => handleInputChange('dokter', value)}>
                  <SelectTrigger className={errors.dokter ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'}>
                    <SelectValue placeholder="Pilih dokter" />
                  </SelectTrigger>
                  <SelectContent>
                    {dokterOptions.map((dokter) => (
                      <SelectItem key={dokter} value={dokter}>
                        {dokter}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.dokter && <p className="text-red-500 text-sm mt-1">{errors.dokter}</p>}
              </div>

              <div>
                <label htmlFor="ruangan" className="block text-sm font-medium text-gray-700 mb-2">
                  Ruangan
                </label>
                <Select value={formData.ruangan} onValueChange={(value) => handleInputChange('ruangan', value)}>
                  <SelectTrigger className={errors.ruangan ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-gray-500'}>
                    <SelectValue placeholder="Pilih ruangan" />
                  </SelectTrigger>
                  <SelectContent>
                    {ruanganOptions.map((ruangan) => (
                      <SelectItem key={ruangan} value={ruangan}>
                        {ruangan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.ruangan && <p className="text-red-500 text-sm mt-1">{errors.ruangan}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/')}
                className="flex-1"
                disabled={loading}
              >
                Batal
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gray-900 hover:bg-gray-800"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Simpan
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}