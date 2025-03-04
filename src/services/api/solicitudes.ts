import { BASE } from "../base"
import { SolicitudesResponse } from "../dto/solicitudes/solicitudes"

export const solicitudesApiService = {
    list: async(token: string | null)=>{
        try {
            const {data, status} = await BASE.get('/solicitudes',{headers: { Authorization: token}})
            return  SolicitudesResponse.fromJSON({success: true, message: '', results: data.results  , status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new SolicitudesResponse({success: false, message: error.message, results: [], status: 500})
            }
            return new SolicitudesResponse({success: false, message: 'Error desconocido', results: [], status: 500})
        }

    },
    buscar: async(q : string,  token: string | null)=>{
        try {
            const {data, status} = await BASE.get(`/solicitudes/buscar?q=${q}`,{headers: { Authorization: token}})
            return  SolicitudesResponse.fromJSON({success: true, message: '', results: data.results  , status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new SolicitudesResponse({success: false, message: error.message, results: [], status: 500})
            }
            return new SolicitudesResponse({success: false, message: 'Error desconocido', results: [], status: 500})
        }

    },

}