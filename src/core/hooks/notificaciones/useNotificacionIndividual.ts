import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { FichaResults, UserDevice } from "@/services/dto/notificaciones/ficha";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function useNotificaIndividual() {
    const {userData} = useAuth()
    const [search, setSearch] = useState("");

    const [cliente,setCliente] = useState<FichaResults | null>(null);

    const [selectedDevice, setSelectedDevice] = useState<UserDevice | null>(null);

    const handleSelectedDevice = (device: UserDevice) => setSelectedDevice(device);
    

    const { isPending, mutate } = useMutation({
        mutationKey: ['buscarFicha'],
        mutationFn: async ({ query, type }: { query: string; type: "buscar" | "aprobar" }) => {
            let response;
            if (type === "buscar") {
               response = await API.notificaciones.ficha(query, userData && userData.tokenWithBearer);
                
            }
            if(response && response.success) {
                setCliente(response.results);
            }
        },
    });

    const buscarFicha = (q: string) => mutate({ query: q, type: "buscar" });

    return {setSearch,search, buscarFicha, isPending, cliente, selectedDevice, setSelectedDevice, handleSelectedDevice};
}

export default useNotificaIndividual

