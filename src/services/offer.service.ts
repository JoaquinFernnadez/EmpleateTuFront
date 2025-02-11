import Offer from "../models/Offer"
import { fetchAPI } from "../utils/FetchApi"
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE

export class OfferService {
    static async search(title?: string) {
        if(title) return  await fetchAPI(API_URL_BASE+'/offers?title='+ title)
        return await fetchAPI(API_URL_BASE+'/offers')
    }

    static async create(Offer: Partial<Offer>) {

        return await fetchAPI(API_URL_BASE+'/offers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:
                    JSON.stringify(Offer),
                credentials: 'include'
            })
    }
    static async update(Offer: Partial<Offer>, id:number) {

        return await fetchAPI(API_URL_BASE+'/offers/'+ id,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:
                    JSON.stringify(Offer),
                credentials: 'include'
            })
    }
    static async getById(id:number) {
        return await fetchAPI(API_URL_BASE+'/offers/'+ id)
}
    static async delete(id:number) {
         await fetchAPI(API_URL_BASE+'/offers/'+ id,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'  
     }) 
     return
    }
    
}