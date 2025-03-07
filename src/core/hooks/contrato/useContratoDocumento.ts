import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { ContratosConsultaResults } from "@/services/dto/farma/contratos";
import { AprobarSolicitudResponse } from "@/services/dto/solicitudes/aprobar";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function useContratoDocumento() {
    const { userData } = useAuth();
    const [dataBuscar, setDataBuscar] = useState<ContratosConsultaResults | null>(null);
    const [dataAprobar, setDataAprobar] = useState< AprobarSolicitudResponse | null>(null);

    const { isPending, mutate } = useMutation({
        mutationKey: ["contratoPorDocumento","aprobar"],
        mutationFn: async ({ query, type }: { query: string; type: "buscar" | "aprobar" }) => {
            let response;
            if (type === "buscar") {
               response = await API.consultas.contratoPorDocumento(query, userData && userData.token);
                setDataBuscar(response && response.results || null);
            } 
            if(type === "aprobar") {
                response = await API.solicitudes.aprobarSolicitud(query, userData && userData.tokenWithBearer);
                setDataAprobar(response && response);
            }
            return response;
        },
    });

    const buscar = (q: string) => mutate({ query: q, type: "buscar" });
    const aprobar = (codigo: string) => mutate({ query: codigo, type: "aprobar" });

    return { isPending, dataBuscar, dataAprobar, buscar, aprobar };
}

export default useContratoDocumento;
