import { create } from "zustand";
import type { Pasien, SortConfig } from "@/types/type";
import { mockPasienList } from "@/utils/mockData";

type PasienStore = {
    pasienList: Pasien[]
    filteredPasienList: Pasien[]
    loading: boolean
    searchTerm: string
    sortConfig: SortConfig | null
    currentPage: number
    itemsPerPage: number
    fetchPasien: () => Promise<void>
    addPasien: (pasien: Pasien) => void
    setSearchTerm: (term: string) => void
    setSortConfig: (config: SortConfig | null) => void
    setCurrentPage: (page: number) => void
    filterAndSortPasien: () => void
}

export const usePasienStore = create<PasienStore>((set, get) => ({
    pasienList: [],
    filteredPasienList: [],
    loading: false,
    searchTerm: '',
    sortConfig: null,
    currentPage: 1,
    itemsPerPage: 10,
    
    fetchPasien: async () => {
        set({ loading: true })
        try {
            const data = await mockPasienList()
            set({ pasienList: data, loading: false })
            get().filterAndSortPasien()
        } catch (error) {
            set({ loading: false })
        }
    },
    
    addPasien: (pasien) => {
        // Get current state
        const currentState = get()
        
        // Add to main list
        const newPasienList = [...currentState.pasienList, pasien]
        
        // Update main list first
        set({ pasienList: newPasienList })
        
        // Get updated state
        const updatedState = get()
        
        // Update filtered list
        const { searchTerm, sortConfig } = updatedState
        
        // Filter by search term
        let filtered = newPasienList.filter(p => 
            p.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.nik.includes(searchTerm)
        )
        
        // Sort data if needed
        if (sortConfig) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key]
                const bValue = b[sortConfig.key]
                
                if (sortConfig.key === 'tanggalMasuk') {
                    const dateA = new Date(aValue).getTime()
                    const dateB = new Date(bValue).getTime()
                    return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA
                }
                
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
                return 0
            })
        }
        
        // Update filtered list
        set({ filteredPasienList: filtered })
    },
    
    setSearchTerm: (term) => {
        set({ searchTerm: term, currentPage: 1 })
        get().filterAndSortPasien()
    },
    
    setSortConfig: (config) => {
        set({ sortConfig: config })
        get().filterAndSortPasien()
    },
    
    setCurrentPage: (page) => set({ currentPage: page }),
    
    filterAndSortPasien: () => {
        const { pasienList, searchTerm, sortConfig } = get()
        
        // Filter by search term
        let filtered = pasienList.filter(pasien => 
            pasien.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pasien.nik.includes(searchTerm)
        )
        
        // Sort data
        if (sortConfig) {
            filtered.sort((a, b) => {
                const aValue = a[sortConfig.key]
                const bValue = b[sortConfig.key]
                
                if (sortConfig.key === 'tanggalMasuk') {
                    const dateA = new Date(aValue).getTime()
                    const dateB = new Date(bValue).getTime()
                    return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA
                }
                
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
                return 0
            })
        }
        
        set({ filteredPasienList: filtered })
    }
}))

