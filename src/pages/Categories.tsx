import { Link, useSearchParams } from "react-router-dom"
import Category from "../models/Category"
import { ChangeEvent, useState } from "react"

function Categories() {
    const [categories, setCategories] = useState<Category[]>()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [queryParams, setQueryParams] = useSearchParams()
    const titleQuery = queryParams.get('titulo') || ''

    const hadleSearchChange = (e: ChangeEvent<HTMLInputElement>) => { // Cambiar la url
        setQueryParams(e.target.value ? { titulo: e.target.value } : {})
      }

  return (
    <div className='text-white flex flex-col' >
    <h1 >Listado de Ofertas</h1>
    <Link to="/categories/new">Añadir nueva Categoria</Link>
    {loading && <p>Cargando...</p>}
    {error && <p>{error}</p>}
    <label >Buscar por titulo:</label>
    <input value={titleQuery} onChange={hadleSearchChange} name="titulo" />

    {categories?.length === 0 && <p>No hay ofertas</p>}
    {categories?.map(category =>
      <div key={category.id}>
        {category.name}
        <Link to={`/offers/${category.id}`}>Ver</Link>
        <Link to={`/offers/edit/${category.id}`}>Editar</Link>
        <button onClick={() => handleOnClick(category.id)}>Borrar</button>
      </div>
    )}
  </div>
  )
}

export default Categories