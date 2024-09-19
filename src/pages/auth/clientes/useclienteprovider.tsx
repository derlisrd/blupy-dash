import { ClienteContext } from "./provider"
import {useContext} from 'react'

export const useClienteProvider = ()=>{
    const { lista,setLista,modals,setModals,loading,form,setForm,filtros,setFiltros,filtrarClientes} = useContext(ClienteContext)
    return { lista,setLista,modals,setModals,loading,form,setForm,filtros,setFiltros,filtrarClientes}
}