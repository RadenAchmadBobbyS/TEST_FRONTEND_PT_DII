# 🏥 Modul Rawat Inap - Pasien Masuk

Sistem manajemen pasien rawat inap yang dibuat dengan **React**, **TypeScript**, dan **TailwindCSS**. Aplikasi ini menyediakan fitur lengkap untuk pendaftaran dan pengelolaan data pasien rawat inap.

## ✨ Fitur Utama

### 📋 **Formulir Pasien Masuk**

- Form input lengkap: Nama, NIK, Diagnosa, Tanggal Masuk, Dokter, Ruangan
- Validasi form komprehensif (required fields, format NIK, validasi tanggal)
- Loading state dan error handling
- UI responsif dan user-friendly

### 📊 **Daftar Pasien Aktif**

- Tabel data pasien dengan mock data (delay 500ms untuk testing)
- **Fitur pencarian** berdasarkan nama dan NIK
- **Sorting** untuk semua kolom (nama, NIK, tanggal, diagnosa, dokter, ruangan)
- **Pagination** dengan navigasi yang intuitif
- Loading state dan empty state yang menarik

### 🔄 **Navigasi Halaman**

- Transisi smooth antara Formulir ↔ Daftar Pasien
- Notification system untuk feedback user
- 404 page untuk route yang tidak valid

## 🛠️ Tech Stack

- **Frontend**: React 19+ dengan TypeScript
- **Styling**: TailwindCSS + shadcn/ui components
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Linting**: ESLint

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd Modul-Rawat-Inap-Pasien-Masuk-TEST-FRONTEND-PT-DII
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── pasien/          # Patient-specific components
│   │   ├── Pasien.form.tsx
│   │   └── Pasien.table.tsx
│   └── Layout.tsx
├── pages/
│   ├── Index.page.tsx   # Main patient list page
│   └── NotFound.page.tsx
├── stores/
│   └── pasienStore.ts   # Zustand store
├── types/
│   └── type.ts          # TypeScript interfaces
├── utils/
│   └── mockData.ts      # Mock data and options
├── lib/
│   └── utils.ts         # Utility functions
└── main.tsx
```

## 🎯 Key Features Deep Dive

### Form Validation

- **NIK**: Validasi 16 digit angka
- **Nama**: Minimal 2 karakter
- **Diagnosa**: Minimal 5 karakter
- **Tanggal**: Tidak boleh masa lalu, maksimal 30 hari ke depan
- **Dokter & Ruangan**: Required selection

### Table Functionality

- **Search**: Real-time search berdasarkan nama atau NIK
- **Sort**: Click header untuk sort ascending/descending
- **Pagination**: Navigasi halaman dengan page numbers
- **Responsive**: Horizontal scroll pada mobile

### State Management

- **Zustand store** untuk state global
- **Filtered data** terpisah dari raw data
- **Persistent state** selama session
- **Optimistic updates** untuk UX yang responsif

## 🎨 Design System

### Color Palette

- **Primary**: Gray-900 untuk aksi utama
- **Background**: Pure white untuk minimalism
- **Text**: Gray hierarchy yang subtle
- **Borders**: Light gray yang clean

### Components

- **Consistent spacing** dengan Tailwind scale
- **Subtle animations** untuk feedback
- **Accessibility-first** design
- **Mobile-responsive** layout

## 📝 Mock Data

Aplikasi menggunakan mock data dengan 8 pasien contoh:

- Data realistic dengan diagnosa medis yang valid
- Delay 500ms untuk simulate API call
- Options untuk dokter dan ruangan yang konsisten

## 🔧 Development Notes

### TypeScript

- **Strict mode** enabled
- **No any** types digunakan
- **Comprehensive interfaces** untuk type safety

### Performance

- **Lazy loading** untuk komponen besar
- **Debounced search** untuk optimasi
- **Memoized calculations** di table
- **Efficient re-renders** dengan Zustand

### Code Quality

- **ESLint** dengan strict rules
- **Consistent naming** conventions
- **Reusable components** pattern
- **Clean code** principles

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Dibuat dengan ❤️ menggunakan React + TypeScript + TailwindCSS**
