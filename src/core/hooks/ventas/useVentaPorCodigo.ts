import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { VentasPorFacturaResults } from "@/services/dto/ventas/ventaPorFactura";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";

function useVentasPorCodigo(codigo: string){
    const [search, setSearch] = useState("");
    const { userData } = useAuth();
    const [data,setData] = useState<VentasPorFacturaResults | null>(null);

    const { isPending, mutate } = useMutation({
        mutationKey: ['ventaPorCodigo',codigo],
        mutationFn: async () => {
            
            const  response = await API.venta.ventaPorCodigo(codigo, userData && userData.tokenWithBearer);
                setData(response && response.results || null);
            
            return response;
        },
    });

    useEffect(() => {
        if (codigo) {
            mutate();
        }
    }, [codigo, mutate]);

    return {
        search,
        setSearch,
        isPending,
        data
    }
}
export default useVentasPorCodigo;