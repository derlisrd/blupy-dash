import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { SolicitudesResults } from "@/services/dto/solicitudes/solicitudes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

function useSolicitudes() {
    const {userData} = useAuth()
    
    const [lista,setLista] = useState<SolicitudesResults[]>([])

    const { isLoading  } = useQuery({
        queryKey: ["solicitudes"],
        queryFn: async() =>  {
            const res = await API.solicitudes.list( userData && userData.tokenWithBearer )
            if(res && res.success){
                setLista(res.results)
            }
            return res.results
        },
        enabled: !!(userData && userData.token),
        staleTime: 1000 * 60 * 5,
      });
    
    const {isPending, mutate} = useMutation({
        mutationFn: (q: string) => API.solicitudes.buscar(q, userData && userData.tokenWithBearer),
        onError: (error) => {
            console.log(error)
        },
        onSettled: (data) => {
            if( data && data.results && data.success){
                setLista(data.results)
            }
        }
    });

    const actualizarMutate = useMutation({
        mutationFn: (data: SolicitudesResults) => API.solicitudes.actualizarSolicitud(data.codigo, userData && userData.tokenWithBearer),
        onError: (error) => {
            console.log(error)
        },
        onSettled: (response, _, variables) => {
            const listaAnterior = [...lista]
            const findIndex = listaAnterior.findIndex(item => item.id === variables.id)
            if(findIndex>0 && response && response.results){
                listaAnterior[findIndex].estado = response?.results?.estado
                listaAnterior[findIndex].estado_id = Number(response?.results?.estado_id) 
                setLista(listaAnterior)
            }
        }
    });

    const actualizar = (data: SolicitudesResults | null) => data && actualizarMutate.mutate(data)
    

    const buscar = (q: string) => {mutate(q)}
    
    return {lista, isLoading: isLoading || actualizarMutate.isPending, buscar, isPending, actualizar}
}

export default useSolicitudes;