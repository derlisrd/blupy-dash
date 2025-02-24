import { useState, useEffect, useCallback, ReactNode } from "react";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { LoginResults } from "@/services/dto/auth/login";
import API from "@/services";
import AuthContext from "@/contexts/AuthContext";

// Proveedor del contexto
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setItemValue: setSessionUserData } = useSessionStorage<LoginResults | null>("userData", null);

  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<LoginResults | null>(null);
  const [loading, setLoading] = useState(true);

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

  // Función para verificar autenticación
  const checkIsAuth = useCallback(async () => {
    setLoading(true);
    const localStorage = window.sessionStorage.getItem("userData");
    if (localStorage && localStorage !== "null") {
      const local = JSON.parse(localStorage);
      const res = await API.auth.check(local.token);
      if (!res) {
        cerrarSesion();
        setLoading(false);
        return;
      }
      iniciarSesion(localStorage ? JSON.parse(localStorage) : null);
    }
    setLoading(false);
  }, [cerrarSesion, iniciarSesion]);

  // Verificación inicial en el montaje del componente
  useEffect(() => {
    checkIsAuth();
  }, [checkIsAuth]);

  const values = {
    isAuth,
    userData,
    iniciarSesion,
    cerrarSesion,
    loading,
    updateUserData,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
