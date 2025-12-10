import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CompanyList from './pages/CompanyList'
import CompanyForm from './pages/CompanyForm'
import CompanyView from './pages/CompanyView'

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <h1><Link to="/">Company Manager</Link></h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<CompanyList />} />
            <Route path="/companies/new" element={<CompanyForm />} />
            <Route path="/companies/:id" element={<CompanyView />} />
            <Route path="/companies/:id/edit" element={<CompanyForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
