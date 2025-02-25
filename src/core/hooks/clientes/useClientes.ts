import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { useQuery } from "@tanstack/react-query";

function useClientes() {
    const {userData} = useAuth()
    const { data, isLoading } = useQuery({
        queryKey: ["clientes"],
        queryFn: () =>  API.clientes.list( userData && userData.tokenWithBearer ),
        enabled: !!(userData && userData.token),
        staleTime: 1000 * 60 * 5,
      });
    
    
    return {lista : data?.results, isLoading}
}

export default useClientes;