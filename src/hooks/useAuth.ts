import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    const { isAuthenticated, login, logout, loading } = context;
    return {isAuthenticated, login, logout, loading} 
}

export default useAuth;