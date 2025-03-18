
import { BASE } from "../base"
import { FichaResponse } from "../dto/notificaciones/ficha"
import { NotificacionResponse } from "../dto/notificaciones/notificacion"

export const notificacionesApiService = {
    ficha: async( q: string, token: string | null)=>{
        try {
            const {data, status} = await BASE.get(`/notificacion/ficha?cedula=${q}`, {headers: { Authorization: token}})
            return FichaResponse.fromJSON({success: true, message: data.message, results: data.results, status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new FichaResponse({success: false, message: error.message, results: null, status: 500})
            }
            return new FichaResponse({success: false, message: 'Error desconocido', results: null, status: 500})
        }
    },
    sendIndividual : async ({ token, id, title, body }: { token: string | null, id: number, title: string, body: string }) => {
        try {
            const {data, status} = await BASE.post(`/notificacion/individual`, {device_id: id, title, body}, {headers: { Authorization: token}})
            return new NotificacionResponse({success: true, message: data.message, status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new NotificacionResponse({success: false, message: error.message, status: 500})
            }
            return new NotificacionResponse({success: false, message: 'Error desconocido',  status: 500})
        }
    },
    sendDifusion : async ({ token, title, body }: { token: string | null,title: string, body: string }) => {
        try {
            const {data, status} = await BASE.post(`/notificacion/difusion`, { title, text: body}, {headers: { Authorization: token}})
            return new NotificacionResponse({success: true, message: data.message, status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new NotificacionResponse({success: false, message: error.message, status: 500})
            }
            return new NotificacionResponse({success: false, message: 'Error desconocido',  status: 500})
        }
    },
}