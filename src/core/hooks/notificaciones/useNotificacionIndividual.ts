import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { FichaResults, UserDevice } from "@/services/dto/notificaciones/ficha";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

function useNotificaIndividual() {
    const {userData} = useAuth()
    const [search, setSearch] = useState("");
    const [modals,setModals] = useState({wa:false,sms:false,push: false});
    const [cliente,setCliente] = useState<FichaResults | null>(null);

    const [selectedDevice, setSelectedDevice] = useState<UserDevice | null>(null);

    //const handleSelectedDevice = (device: UserDevice) => setSelectedDevice(device);
    // Optimizacion: Usar useCallback para funciones que se pasan como props o dependencias de efectos
    const handleSetSelectedDevice = useCallback((device: UserDevice | null) => {setSelectedDevice(device);}, []);

    const openModal = useCallback((modalType: keyof typeof modals) => {
        setModals(prev => ({ ...prev, [modalType]: true }));
    }, []);

    const closeModal = useCallback((modalType: keyof typeof modals) => {
        setModals(prev => ({ ...prev, [modalType]: false }));
        setSelectedDevice(null); // Deseleccionar dispositivo al cerrar cualquier modal
    }, []);

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

    return {
        search,
        setSearch,
        buscarFicha,
        isPending,
        cliente,
        selectedDevice,
        setSelectedDevice: handleSetSelectedDevice, // Renombrado para claridad, o mantener el original
        handleSelectedDevice: handleSetSelectedDevice, // Mantener original si se prefiere
        modals,
        openModal,
        closeModal,
        // setModals // Exponer setModals directamente es menos común, mejor usar open/close
    }
}

export default useNotificaIndividual

