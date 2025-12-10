import React, { useEffect, useState } from 'react'
import { listCompanies, deleteCompany } from '../services/companyService'
import { Link } from 'react-router-dom'

export default function CompanyList() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)

  const fetch = async () => {
    setLoading(true)
    try {
      const res = await listCompanies()
      setCompanies(res.data)
    } catch (err) {
      alert('Error fetching companies')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetch() }, [])

  const onDelete = async (id) => {
    if (!window.confirm('Delete this company?')) return
    try {
      await deleteCompany(id)
      fetch()
    } catch (err) {
      alert('Error deleting')
    }
  }

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Companies</h2>
        <Link to="/companies/new"><button>Create Company</button></Link>
      </div>

      {loading ? <p>Loading...</p> : (
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Code</th><th>Website</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td><Link to={`/companies/${c.id}`}>{c.company_name}</Link></td>
                <td>{c.email_id}</td>
                <td>{c.company_code || '-'}</td>
                <td>{c.website ? <a href={c.website} target="_blank" rel="noreferrer">open</a> : '-'}</td>
                <td>
                  <Link to={`/companies/${c.id}/edit`}><button>Edit</button></Link>
                  <button onClick={() => onDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr><td colSpan="6">No companies yet</td></tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
