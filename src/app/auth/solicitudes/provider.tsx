import { useAuth } from '@/hooks/useAuth';
import API from '@/services';
import { SolicitudesResults } from '@/services/dto/solicitudes/solicitudes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useState } from 'react'

interface ContextSolicitudes {
    isLoading: boolean;
    error: Error | null;
    lista: SolicitudesResults[] | undefined;
    selectedRow: SolicitudesResults | null;
    setSelectedRow: React.Dispatch<React.SetStateAction<SolicitudesResults | null>>;
    actualizarSolicitud: () => Promise<void>;
}

const Context = createContext<ContextSolicitudes | undefined>(undefined)

export default function ProviderSolicitudes({ children }: { children: ReactNode }) {

    const { userData } = useAuth()

    const [selectedRow, setSelectedRow] = useState<SolicitudesResults | null>(null);


    const { isLoading, error, data } = useQuery({
        queryKey: ["solicitudes"],
        queryFn: () => API.solicitudes.list(userData && userData.tokenWithBearer),
        select: (data) => data.results,
        enabled: !!(userData && userData.token),
        staleTime: 1000 * 60 * 5,
    });

    const actualizarMutate = useMutation({
        mutationKey: ['updateSolicitud'],
        mutationFn: (data: SolicitudesResults) => API.solicitudes.actualizarSolicitud(data.codigo, userData && userData.tokenWithBearer),
        onSuccess: (data) => {
            setSelectedRow(null);
            console.log(data);
        }
    })
    const actualizarSolicitud = async () => {
        if (selectedRow) {
            actualizarMutate.mutateAsync(selectedRow)
        }
    }

    const values = {
        error,
        isLoading: isLoading || actualizarMutate.isPending,
        lista: data,
        selectedRow,
        setSelectedRow,
        actualizarSolicitud,
    };



    return <Context.Provider value={values}>
        {children}
    </Context.Provider>
}

export const useProviderSolicitudes = () => {
    const context = useContext(Context)

    if (!context) {
        throw new Error('useProviderSolicitudes must be used within a Provider')
    }
    return context
}