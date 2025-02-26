import { useState, useCallback, ReactNode } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { LoginResults } from "@/services/dto/auth/login";
import API from "@/services";
import AuthContext from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";

// Proveedor del contexto
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setItemValue: setSessionUserData } = useSessionStorage<LoginResults | null>("userData", null);

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
    },
    [setSessionUserData]
  );

  // Función para cerrar sesión
  const cerrarSesion = useCallback(() => {
    setIsAuth(false);
    setUserData(null);
    setSessionUserData(null);
  }, [setSessionUserData]);

  const { isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: async () => {
      const localStorage = window.sessionStorage.getItem("userData");
      if (localStorage && localStorage !== "null") {
        const local = JSON.parse(localStorage);
        const res = await API.auth.check(local.token);
        if (!res) {
          cerrarSesion();
          return null;
        }
        iniciarSesion(local);
        return local;
      }
      return null;
    },
    staleTime: 5 * 60 * 1000, // Evita reconsultas innecesarias por 5 minutos
    refetchOnWindowFocus: true,
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
