import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { useQuery } from "@tanstack/react-query";

function useHome() {

    const { userData } = useAuth()

    const { data, isLoading} = useQuery({
        queryKey: ['home'],
        queryFn: () => API.estadisticas.totales(userData && userData.tokenWithBearer),
        enabled: !!(userData && userData.token),
        staleTime: 10 * 60 * 1000, // Evita reconsultas innecesarias por 10 minutos
        refetchOnWindowFocus: false,
    })
    return { info: data?.results, isLoading }
}

export default useHome;