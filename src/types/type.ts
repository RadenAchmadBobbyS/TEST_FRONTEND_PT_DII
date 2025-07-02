import type { ReactNode } from "react"


export interface Pasien {
    id: string
    nama: string
    nik: string
    diagnosa: string
    tanggalMasuk: string
    dokter: string
    ruangan: string
}

export interface PasienFormData {
    nama: string
    nik: string
    diagnosa: string
    tanggalMasuk: string
    dokter: string
    ruangan: string
}

export interface FormErrors {
    nama?: string
    nik?: string
    diagnosa?: string
    tanggalMasuk?: string
    dokter?: string
    ruangan?: string
}

export interface SortConfig {
    key: keyof Pasien
    direction: 'asc' | 'desc'
}

export interface TableProps {
    data: Pasien[]
    loading: boolean
    onSort: (key: keyof Pasien) => void
    sortConfig: SortConfig | null
}

export interface SidebarProps {
    currentPath?: string
}

export interface LayoutProps {
  children: ReactNode
  currentPath?: string
}
