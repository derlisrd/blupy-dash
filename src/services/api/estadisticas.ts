import { BASE } from "../base"
import { TotalesResponse } from "../dto/estadisticas/totales"


export const estadisticasApiService = {
    totales: async(token: string | null)=>{
        try {
            const {data, status} = await BASE.get('/estadisticas/totales', {headers: { Authorization: token}})
            return new TotalesResponse({success: true, message: data.message, results: data.results, status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new TotalesResponse({success: false, message: error.message, results: null, status: 500})
            }
            return new TotalesResponse({success: false, message: 'Error desconocido', results: null, status: 500})
        }
    }
}