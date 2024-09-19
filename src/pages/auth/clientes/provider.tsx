import { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import userDataHook from "../../../store/user_data_store";
import { APICALLER } from "../../../services/api";
import { formClienteType } from "../../../types/form.cliente";
import { filtrosClienteType } from "../../../types/filtros.clientes";



type modalType = { 
    sms: boolean
    email: boolean
    noti: boolean
    ficha: boolean
    filtros: boolean
    solicitud: boolean
    wa: boolean
    password: boolean
}

const initialModal : modalType = {sms:false,email:false,noti:false,ficha:false,solicitud:false,wa:false,filtros:false, password:false}
const initialForm : formClienteType = {vendedor_id:null,celular:'',asofarma:1,funcionario:0,cedula:'',created_at:'',email:'',id:0,id_micredito:'',name:'',solicitud_credito:0,notitoken:'',foto_ci_frente:'',user_id:0}
const initialFiltros : filtrosClienteType = {asofarma:'',funcionario:'',todos:false,desde:'',hasta:''}


type ContextProps = {
    filtrarClientes:()=>void,
    loading:boolean,
    filtros: filtrosClienteType,
    setFiltros: React.Dispatch<React.SetStateAction<filtrosClienteType>>,
    form: formClienteType
    setForm:React.Dispatch<React.SetStateAction<formClienteType>>,
    lista:formClienteType[],
    setLista: React.Dispatch<React.SetStateAction<formClienteType[]>>,
    modals: modalType
    setModals: React.Dispatch<React.SetStateAction<modalType>>
}

export const ClienteContext = createContext<ContextProps>({
    filtrarClientes:()=>{},
    loading:false,
    filtros: initialFiltros,
    setFiltros:()=>{},
    lista:[],
    form: initialForm,
    setForm:()=>{},
    setLista:()=>{},
    modals: initialModal,
    setModals: ()=>{}

});


interface Props{
    children: ReactNode
} 

function ClientesProvider({children}: Props) {

    const {dataUser} = userDataHook()
    const [loading,setLoading] = useState(true)
    const [modals,setModals] = useState<modalType>({ sms:false,email:false,noti:false,ficha:false,solicitud:false,wa:false,filtros:false, password:false})
    const [form,setForm] = useState<formClienteType>(initialForm)
    const [lista,setLista] = useState<formClienteType[]>([])
    const [filtros,setFiltros] = useState<filtrosClienteType>(initialFiltros)

    const filtrarClientes = async()=>{
        setLoading(true)
        const res = await APICALLER.clientesPorFiltros({token: dataUser.token,filtros: filtros})
        setLoading(false)
        if(res.success){
            setLista(res.results)
        }
    }

    const getClientes = useCallback(async()=>{
        setLoading(true)
        const res = await APICALLER.clientes({token: dataUser.token})
        if(res.success){
            setLista(res.results)
        }
        setLoading(false)
    },[dataUser.token])


    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getClientes()}
        return () => {isActive = false;ca.abort();};
      }, [getClientes]);

    const values: ContextProps = { lista,setLista,modals,setModals,loading,form,setForm,filtros,setFiltros,filtrarClientes}
    return ( <ClienteContext.Provider value={values}>{children}</ClienteContext.Provider> );
}




export default ClientesProvider;