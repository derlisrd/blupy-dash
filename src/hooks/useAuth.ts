import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    const { isAuth, userData, iniciarSesion, cerrarSesion, loading, updateUserData } = context;
    return { isAuth, userData, iniciarSesion, cerrarSesion, loading, updateUserData };
  };