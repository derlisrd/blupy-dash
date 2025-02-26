import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { SolicitudesResults } from "@/services/dto/solicitudes/solicitudes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function useSolicitudes() {
    const {userData} = useAuth()
    
    const [lista,setLista] = useState<SolicitudesResults[]>([])

    const { isLoading, data  } = useQuery({
        queryKey: ["solicitudes"],
        queryFn: () =>  API.solicitudes.list( userData && userData.tokenWithBearer ),
        enabled: !!(userData && userData.token),
        staleTime: 1000 * 60 * 5,
      });
    
    const {isPending, mutate} = useMutation({
        mutationFn: (q: string) => API.solicitudes.buscar(q, userData && userData.tokenWithBearer),
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
      setLista(data ? data.results : [] ); //(data) ¯\_(ツ)_/¯
    }, [data]);

    return {lista, isLoading, buscar, isPending}
}

export default useSolicitudes;