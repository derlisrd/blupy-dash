import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import swal from "sweetalert";

function useSendPushIndividual() {
  const { userData } = useAuth();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: ({ id }: { id: number }) => {
      return API.noti.sendIndividual({ id, title, body, token: userData && userData.tokenWithBearer });
    },
    onSettled(data) {
      if(data && data.success) {
        setTitle("");
        setBody("");
        swal("Notificación enviada", data.message, "success");
      }
    }
  });

  const sendPush = async (id: number) => mutate({id});
  

  return {
    isPending,
    sendPush,
    setTitle,
    setBody,
    isSuccess
  };
}

export default useSendPushIndividual;
