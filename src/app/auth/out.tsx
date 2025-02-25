import Loading from "@/components/ui/loading";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const { cerrarSesion } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = () => {
      navigate("/");
      cerrarSesion();
    };
    signOut();
  }, [cerrarSesion, navigate]);

  return <Loading />;
}

export default LogOut;
