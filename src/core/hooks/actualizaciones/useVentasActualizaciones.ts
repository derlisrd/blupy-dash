import { useAuth } from "@/hooks/useAuth"
import { actualizacionesApiService } from "@/services/api/actualizaciones"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

function useVentasActualizaciones() {
    
    const {userData} = useAuth()
    const [fecha, setFecha] = useState<string>('')

    const {isPending,mutate} = useMutation ({
        mutationKey: ['ventas', 'actualizar'],
        mutationFn: async () => {
            const res = await actualizacionesApiService.ventas(fecha, userData && userData.tokenWithBearer)
            return res
        }
    })

    
    
    return {
    isPending, enviar : mutate, fecha, setFecha
    }
}
export default useVentasActualizaciones