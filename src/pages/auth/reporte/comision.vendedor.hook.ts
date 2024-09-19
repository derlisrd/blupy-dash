import { useState } from "react";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";

function useComisionVendedorHook() {
    const {dataUser} = userDataHook()
    const [loading,setLoading] = useState(false)
    const [count,setCount] = useState(0)
    const [lista,setLista] = useState([])
    const [filtros,setFiltros] = useState({
        desde: '',
        hasta: '',
        tipo: ''
    })

    const filtrar = async()=>{

        const f = {...filtros}
        setLoading(true)
        const res = await APICALLER.reporteComision({desde: f.desde, tipo: f.tipo, hasta: f.hasta, token: dataUser.token })
        setLoading(false)
        if(res.success){
            setLista(res.results)
            setCount(res.data.count)
        }
    }
    
    
    return { filtros, setFiltros, filtrar,lista,loading,count}
}

export default useComisionVendedorHook;