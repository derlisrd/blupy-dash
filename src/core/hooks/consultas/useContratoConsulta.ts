import { useAuth } from "@/hooks/useAuth";
import API from "@/services";

import { useMutation } from "@tanstack/react-query";


function useContratoConsulta() {
    const { userData } = useAuth()

    const {isPending, mutate, data} = useMutation({
        mutationKey: ["contratoPorDocumento"],
        mutationFn: async(q: string)=> API.consultas.contratoPorDocumento(q, userData && userData.token),
    })

    
    const buscar = (q: string)=> mutate(q)

    return {isPending, datos : data ? data.results : null, buscar}
}

export default useContratoConsulta;