import { useState, useCallback, ReactNode } from "react";
import { LoginResults } from "@/services/dto/auth/login";
import API from "@/services";
import AuthContext from "@/contexts/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Constantes
const AUTH_STORAGE_KEY = "userData";


const storage = {
  get: (key: string): LoginResults | null => {
    try {
      const data = window.sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: LoginResults): void => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error guardando en sessionStorage:", error);
    }
  },
  remove: (key: string): void => {
    window.sessionStorage.removeItem(key);
  }
};


const AuthProvider = ({ children }: { children: ReactNode }) => {

  const useQueryCliente = useQueryClient();
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<LoginResults | null>(null);
  const updateUserData = (data: LoginResults) => {
    setUserData(data);
    storage.set(AUTH_STORAGE_KEY, data);
  };

  // Función para iniciar sesión
  const iniciarSesion = useCallback(
    (data: LoginResults | null, mantener?: boolean) => {
      if (data !== null) {
        setIsAuth(true);
        setUserData(data);
        if (mantener) window.sessionStorage.setItem("userData", JSON.stringify(data));
      }
    }, []);


  const cerrarSesion = () => {
    setIsAuth(false);
    setUserData(null);
    storage.remove(AUTH_STORAGE_KEY);
    useQueryCliente.clear();
  }

  const { isLoading } = useQuery({
    queryKey: ["checkAuth"],
    queryFn: async () => {
      const localData = window.sessionStorage.getItem("userData");
      if (!localData) {
        return null
      }
      const localDataParsed = JSON.parse(localData) as LoginResults;
      if (!localDataParsed.tokenWithBearer) {
        return null
      }
      const res = await API.auth.check(localDataParsed.token)
      if (!res) {
        cerrarSesion()
        return null
      }
      iniciarSesion(localDataParsed, true)
    },
    throwOnError() {
      setIsAuth(false);
      setUserData(null);
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
