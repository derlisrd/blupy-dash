import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store"
import { useCallback, useEffect, useState } from "react";

function useVentas() {

    const {dataUser} = userDataHook()

    const [loading,setLoading] = useState(true)
    const [lista,setLista] = useState([])

    const getLista = useCallback(async()=>{
        setLoading(true)
        const periodo = new Date();
        const desde = `${periodo.getFullYear()}-${String(periodo.getMonth() + 1).padStart(2, "0")}-01`;
        const hasta = new Date(periodo.getFullYear(), periodo.getMonth() + 1, 0).toISOString().split("T")[0];
        const [ventas, tickets] = await Promise.all([
            APICALLER.listaVentas({token: dataUser.token}),
            APICALLER.tickets({token: dataUser.token,desde,hasta})
        ])
        if(ventas.success){
            setLista(ventas.results)
        }
        console.log(tickets)
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