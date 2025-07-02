import { Route, Routes } from "react-router-dom"
import IndexPage from "./pages/Index.page"
import PasienForm from "./components/pasien/Pasien.form"
import NotFoundPage from "./pages/NotFound.page"

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/pasien-baru" element={<PasienForm />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
