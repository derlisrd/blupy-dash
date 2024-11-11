import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import { useEffect, useState } from "react";

type datosTypeString = {
    farma: string;
    alianzas: string;
    digital: string;
    total: string;
}
type datosTypeNumber = {
    farma: number;
    alianzas: number;
    digital: number;
    total: number;
}

export type datosMainType = {
    ventas : datosTypeNumber,
    cantidadTickets: datosTypeNumber,
    registros: datosTypeNumber,
    vigentes: datosTypeNumber,
    rechazados: datosTypeNumber,
    porcentajeUso: datosTypeString
}


function useInformes() {
    const { dataUser } = userDataHook();
    const [periodo,setPeriodo] = useState<Date>(new Date())
    const [loading,setLoading] = useState(true)
    const [datos,setDatos] = useState<datosMainType>({
        ventas: {
            farma: 0,
            alianzas: 0,
            digital:0,
            total: 0
        },
        cantidadTickets: {
            farma: 0,
            alianzas: 0,
            digital: 0,
            total: 0
        },
        registros: {
            farma: 0,
            alianzas: 0,
            digital: 0,
            total: 0 
        },
        rechazados: {
            farma: 0,
            alianzas: 0,
            digital: 0,
            total: 0 
        },
        vigentes: {
            farma: 0,
            alianzas: 0,
            digital: 0,
            total: 0 
        },
        porcentajeUso: {
            farma: '',
            alianzas: '',
            digital: '',
            total: ''
        }
    })

    useEffect(()=>{
        (async()=>{
            const [registros, porcentajes, tickets,ventas] = await Promise.all([
                APICALLER.totales(dataUser.token),
                APICALLER.porcentajeUso(dataUser.token),
                APICALLER.tickets({token: dataUser.token}),
                APICALLER.ventasTotales(dataUser.token),
            ])
            setLoading(false)
           setDatos({
            ventas: {
                farma: ventas.results.importeTotalMesFuncionario,
                alianzas: ventas.results.importeTotalMesAso,
                digital:ventas.results.importeTotalMesDigital,
                total: ventas.results.importeTotalMes
            },
            cantidadTickets: {
                farma: tickets.results.farma,
                alianzas: tickets.results.aso,
                digital: tickets.results.digital,
                total:  tickets.results.farma + tickets.results.aso + tickets.results.digital
            },
            registros: {
                farma: registros.results.registrosMesFuncionarios,
                alianzas: registros.results.registrosMesAso,
                digital: registros.results.registrosMesDigital,
                total: registros.results.registrosMes 
            },
            rechazados: {
                farma: 0,
                alianzas: 0,
                digital: registros.results.rechazadosMes,
                total: registros.results.rechazadosMes
            },
            vigentes: {
                farma: registros.results.registrosMesFuncionarios,
                alianzas: registros.results.registrosMesAso,
                digital: registros.results.vigentesMes,
                total: registros.results.registrosMesFuncionarios + registros.results.registrosMesAso + registros.results.vigentesMes
            },
            porcentajeUso: {
                farma: porcentajes.results.tasaUsoFuncionario,
                alianzas: porcentajes.results.tasaUsoAsoc,
                digital: porcentajes.results.tasaUsoDigital,
                total: porcentajes.results.tasaUsoTotal
            }
           })
        })
        ()
    },[dataUser.token])

    return {datos, loading, periodo, setPeriodo}
}

export default useInformes;