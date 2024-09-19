import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import { clienteData } from "../../../models/clientes_data_model";

type datosTotalesType = {
    "registrosTotales": number
    "registrosHoy": number
    "registrosSemana": number
    "registrosMes": number
    "funcionarios": number
    "asociaciones": number
    "externos": number
    "solicitudesPendientes": number
    "pendientesHoy": number
    "pendientesSemana": number
    "pendientesMes": number
    "solicitudesVigentes": number
    "vigentesHoy": number
    "vigentesSemana": number
    "vigentesMes": number
    "solicitudesRechazadas": number
    "rechazadosHoy": number
    "rechazadosSemana": number
    "rechazadosMes": number
    "solicitudesTotales": number
    "solicitudesHoy": number
    "solicitudesSemana": number
    "solicitudesMes": number
}

interface ContextProps{
    datosTotales: datosTotalesType
    lista: clienteData[]
    loading: boolean
}



export const HomeContext = createContext<ContextProps>({
    datosTotales:{
        "registrosTotales": 4232,
        "registrosHoy": 0,
        "registrosSemana": 45,
        "registrosMes": 160,
        "funcionarios": 2864,
        "asociaciones": 825,
        "externos": 543,
        "solicitudesPendientes": 119,
        "pendientesHoy": 0,
        "pendientesSemana": 9,
        "pendientesMes": 40,
        "solicitudesVigentes": 67,
        "vigentesHoy": 0,
        "vigentesSemana": 9,
        "vigentesMes": 40,
        "solicitudesRechazadas": 556,
        "rechazadosHoy": 1,
        "rechazadosSemana": 31,
        "rechazadosMes": 86,
        "solicitudesTotales": 746,
        "solicitudesHoy": 1,
        "solicitudesSemana": 40,
        "solicitudesMes": 134
    },
    lista: [],
    loading: true
})

interface Props {
    children: ReactNode
}
function HomeProvider({children}:Props) {
    const {dataUser} = userDataHook()
    const datosIniciales = {
        "registrosTotales": 0,
        "registrosHoy": 0,
        "registrosSemana": 0,
        "registrosMes": 0,
        "funcionarios": 0,
        "asociaciones": 0,
        "externos": 0,
        "solicitudesPendientes": 0,
        "pendientesHoy": 0,
        "pendientesSemana": 0,
        "pendientesMes": 0,
        "solicitudesVigentes": 0,
        "vigentesHoy": 0,
        "vigentesSemana": 0,
        "vigentesMes": 0,
        "solicitudesRechazadas": 0,
        "rechazadosHoy": 0,
        "rechazadosSemana": 0,
        "rechazadosMes": 0,
        "solicitudesTotales": 0,
        "solicitudesHoy": 0,
        "solicitudesSemana": 0,
        "solicitudesMes": 0
    }
    const [lista,setLista] = useState<[]>([])
    const [datosTotales,setDatosTotales] = useState(datosIniciales)
    const [loading,setLoading] = useState(true)

    const getLista = useCallback(async()=>{
        setLoading(true)
        const res = await APICALLER.totales(dataUser.token)
        if(res.success){
            setLista([])
            setDatosTotales(res.results)
        }
        setLoading(false)
    },[dataUser.token])
    
    useEffect(() => {
        const ca = new AbortController(); let isActive = true;
        if (isActive) {getLista()}
        return () => {isActive = false;ca.abort();};
      }, [getLista]);
    const values = {lista,loading,datosTotales}
    return (<HomeContext.Provider value={values}>{children}</HomeContext.Provider>);
}

export const useHomeProvider = ()=>{
    const {lista,loading,datosTotales} = useContext(HomeContext)
    return {lista,loading,datosTotales}
}

export default HomeProvider;