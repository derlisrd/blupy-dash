import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { AdjuntosResponse } from "@/services/dto/adjuntos/adjuntos";
import { useQuery } from "@tanstack/react-query";

function useAdjuntos(id:  string){
    
    const {userData} = useAuth()

    const {isLoading, data} = useQuery({
        queryKey: ['adjuntos', id],
        queryFn: async () => API.adjuntos.getAdjuntos(userData && userData.tokenWithBearer, id),
        enabled: !!id,
        select: (data : AdjuntosResponse) => {
            const response = new AdjuntosResponse(data)
            return response.results ?? []
        }
    })
    
    return {isLoading, data}
}

export default useAdjuntos;