import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function useClientePassword() {
  const { userData } = useAuth();
  
  const navigate = useNavigate();
  
  const [password, setPassword] = useState<string>("");
  
  
  const {isPending, mutate} = useMutation({
    mutationKey: ["password", "restablecer"],
    mutationFn: async ({  user_id }: { user_id: number }) => {
      const response = await API.clientes.restablecerContrasena(userData && userData.tokenWithBearer, user_id, password);
      if (response && response.success) {
        return response;
      }
      return null;
    },
    onSettled: async(data)=> {
      if(data && data.success){
        data.message
        const res = await swal({
          title: 'Correcto',
          icon: "success",
          text: data.message
        })
        if(res)
          navigate(-1)
        return
      }
      swal({
        title: 'Error',
        icon: "error",
        text: data && data.message ? data.message : 'Error desconocido'
      })

    },
  });

  const cambiar = (user_id: number) => mutate({ user_id });
  
  return {
    isPending,
    cambiar,
    password,
    setPassword,
  };
}
export default useClientePassword;
