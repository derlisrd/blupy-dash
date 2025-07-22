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
    buscar: (q: string) => Promise<void>;
}

const Context = createContext<ContextSolicitudes | undefined>(undefined)

export default function ProviderSolicitudes({ children }: { children: ReactNode }) {

    const { userData } = useAuth()
    const [selectedRow, setSelectedRow] = useState<SolicitudesResults | null>(null);

    const [lista, setLista] = useState<SolicitudesResults[]>([])

    const { isLoading, error, refetch, isFetching } = useQuery({
        queryKey: ["solicitudes"],
        queryFn: async () => {
            const res = await API.solicitudes.list(userData && userData.tokenWithBearer)
            if (res && res.success) {
                setLista(res.results)
            }
            return res.results
        },
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

    const buscarMutate = useMutation({
        mutationFn: (q: string) => API.solicitudes.buscar(q, userData && userData.tokenWithBearer),
        onError: (error) => {
            console.log(error)
        },
        onSuccess: (response) => {
            if (response.success && response.results) {
                setLista(pre => {
                    return [...pre, ...response.results]
                })
            }
        }
    });

    const buscar = async (q: string) => { await buscarMutate.mutateAsync(q); }

    const values = {
        error,
        isLoading: isLoading || actualizarMutate.isPending || isFetching || buscarMutate.isPending,
        lista,
        selectedRow,
        setSelectedRow,
        actualizarSolicitud,
        refetch,
        buscar
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