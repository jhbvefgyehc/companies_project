import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export const listCompanies = () => axios.get(`${API_BASE}/companies/`)
export const getCompany = id => axios.get(`${API_BASE}/companies/${id}/`)
export const createCompany = data => axios.post(`${API_BASE}/companies/`, data)
export const updateCompany = (id, data) => axios.put(`${API_BASE}/companies/${id}/`, data)
export const deleteCompany = id => axios.delete(`${API_BASE}/companies/${id}/`)
