import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { usePasienStore } from '@/stores/pasienStore'
import type { Pasien } from '@/types/type'
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, UserPlus, Users } from 'lucide-react'

interface PasienTableProps {
  onAddNew: () => void
}

export default function PasienTable({ onAddNew }: PasienTableProps) {
  const { 
    filteredPasienList, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    sortConfig, 
    setSortConfig,
    currentPage,
    setCurrentPage,
    itemsPerPage
  } = usePasienStore()

  const handleSort = (key: keyof Pasien) => {
    let direction: 'asc' | 'desc' = 'asc'
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    
    setSortConfig({ key, direction })
  }

  const getSortIcon = (columnKey: keyof Pasien) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return null
    }
    
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4 ml-1" /> : 
      <ChevronDown className="w-4 h-4 ml-1" />
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredPasienList.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredPasienList.slice(startIndex, endIndex)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return pages
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Pasien Rawat Inap
          </h1>
          <p className="text-gray-600 text-sm">
            {filteredPasienList.length} pasien aktif
          </p>
        </div>
        <Button onClick={onAddNew} className="bg-gray-900 hover:bg-gray-800 text-white">
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Pasien
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="Cari nama atau NIK..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-gray-300 focus:border-gray-500"
        />
      </div>

      {/* Table */}
      {filteredPasienList.length === 0 ? (
        <div className="text-center py-16 border border-gray-200 rounded-lg">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Tidak ada hasil' : 'Belum ada pasien'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm 
              ? `Tidak ditemukan pasien dengan kata kunci "${searchTerm}"`
              : 'Mulai dengan menambahkan pasien baru'
            }
          </p>
          {!searchTerm && (
            <Button onClick={onAddNew} className="bg-gray-900 hover:bg-gray-800">
              <UserPlus className="w-4 h-4 mr-2" />
              Tambah Pasien
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                      <button 
                        onClick={() => handleSort('nama')}
                        className="flex items-center hover:text-gray-700 transition-colors"
                      >
                        Nama
                        {getSortIcon('nama')}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                      <button 
                        onClick={() => handleSort('nik')}
                        className="flex items-center hover:text-gray-700 transition-colors"
                      >
                        NIK
                        {getSortIcon('nik')}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                      <button 
                        onClick={() => handleSort('tanggalMasuk')}
                        className="flex items-center hover:text-gray-700 transition-colors"
                      >
                        Tanggal
                        {getSortIcon('tanggalMasuk')}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                      <button 
                        onClick={() => handleSort('diagnosa')}
                        className="flex items-center hover:text-gray-700 transition-colors"
                      >
                        Diagnosa
                        {getSortIcon('diagnosa')}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                      <button 
                        onClick={() => handleSort('dokter')}
                        className="flex items-center hover:text-gray-700 transition-colors"
                      >
                        Dokter
                        {getSortIcon('dokter')}
                      </button>
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                      <button 
                        onClick={() => handleSort('ruangan')}
                        className="flex items-center hover:text-gray-700 transition-colors"
                      >
                        Ruangan
                        {getSortIcon('ruangan')}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentData.map((pasien) => (
                    <tr 
                      key={pasien.id} 
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{pasien.nama}</div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 font-mono text-sm">
                        {pasien.nik}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {formatDate(pasien.tanggalMasuk)}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {pasien.diagnosa}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {pasien.dokter}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {pasien.ruangan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                {startIndex + 1}-{Math.min(endIndex, filteredPasienList.length)} dari {filteredPasienList.length}
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                {getPageNumbers().map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                    className={currentPage === pageNumber ? "bg-gray-900 hover:bg-gray-800" : ""}
                  >
                    {pageNumber}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}