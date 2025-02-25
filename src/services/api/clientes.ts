import { BASE } from "../base"
import {  ClientesResponse } from "../dto/clientes/clientes"

export const clientesApiService = {
    list: async(token: string | null)=>{
        try {
            const {data, status} = await BASE.get('/clientes',{headers: { Authorization: token}})
            return new ClientesResponse({success: true, message: '', results: data.results  , status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new ClientesResponse({success: false, message: error.message, results: [], status: 500})
            }
            return new ClientesResponse({success: false, message: 'Error desconocido', results: [], status: 500})
        }
        
    }
}