import { utils } from "@/core/helpers/utils";
import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { VentasAcumuladasMesResults } from "@/services/dto/ventas/ventasAcumuladosMes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useVentasAcumuladasMes() {
    
    const [month,setMonth] = useState<string>(utils.getMonthFormatMM())
    const [year,setYear] = useState<string>(utils.getYearFormatYYYY())
    const [data, setData] = useState<VentasAcumuladasMesResults | null>(null)
    const {userData} = useAuth()
    
    const {isLoading} = useQuery({
        queryKey: ['ventasAcumuladas'],
        queryFn: async() => {
            const periodo = `${year}-${month}`
            const res = await API.venta.acumuladasMes( periodo, userData && userData.tokenWithBearer)
            if(res && res.success){
                
                setData(res.results)
            }
            return null
        },
        
        staleTime: 30 * 60 * 1000, // Evita reconsultas innecesarias por 30 minutos
        refetchOnWindowFocus: false,
    })

    const filtrarMutate = useMutation({
        mutationFn: async() => {
            const periodo = `${year}-${month}`
            const res = await API.venta.acumuladasMes( periodo, userData && userData.tokenWithBearer)
            if(res.success){
                return res
            }
            return null
        },
        onSettled(data) {
            if(data && data.results && data.success){
                setData(data.results)
            }   
        },
    })

    
    return {
        isLoading : isLoading || filtrarMutate.isPending,
        data,
        month,
        year,
        setMonth,
        setYear,
        filtrar : filtrarMutate.mutate
    }
}

