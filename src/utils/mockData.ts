import type { Pasien } from "@/types/type"

export async function mockPasienList(): Promise<Pasien[]> {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          id: '1',
          nama: 'Andi Saputra',
          nik: '1234567890123456',
          diagnosa: 'Demam Berdarah Dengue (DBD)',
          tanggalMasuk: '2025-06-30',
          dokter: 'dr. Lisa Andini, Sp.PD',
          ruangan: 'Anggrek 1'
        },
        {
          id: '2',
          nama: 'Budi Santoso',
          nik: '6543210987654321',
          diagnosa: 'Pneumonia',
          tanggalMasuk: '2025-06-28',
          dokter: 'dr. Ahmad Rahman, Sp.P',
          ruangan: 'Melati 2'
        },
        {
          id: '3',
          nama: 'Citra Dewi',
          nik: '1122334455667788',
          diagnosa: 'Gastritis Akut',
          tanggalMasuk: '2025-07-01',
          dokter: 'dr. Sarah Pratiwi, Sp.PD',
          ruangan: 'Mawar 3'
        },
        {
          id: '4',
          nama: 'Dedi Kurniawan',
          nik: '9988776655443322',
          diagnosa: 'Hipertensi Grade 2',
          tanggalMasuk: '2025-06-25',
          dokter: 'dr. Michael Tan, Sp.JP',
          ruangan: 'Dahlia 1'
        },
        {
          id: '5',
          nama: 'Eka Putri Maharani',
          nik: '5566778899001122',
          diagnosa: 'Diabetes Mellitus Tipe 2',
          tanggalMasuk: '2025-07-02',
          dokter: 'dr. Indira Sari, Sp.PD',
          ruangan: 'Anggrek 2'
        },
        {
          id: '6',
          nama: 'Fajar Hidayat',
          nik: '3344556677889900',
          diagnosa: 'Appendisitis Akut',
          tanggalMasuk: '2025-06-29',
          dokter: 'dr. Roberto Silva, Sp.B',
          ruangan: 'Melati 1'
        },
        {
          id: '7',
          nama: 'Gita Permatasari',
          nik: '7788990011223344',
          diagnosa: 'Bronkitis Akut',
          tanggalMasuk: '2025-06-27',
          dokter: 'dr. Ahmad Rahman, Sp.P',
          ruangan: 'Mawar 1'
        },
        {
          id: '8',
          nama: 'Hendra Wijaya',
          nik: '2233445566778899',
          diagnosa: 'Infeksi Saluran Kemih',
          tanggalMasuk: '2025-06-26',
          dokter: 'dr. Lisa Andini, Sp.PD',
          ruangan: 'Dahlia 2'
        }
      ])
    }, 500)
  )
}

export const dokterOptions = [
  'dr. Lisa Andini, Sp.PD',
  'dr. Ahmad Rahman, Sp.P',
  'dr. Sarah Pratiwi, Sp.PD',
  'dr. Michael Tan, Sp.JP',
  'dr. Indira Sari, Sp.PD',
  'dr. Roberto Silva, Sp.B',
  'dr. Maya Sari, Sp.A',
  'dr. David Chen, Sp.OG'
]

export const ruanganOptions = [
  'Anggrek 1',
  'Anggrek 2',
  'Anggrek 3',
  'Melati 1',
  'Melati 2',
  'Melati 3',
  'Mawar 1',
  'Mawar 2',
  'Mawar 3',
  'Dahlia 1',
  'Dahlia 2',
  'Dahlia 3'
]