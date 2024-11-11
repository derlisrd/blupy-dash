import axios from "axios";
import { EnviarSmsModel } from "../models/enviar_sms_model";
import { enviarEmailModel, EnviarNotiModel, enviarWaModel } from "../models/enviar_noti_model";
import { env } from "../config/env";
import { typefiltrosClientes } from "../models/clientes_data_model";
import { typeIngresarVendedor } from "../models/solicitudes_data_model";
import { LoginResponse } from "../models/user_data_model";
import { ConsultaClienteResponse } from "./dto/consultacliente";



const BLUPY = axios.create({baseURL: env.API_BLUPY, headers:{Accept: 'application/json', 'Content-Type': 'application/json', 'x-api-key':env.X_API_KEY}})


export const APICALLER = {

    login: async(form: {email:string,password:string}) : Promise<LoginResponse> =>{
      try {
        const {data} = await BLUPY.post('/login',form)
        return {success:data.success,results: data.results, message: '' };
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    consultaCliente:async(form: {cedula:string,token:string}) : Promise<ConsultaClienteResponse> =>{
      try {
        const {data} = await BLUPY.get(`/consultas/cliente?cedula=${form.cedula}`,{headers:{ 'Authorization':`Bearer ${form.token}`}})
        return ConsultaClienteResponse.fromJSON({
          success: data.success ,
          message: '',
          results: (data.results)
        })
      } catch (error) {
        return ConsultaClienteResponse.fromJSON({
          success: false,
          message: 'Error de servidor',
          results: null 
        })
      }
    },
    reiniciarContrasena: async({password,id,token}:{password:string, id: number, token:string})=>{
      try {
        const { data,status } = await BLUPY.post('/restablecer-contrasena',{password,id},{headers:{Authorization:`Bearer ${token}`}})
        return { success: data.success, message: data.message, status };
      }catch (e) {
        if(axios.isAxiosError(e)){
          return {success:false,message: e.response?.data.message, status: e.response?.status}
        }
        return {success:false,status:500, message:'Error de servidor intente más tarde o contacte con Atención al cliente.'}
      }
    },
    enviarNotificaciones: async({title,text,token}: {title:string,text:string,token:string})=>{
      try {
        const { data,status } = await BLUPY.post('/enviar-notificaciones-masivas',{title,text},{headers:{Authorization:`Bearer ${token}`}})
        return { success: data.success, message: data.message, status };
      }catch (e) {
        if(axios.isAxiosError(e)){
          return {success:false,message: e.response?.data.message, status: e.response?.status}
        }
        return {success:false,status:500, message:'Error de servidor intente más tarde o contacte con Atención al cliente.'}
      }
    },
    reporteComision: async({desde,hasta,tipo='',token}: {desde:string,hasta:string, tipo: string | number, token:string})=>{
      try {
        const { data,status } = await BLUPY.post('/reporte-comision',{desde,hasta,tipo},{headers:{Authorization:`Bearer ${token}`}})
        return { success: data.success, results: data.results, status, data };
      }catch (e) {
        if(axios.isAxiosError(e)){
          return {success:false,message: e.response?.data.message, status: e.response?.status}
        }
        return {success:false,status:500, message:'Error de servidor intente más tarde o contacte con Atención al cliente.'}
      }
    },
    check: async(token:string | null)=>{
      try {
        const {data} = await BLUPY.get('/check',{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:data.success,message:  data.message };
      } catch (error) {
        console.log(error)
        return {success:false,message:'Error en el servidor'}
      }
    },
    buscarCliente: async({token,buscar}:{token:string,buscar:string})=>{
      try {
        const res = await BLUPY.get(`/cliente?buscar=${buscar}`,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:res.data.success,results:res.data.results};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    clientes: async({token,desde='',hasta=''}:{token:string,desde?:string,hasta?:string})=>{
      try {
        const {data} = await BLUPY.get(`/clientes?desde=${desde}&hasta=${hasta}`,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:data.success,results:data.results, total: data.total};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    clientesPorFiltros: async({token,filtros}:{token:string,filtros: typefiltrosClientes})=>{
      try {
        const {data} = await BLUPY.post(`/clientes-filtros`,filtros, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:data.success,results:data.results, total:data.total};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    enviarSms: async({token,body}:{token:string, body: EnviarSmsModel})=>{
      try {
        const res = await BLUPY.post('/enviar-sms',body,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:res.data.success,message:  (res.data.message) };
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    enviarNoti: async({token,body}:{token:string, body: EnviarNotiModel})=>{
      try {
        const res = await BLUPY.post('/enviar-notificacion',body,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:res.data.success,message:  (res.data.message) };
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    enviarEmail: async({token,body}:{token:string, body: enviarEmailModel})=>{
      try {
        const res = await BLUPY.post('/enviar-email',body,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:res.data.success,message:  (res.data.message) };
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    enviarWa: async({token,body}:{token:string, body: enviarWaModel})=>{
      try {
        const res = await BLUPY.post('/enviar-wa',body,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:res.data.success,message:  (res.data.message) };
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    solicitudes: async({token}:{token:string})=>{
      try {
        const {data} = await BLUPY.get(`/solicitudes`,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:data.success,results:data.results, pages: data.pages, total: data.total, current: data.current};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    buscarSolicitud: async({token,buscar}:{token:string,buscar:string})=>{
      try {
        const res = await BLUPY.get(`/solicitud?buscar=${buscar}`,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:res.data.success,results:res.data.results};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    ultimosRegistros: async({token}:{token:string})=>{
      try {
        const res = await BLUPY.get(`/ultimos-registros`,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:res.data.success,results:res.data.results};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    fichaCliente:async({token,id}:{token:string,id:string|number|null})=>{
      try {
        const res = await BLUPY.get(`/cliente/ficha/${id}`,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:res.data.success,results:res.data.results};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    solicitudPorCliente:async({token,cliente_id}:{token:string,cliente_id:string|number|null})=>{
      try {
        const res = await BLUPY.get(`/solicitud-cliente/${cliente_id}`,{headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:res.data.success,results:res.data.results};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    solicitudesPorFiltros: async({token,desde,hasta,estado_id}:{token:string,desde: string, hasta: string, estado_id: string})=>{
      try {
        const {data} = await BLUPY.get(`/solicitudes-filtros?desde=${desde}&hasta=${hasta}&estado_id=${estado_id}`, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:data.success,results:data.results, pages: data.pages, total: data.total, current: data.current};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    clientesTotales:async(token:string)=>{
      try {
        const {data} = await BLUPY.get(`/clientes/totales`, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:data.success,results:data.results, pages: data.pages, total: data.total, current: data.current};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    actualizarSolicitudes:async(token:string)=>{
      try {
        const {data} = await BLUPY.put(`/actualizar-solicitudes`,{}, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:data.success};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    actualizarSolicitud:async(token:string, codigo:string)=>{
      try {
        const {data} = await BLUPY.get(`/actualizar-solicitud?codigo=${codigo}`, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:data.success,message:data.message,results: data.results};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    totales: async(token:string)=>{
      try {
        const {data} = await BLUPY.get(`/totales`, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:data.success,results: data.results};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    porcentajeUso: async(token:string)=>{
      try {
        const {data} = await BLUPY.get(`/porcentaje-uso`, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success:data.success,results: data.results};
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    ingresarVendedor: async({token,body}:{token:string,body: typeIngresarVendedor})=>{
      try {
        const {data} = await BLUPY.post(`/ingresar-vendedor`,body, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success: data.success, message: data.message}
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    ventasTotales: async(token:string)=>{
      try {
        const {data} = await BLUPY.get(`/ventas-totales`, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success: data.success, results: data.results,message:''}
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    listaVentas: async({token}:{token:string})=>{
      try {
        const {data} = await BLUPY.get(`/lista-ventas`, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success: data.success, results: data.results,message:''}
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    },
    tickets: async({token}:{token:string})=>{
      try {
        const {data} = await BLUPY.get(`/ventas-tickets`, {headers:{ 'Authorization':`Bearer ${token}`}})
        return {success: data.success, results: data.results,message:''}
      } catch (error) {
        return {success:false,message:'Error en el servidor'}
      }
    }
}