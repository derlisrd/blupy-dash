import { BASE } from "../base"
import { TotalesResponse } from "../dto/totales/totales"


export const totalesApiService = {
    totales: async(token: string | null)=>{
        try {
            const {data, status} = await BASE.get('/totales', {headers: { Authorization: token}})
            return new TotalesResponse({success: true, message: '', results: data.results, status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new TotalesResponse({success: false, message: error.message, results: null, status: 500})
            }
            return new TotalesResponse({success: false, message: 'Error desconocido', results: null, status: 500})
        }
    }
}