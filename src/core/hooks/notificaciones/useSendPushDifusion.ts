import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import swal from "sweetalert";

function useSendPushDifusion() {
  const { userData } = useAuth();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const { isPending, mutate, isSuccess,data } = useMutation({
    mutationFn: () => {
      return API.noti.sendDifusion({ title, body, token: userData && userData.tokenWithBearer });
    },
    onSettled(data) {
      if(data && data.success) {
        setTitle("");
        setBody("");
        swal("Notificación enviada", data.message, "success");
      }
    }
  });

  const sendPush = async () => {
    if(!title || !body) return swal("Error", "Todos los campos son requeridos", "error");
    
    mutate();
  }
  

  return {
    isPending,
    sendPush,
    setTitle,
    setBody,
    isSuccess,
    data,
    title,
    body,
  };
}

export default useSendPushDifusion;
