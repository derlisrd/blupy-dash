import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { AdminResponse, AdminResults } from "@/services/dto/auth/admin";
import { PermisosResponse, PermisosResults } from "@/services/dto/auth/permisos";
import { useQueries } from "@tanstack/react-query";
import { createContext, useContext, ReactNode } from "react";

interface UserContextI {
    users: AdminResults[];
    permisos: PermisosResults[];
    isLoading: boolean;
}

const UsersContext = createContext<UserContextI | null>(null);


function UsersProvider({ children }: { children: ReactNode }) {

    const { userData } = useAuth()

    const results = useQueries({
        queries: [
            {
                queryKey: ["users"],
                queryFn: () => API.permisos.usersAdministradores(userData && userData?.token),
                select: (data: AdminResponse) => {
                    if (data && data.success) {
                        return data.results;
                    }
                    return [];
                },
                staleTime: 1000 * 60 * 5,
                refetchOnWindowFocus: false,
            },
            {
                queryKey: ["permisos"],
                queryFn: () => API.permisos.lista(userData && userData?.token),
                select: (data: PermisosResponse) => {
                    if (data && data.success) {
                        return data.results;
                    }
                    return [];
                },
                staleTime: 1000 * 60 * 5,
                refetchOnWindowFocus: false,
            },
        ],
    });




    const values = {
        users: results[0].data || [],
        permisos: results[1].data || [],
        isLoading: results[0].isLoading || results[1].isLoading || false,
    };

    return <UsersContext.Provider value={values} >{children}</UsersContext.Provider>;
}

export const useUsersContext = () => {
    const context = useContext(UsersContext);
    if (!context) throw new Error("useUsersContext must be used within a UsersProvider");
    return context;
}
export default UsersProvider;