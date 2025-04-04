import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { ClientesResults } from "@/services/dto/clientes/clientes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function useClientes() {
    const {userData} = useAuth()

    const [modals, setModals] = useState({
      ficha: false,
    });
    
    const handleModals = (modal: keyof typeof modals, open: boolean) => {
      setModals((prev) => ({ ...prev, [modal]:open }));
    };
    
    const [lista,setLista] = useState<ClientesResults[]>([])

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["clientes", userData && userData.token],
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

    const cambiarEstado = useMutation({
      mutationFn: (id: number) => API.clientes.cambiarEstado(userData && userData.tokenWithBearer, id),
      onError: (error) => {
          console.log(error)
      },
      onSettled: (data,error,id) => {
        
         if(data && data.success && !error){
          const copiaLista = [...lista]
          const findUser = copiaLista.find((cliente) => cliente.user_id === id);
         if (findUser) {
            findUser.active = findUser.active === 1 ? 0 : 1;
            setLista(copiaLista);
          }
         }
      }
  });

    const buscar = (q: string) => {mutate(q)}
    
    const cambiarEstadoCliente = (id: number) => {
      cambiarEstado.mutate(id)
    }

    useEffect(() => {
      if (data) {
        setLista(data.results);
      }
    }, [data]);
    
    return {lista, isLoading, isPending, buscar, modals, handleModals,cambiarEstadoCliente, refetch}
}

export default useClientes;