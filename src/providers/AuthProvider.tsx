import { useState, useCallback, ReactNode } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { LoginResults } from "@/services/dto/auth/login";
import API from "@/services";
import AuthContext from "@/contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Proveedor del contexto
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setItemValue: setSessionUserData } = useSessionStorage<LoginResults | null>("userData", null);
  const useQueryCliente = useQueryClient();
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<LoginResults | null>(null);
  const updateUserData = (data: LoginResults) => {
    setUserData(data);
    setSessionUserData(data);
  };

  // Función para iniciar sesión
  const iniciarSesion = useCallback(
    (data: LoginResults | null, mantener?: boolean) => {
      if (data !== null) {
        setIsAuth(true);
        setUserData(data);
        if (mantener) setSessionUserData(data);
      }
    }, [setSessionUserData]);

  // Función para cerrar sesión
  const cerrarSesion = useCallback(() => {
    setIsAuth(false);
    setUserData(null);
    setSessionUserData(null);
    useQueryCliente.clear();
  }, [setSessionUserData, useQueryCliente]);

  const { isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: async () => {
      const localData = window.sessionStorage.getItem("userData");
      if (localData) {
        const localDataParsed = JSON.parse(localData) as LoginResults;
        if (localDataParsed.tokenWithBearer) {
          const res = await API.auth.check(localDataParsed.token)
          return res
        }
      }
    },
    throwOnError() {
      window.sessionStorage.removeItem("userData");
      useQueryCliente.clear();
      window.location.reload()
      return true
    },
    retry: 1,
    staleTime: 30 * 60000,
    refetchOnWindowFocus: true,
    refetchInterval: 30 * 60000,
  });



  const values = {
    isAuth,
    userData,
    iniciarSesion,
    cerrarSesion,
    loading: isLoading,
    updateUserData,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
