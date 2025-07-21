import { useAuth } from '@/hooks/useAuth';
import API from '@/services';
import { SolicitudesResults } from '@/services/dto/solicitudes/solicitudes';
import { useQuery } from '@tanstack/react-query';
import { createContext, ReactNode } from 'react'

interface ContextSolicitudes {
    isLoading: boolean;
    error: Error | null;
    lista: SolicitudesResults[] | undefined
}

const Context = createContext<ContextSolicitudes | undefined>(undefined)

function ProviderSolicitudes({ children }: { children: ReactNode }) {

    const { userData } = useAuth()
    const { isLoading, error, data } = useQuery({
        queryKey: ["solicitudes"],
        queryFn: () => API.solicitudes.list(userData && userData.tokenWithBearer),
        select: (data) => data.results,
        enabled: !!(userData && userData.token),
        staleTime: 1000 * 60 * 5,
    });

    const values = {
        error, isLoading, lista: data
    }

    return <Context.Provider value={values}>
        {children}
    </Context.Provider>
}

export default ProviderSolicitudes;