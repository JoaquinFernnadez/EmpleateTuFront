import  { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Offer from '../models/Offer'
import { OfferService } from '../services/offer.service'
import { useNavigate, useParams } from 'react-router-dom'
import { Temporal } from 'temporal-polyfill'


function OfferForm() {
  const now = Temporal.Now.plainDateISO()
  const threeMonthsLater = now.add({ months: 3 }).toString().slice(0, 16)
  
  const [form, setForm] = useState<Partial<Offer>>({
    title: '',
    description: '',
    active: false,
    contactEmail: '',
    location: '',
    published: new Date().toISOString().slice(0, 16),
    expired: threeMonthsLater,
    idCategory: undefined 
  })

  const {id} = useParams()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false) 
  const navigate = useNavigate() 
  
  useEffect(() => {
    if(id) {
      setLoading(true)
      OfferService.getById(Number(id))
      .then(data => setForm({
        ...data,
        published: new Date(data.published || '').toISOString().slice(0, 16),
        expired: new Date(data.expired || '').toISOString().slice(0, 16)
      }))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
    }
  },[id])

  const handleSubmit = (e: FormEvent) => {
    try {
      setLoading(true)
      e.preventDefault()
      const formData = {
        ...form,
        published: new Date(form.published || '').toISOString(),
        expired: new Date(form.expired || '').toISOString()
      }
    
   
    if(id) OfferService.update(formData,Number(id))
    else OfferService.create(formData)
    navigate('/offers')
    
    } catch (error) {
        setError(error instanceof Error ? error.message : 'Error desconocido')
    }finally{
      setLoading(false)
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target
    setForm({ ...form, [name]: value })
  }
  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const {checked, name} = e.target
    setForm({ ...form, [name]: checked })
  }

  if(loading) return <p>Loading...</p>
  return (
    <div className='text-white flex flex-col'>
      <h1>Insercion de nueva oferta</h1>
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <label>
          Titulo:
          <input type="text" name="title" value={form.title} onChange={handleChange} /> 
        </label>
        <label>
          Descripción:
          <input type="text" name="description" value={form.description} onChange={handleChange} /> 
        </label>
        <label>
          Email de contacto:
          <input type="text" name="contactEmail" value={form.contactEmail} onChange={handleChange} /> 
        </label>
        <label>
          Localización:
          <input type="text" name="Location" value={form.location} onChange={handleChange} /> 
        </label>
        <label>
          Fecha de Publicación:
          <input type="datetime-local" name="published" value={form.published} onChange={handleChange} /> 
        </label>
        <label>
          Fecha fin de Publicación:
          <input type="datetime-local" name="expired" value={form.expired} onChange={handleChange} /> 
        </label>
        <label>
          Publicación
          <input type="checkbox" name="title" checked={form.active} onChange={handleChangeCheckbox} /> 
        </label>
        <button>Guardar</button>
      </form>
    </div>
  )
}

export default OfferForm