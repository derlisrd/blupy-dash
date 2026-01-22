import { BASE } from "../base"
import { DevicesResponse } from "../dto/notificaciones/devices"

export const devicesApiService = {
    solicitudes: async()=>{
        try {
            const {data} = await BASE.get('/devices/solicitudes')
            return  DevicesResponse.fromJson(data)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error de servidor')
            }
             throw new Error('Error de app')
        }
    },
    aprobar: async(id: number)=>{
        try {
            const {data} = await BASE.post('/devices/aprobar', {id})
            return  data
        } catch (error) {
            if (error instanceof Error) {
                throw new Error('Error de servidor')
            }
             throw new Error('Error de app')
        }
    },
}