import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import swal from "sweetalert";

function useSendWa() {
  const { userData } = useAuth();
  const [error, setError] = useState({ code: 0, message: "" });
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const { isPending, mutate, isSuccess,data } = useMutation({
    mutationFn: ({ number}: {number : string }) => {
      return API.noti.sendWa({ number, title, body, token: userData && userData.tokenWithBearer });
    },
    onSettled(data) {
      if(data && data.success) {
        setTitle("");
        setBody("");
        swal("Mensaje ha sido enviado", data.message, "success");
      }
    }
  });

  const sendWa = async (number: string) => mutate({number});
  

  return {
    isPending,
    sendWa,
    setTitle,
    setBody,
    isSuccess,
    data,
    title,
    body,
    error,setError
  };
}

export default useSendWa;
