import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import swal from 'sweetalert'

function useSendSMS() {
    const {userData} = useAuth()
    const [text, setText] = useState("");
    const [number, setNumber] = useState("");

    const {isPending,mutate} = useMutation({
        mutationKey: ['sendSMS'],
        mutationFn: async() => {
            return await API.notificaciones.enviarSMS({token: userData && userData.tokenWithBearer, number: number, text: text})
        },
        onSettled : async(data)=> {
            if(data && data.success) {
              setNumber("");
              setText("");
              await swal({
                text: 'Mensaje enviado',
                icon: 'success'
              });
            }
          }
    })
    

    const sendSms = async() => {
        if(!number || !text) return
        mutate()
    }
    return {isPending, sendSms, setNumber, number, setText, text}
}
export default useSendSMS;