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
    },
    [setSessionUserData]
  );

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
      const localStorage = window.sessionStorage.getItem("userData");
      if (localStorage && localStorage !== "null") {
        const local = JSON.parse(localStorage);
        if (!local.token) {
          cerrarSesion();
          return null;
        }
        if (isTokenExpired(local.token)) {
          cerrarSesion();
          return null;
        }
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

  const isTokenExpired = (token: string): boolean => {
    if (!token) return true;

    try {
      // Dividir el token en sus partes (header, payload, signature)
      const parts = token.split(".");
      if (parts.length !== 3) return true;

      // Decodificar la parte del payload (la segunda parte)
      const payload = JSON.parse(atob(parts[1]));

      // Verificar si el token tiene un claim de expiración
      if (!payload.exp) return false; // Sin exp, asumimos que no expira

      // Convertir el tiempo actual a segundos (mismo formato que exp)
      const currentTime = Math.floor(Date.now() / 1000);

      // Comparar con el tiempo de expiración
      return payload.exp < currentTime;
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return true; // Si hay un error al decodificar, asumimos que está expirado
    }
  };

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
