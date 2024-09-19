import { useState } from "react";
import { APICALLER } from "../../../services/api";
import { typeIngresarVendedor } from "../../../types/vendedor";
import userDataHook from "../../../store/user_data_store";
import swal from "sweetalert";

function useVendedorHook() {
    const {dataUser} = userDataHook()
    const initial = {cedula:'',nombre:'',punto:''}
    const [form,setForm] = useState<typeIngresarVendedor>(initial)
 
    const ingresar = async()=>{
        const res = await APICALLER.ingresarVendedor({token: dataUser.token, body: form })

        if(res.success){
            setForm(initial)
            swal({text:'Ingresado!'})
            return
        }

        swal({text: res.message, title:'Error'})
        
    }
    
    return {form,setForm,ingresar}
}

export default useVendedorHook;