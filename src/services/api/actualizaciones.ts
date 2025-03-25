import { BASE } from "../base"

export const actualizacionesApiService = {
    ventas: async(fecha: string, token: string | null) => {
        try {
            const {data, status} = await BASE.post('/jobs/update-ventas-farma',{fecha},{headers:{'Authorization': token}})
            return {
                success: data.success as boolean,
                message: data.message as string,
                status
            }
        } catch (error) {
            return {
                success: false,
                message: 'Error al actualizar ventas',
                status: 500
            }
        }
    }
}