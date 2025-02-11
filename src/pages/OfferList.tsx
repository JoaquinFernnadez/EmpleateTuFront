import { ChangeEvent, useEffect, useState } from 'react'
import Offer from '../models/Offer'
import { OfferService } from '../services/offer.service'
import { Link, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'


function OfferList() {
  const [offers, setOffers] = useState<Offer[]>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  // const [titleQuery, setTitleQuery] = useState(null)
  const [queryParams, setQueryParams] = useSearchParams()
  const titleQuery = queryParams.get('titulo') || ''
  useEffect(() => {

    OfferService.search(titleQuery)
      .then(setOffers)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [titleQuery])
  const hadleSearchChange = (e: ChangeEvent<HTMLInputElement>) => { // Cambiar la url
    setQueryParams(e.target.value ? { titulo: e.target.value } : {})
  }
  const handleOnClick = async (id: number) => {
    if(!window.confirm('¿Seguro que quieres borrar esta oferta?')) return 

    try{
      await OfferService.delete(id)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
      setOffers(offers?.filter(offer => offer.id !== id))
      toast.success('Oferta borrada corectamente')
    }catch(error){
      toast.error('Error sl borrar la oferta')
      setError(error instanceof Error ? error.message : 'Error desconocido')
    }
  }


  return (
    <div className='text-white flex flex-col' >
      <h1 >Lisatdo de Ofertas</h1>
      <Link to="/offers/new">Añadir nueva oferta</Link>
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      <label >Buscar por titulo:</label>
      <input value={titleQuery} onChange={hadleSearchChange} name="titulo" />

      {offers?.length === 0 && <p>No hay ofertas</p>}
      {offers?.map(offer =>
        <div key={offer.id}>
          {offer.title}
          <Link to={`/offers/${offer.id}`}>Ver</Link>
          <Link to={`/offers/edit/${offer.id}`}>Editar</Link>
          <button onClick={() => handleOnClick(offer.id)}>Borrar</button>
        </div>
      )}
    </div>
  )
}

export default OfferList