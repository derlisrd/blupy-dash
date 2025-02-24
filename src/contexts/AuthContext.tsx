import { LoginResults } from "@/services/dto/auth/login";
import { createContext } from "react";

// Define el tipo para el contexto
type AuthContextType = {
  isAuth: boolean;
  userData: LoginResults | null;
  iniciarSesion: (data: LoginResults | null, mantener?: boolean) => void;
  cerrarSesion: () => void;
  loading: boolean;
  updateUserData: (data: LoginResults) => void;
};

// Contexto inicializado como undefined para ser manejado correctamente por useContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
