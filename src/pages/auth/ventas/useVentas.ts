import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store"
import { useCallback, useEffect, useState } from "react";

function useVentas() {

    const {dataUser} = userDataHook()

    const [loading,setLoading] = useState(true)
    const [lista,setLista] = useState([])

    const getLista = useCallback(async()=>{
        setLoading(true)
        const res = await APICALLER.listaVentas({token: dataUser.token})
        if(res.success){
            setLista(res.results)
        }
        setLoading(false)
    },[dataUser.token])


    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista()}
        return () => {isActive = false;ca.abort();};
      }, [getLista]);

    return {
        loading,lista
    }
}

export default useVentas;