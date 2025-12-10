import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createCompany, getCompany, updateCompany } from '../services/companyService'
import { useNavigate, useParams } from 'react-router-dom'

export default function CompanyForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    if (id) {
      getCompany(id).then(res => {
        reset({
          company_name: res.data.company_name,
          email_id: res.data.email_id,
          company_code: res.data.company_code || '',
          website: res.data.website || ''
        })
      })
    }
  }, [id, reset])

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateCompany(id, data)
      } else {
        await createCompany(data)
      }
      navigate('/')
    } catch (err) {
      const resp = err.response?.data
      if (resp) {
        const msgs = Object.entries(resp).map(([k,v]) => `${k}: ${JSON.stringify(v)}`).join('\n')
        alert('Server validation errors:\n' + msgs)
      } else {
        alert('Server error')
      }
    }
  }

  return (
    <div>
      <h2>{id ? 'Edit Company' : 'Create Company'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label>Company Name</label>
        <input {...register('company_name', { required: 'Required', minLength: { value:5, message: 'Min 5 chars' } })} />
        {errors.company_name && <small className="error">{errors.company_name.message}</small>}

        <label>Email</label>
        <input {...register('email_id', { required: 'Required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} />
        {errors.email_id && <small className="error">{errors.email_id.message}</small>}

        <label>Company Code (optional)</label>
        <input {...register('company_code')} />

        <label>Website (optional)</label>
        <input {...register('website', { pattern: { value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/, message: 'Invalid URL' } })} />
        {errors.website && <small className="error">{errors.website.message}</small>}

        <div style={{marginTop:10}}>
          <button type="submit">{id ? 'Update' : 'Create'}</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
