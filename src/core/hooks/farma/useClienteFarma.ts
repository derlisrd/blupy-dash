import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { ConsultaClienteResults } from "@/services/dto/farma/consultas";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function useClienteFarma() {
    const { userData } = useAuth()
    const [datos,setDatos] = useState<ConsultaClienteResults | null>(null)

    const {isPending, mutate} = useMutation({
        mutationKey: ["consultaCliente"],
        mutationFn: async(q: string)=> API.farma.consultarClientesFarma(q, userData && userData.token),
        onSettled: (data) => {
            if(data?.success){
                setDatos(data.results)
            }
        }
    })
    
    const buscar = (q: string)=> mutate(q)

    return {isPending, datos, buscar}
}

export default useClienteFarma;