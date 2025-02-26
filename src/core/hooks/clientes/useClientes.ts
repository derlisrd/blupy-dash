import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { ClientesResults } from "@/services/dto/clientes/clientes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function useClientes() {
    const {userData} = useAuth()

    const [lista,setLista] = useState<ClientesResults[]>([])

    const { data, isLoading } = useQuery({
        queryKey: ["clientes"],
        queryFn: () =>  API.clientes.list( userData && userData.tokenWithBearer ),
        enabled: !!(userData && userData.token),
        staleTime: 1000 * 60 * 5,
      });
    
      const {isPending, mutate} = useMutation({
        mutationFn: (q: string) => API.clientes.buscar(q, userData && userData.tokenWithBearer),
        onError: (error) => {
            console.log(error)
        },
        onSettled: (data) => {
            if(data?.success){
                setLista(data.results)
            }
        }
    });
    const buscar = (q: string) => {mutate(q)}
    

    useEffect(() => {
      if (data) {
        setLista(data.results);
      }
    }, [data]);
    
    return {lista, isLoading, isPending, buscar}
}

export default useClientes;