import { isAxiosError } from "axios";
import { BASE } from "../base";
import { AdjuntosResponse } from "../dto/adjuntos/adjuntos";

export const adjuntosApiService = {
    getAdjuntos: async (token: string | null, id: string) => {
        try {
            const {data,status} = await BASE.get(`clientes/adjuntos/${id}`, {
                headers: {
                    Authorization: token,
                },
            });
            return new AdjuntosResponse({
                success: data.success,
                status: status,
                message: '',
                results: data.results,
            });
        } catch (error) {
            if(isAxiosError(error)){
                return new AdjuntosResponse({
                    success: false,
                    status: error.response?.status ?? 500,
                    message: error.response?.data.message ?? "Error desconocido",
                    results: null,
                });
            }
            return new AdjuntosResponse({
                success: false,
                status: 500,
                message: "Error desconocido",
                results: null,
            });
        }
    },
    agregarAdjunto: async (token: string | null, id: string, form: FormData) => {
        try {
            const {data,status} = await BASE.post(`clientes/agregar-adjunto/${id}`, form, {
                headers: {
                    Authorization: token,
                },
            });
            return ({
                success: data.success,
                status: status,
                message: '',
                results: data.results,
            });
        } catch (error) {
            if(isAxiosError(error)){
                return ({
                    success: false,
                    status: error.response?.status ?? 500,
                    message: error.response?.data.message ?? "Error desconocido",
                    results: null,
                });
            }
            return ({
                success: false,
                status: 500,
                message: "Error desconocido",
                results: null,
            });
        }
        
    },
};