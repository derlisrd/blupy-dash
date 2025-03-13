import { BASE } from "../base";
import { ConsultaClienteResponse } from "../dto/farma/consultas";

export const farmaApiService = {
    consultarClientesFarma: async (q: string, token: string | null) => {
        try {
          const { data, status } = await BASE.get(`/consultas/cedula?cedula=${q}`, { headers: { Authorization: `Bearer ${token}` } });
    
          return ConsultaClienteResponse.fromJSON({
            success: data.success,
            status,
            message: "Consulta realizada con exito",
            results: data.results
          });
        } catch (error) {
          if (error instanceof Error) {
            return new ConsultaClienteResponse({ success: false, message: error.message, results: null, status: 500 });
          }
          return new ConsultaClienteResponse({ success: false, message: "Error desconocido", results: null, status: 500 });
        }
      },
    consultarClientesFarmaCodigo: async (q: string, token: string | null) => {
        try {
          const { data, status } = await BASE.get(`/consultas/codigo?codigo=${q}`, { headers: { Authorization: `Bearer ${token}` } });
    
          return ConsultaClienteResponse.fromJSON({
            success: data.success,
            status,
            message: "Consulta realizada con exito",
            results: data.results
          });
        } catch (error) {
          if (error instanceof Error) {
            return new ConsultaClienteResponse({ success: false, message: error.message, results: null, status: 500 });
          }
          return new ConsultaClienteResponse({ success: false, message: "Error desconocido", results: null, status: 500 });
        }
      }
}