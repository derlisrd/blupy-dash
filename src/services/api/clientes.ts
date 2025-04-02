import { BASE } from "../base"
import { ActualizarFotoCedulaResponse } from "../dto/clientes/actualizarFotoCedula"
import {  ClientesResponse } from "../dto/clientes/clientes"
import { isAxiosError } from "axios";

export const clientesApiService = {
    list: async(token: string | null)=>{
        try {
            const {data, status} = await BASE.get('/clientes',{headers: { Authorization: token}})
            return  ClientesResponse.fromJson({success: true, message: '', results: data.results  , status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new ClientesResponse({success: false, message: error.message, results: [], status: 500})
            }
            return new ClientesResponse({success: false, message: 'Error desconocido', results: [], status: 500})
        }
        
    },
    buscar: async(q: string, token: string | null)=>{
        try {
            const {data, status} = await BASE.get(`/clientes/buscar?q=${q}`,{headers: { Authorization: token}})
            return  ClientesResponse.fromJson({success: true, message: '', results: data.results  , status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new ClientesResponse({success: false, message: error.message, results: [], status: 500})
            }
            return new ClientesResponse({success: false, message: 'Error desconocido', results: [], status: 500})
        }
        
    },
    actualizarFotoCedula: async(token: string | null, id: string, formData: FormData)=>{
        try {
            const {data, status} = await BASE.post(`/clientes/actualizar-foto-cedula/${id}`,formData,{headers: { Authorization: token}})
            return  ActualizarFotoCedulaResponse.fromJson({success: true, message: data.message, results: data.results  , status: status})
        } catch (error) {
            if (error instanceof Error) {
                return new ActualizarFotoCedulaResponse({success: false, message: error.message, results: null, status: 500})
            }
            return new ActualizarFotoCedulaResponse({success: false, message: 'Error desconocido', results: null, status: 500})
        }
    },
    restablecerContrasena: async(token : string | null, user_id: number, password: string)=>{
        try {
            const {data} = await BASE.put(`/clientes/restablecer-contrasena`,{
                id: user_id,
                password
            },{headers: { Authorization: token}})
            return  {success: data.success as boolean, message: data.message as string}
        } catch (e) {
            if (isAxiosError(e)) {
                return  ({ success: false, message: e.response?.data.message as string})
            }
            return  ({success: false, message: 'Error desconocido'})
        }
    },
    cambiarEstado: async(token: string | null, id: number)=>{
        try {
            const {data} = await BASE.put(`/clientes/estado`,{id},{headers: { Authorization: token}})
            return  {success: data.success as boolean, message: data.message as string}
        } catch (e) {
            if (isAxiosError(e)) {
                return  ({ success: false, message: e.response?.data.message as string})
            }
            return  ({success: false, message: 'Error desconocido'})
        }
    }
}