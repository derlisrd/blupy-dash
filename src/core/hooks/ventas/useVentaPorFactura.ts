import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { VentasPorFacturaResults } from "@/services/dto/ventas/ventaPorFactura";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function useVentasPorFactura(){
    const [search, setSearch] = useState("");
    const { userData } = useAuth();
    const [data,setData] = useState<VentasPorFacturaResults | null>(null);

    const { isPending, mutate } = useMutation({
        mutationKey: ['ventaPorFactura'],
        mutationFn: async (q: string) => {
            
            const  response = await API.venta.ventaPorFactura(q, userData && userData.tokenWithBearer);
                setData(response && response.results || null);
            
            return response;
        },
    });

    const buscarVentaPorFactura = (search: string) => {
        mutate(search);
    }

    return {
        search,
        setSearch,
        buscarVentaPorFactura,
        isPending,
        data
    }
}
export default useVentasPorFactura;