import React, { useEffect, useState } from 'react'
import { getCompany } from '../services/companyService'
import { useParams, Link } from 'react-router-dom'

export default function CompanyView() {
  const { id } = useParams()
  const [company, setCompany] = useState(null)

  useEffect(() => {
    getCompany(id).then(res => setCompany(res.data)).catch(() => alert('Not found'))
  }, [id])

  if (!company) return <p>Loading...</p>

  return (
    <div>
      <h2>{company.company_name}</h2>
      <p><strong>Email:</strong> {company.email_id}</p>
      <p><strong>Code:</strong> {company.company_code || '-'}</p>
      <p>
        <strong>Website:</strong>{' '}
        {company.website ? (
          <a href={company.website} target="_blank" rel="noreferrer">{company.website}</a>
        ) : (
          '-'
        )}
      </p>
      <p><strong>Created:</strong> {new Date(company.created_time).toLocaleString()}</p>
      <div style={{ marginTop: 10 }}>
        <Link to={`/companies/${id}/edit`}><button>Edit</button></Link>
        <Link to="/"><button>Back</button></Link>
      </div>
    </div>
  )
}
