import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { useQuery } from "@tanstack/react-query";

function useHome() {

    const { userData } = useAuth()

    const { data, isLoading} = useQuery({
        queryKey: ['home'],
        queryFn: () => API.info.totales(userData && userData.tokenWithBearer),
        enabled: !!(userData && userData.token),
        staleTime: 1000 * 60 * 5,
    })
    return { info: data?.results, isLoading }
}

export default useHome;