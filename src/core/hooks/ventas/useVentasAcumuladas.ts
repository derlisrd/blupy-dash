import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { useQuery } from "@tanstack/react-query";

export function useVentasAcumuladas() {
    
    const {userData} = useAuth()
    
    const {isLoading, data} = useQuery({
        queryKey: ['ventasAcumuladas'],
        queryFn: async() => {
            const res = await API.venta.acumuladas(userData && userData.tokenWithBearer)
            if(res.success){
                return res.results
            }
            return null
        }
    })

    
    return {
        isLoading,
        data
    }
}

