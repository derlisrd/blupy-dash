import { BASE } from "../base";
import { ConsultaClienteResponse } from "../dto/farma/consultas";
import { ContratosConsultaResponse } from "../dto/farma/contratos";

export const consultasApiService = {
  consultarClientesFarma: async (q: string, token: string | null) => {
    try {
      const { data, status } = await BASE.get(`/consultas/cliente?cedula=${q}`, { headers: { Authorization: `Bearer ${token}` } });

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
  contratoPorDocumento: async(q: string, token: string | null) => {
    try {
      const { data, status } = await BASE.get(`/contrato/cedula?documento=${q}`, { headers: { Authorization: `Bearer ${token}` } });
    
      return ContratosConsultaResponse.fromJSON({
        success: data.success,
        status,
        message: "Consulta realizada con exito",
        results: data.results
      });
    }
    catch (error) {
      if (error instanceof Error) {
        return new ContratosConsultaResponse({ success: false, message: error.message, results: null, status: 500 });
      }
      return new ContratosConsultaResponse({ success: false, message: "Error desconocido", results: null, status: 500 });
    }
  },
  contratoPorCodigo: async(q: string, token: string | null) => {
    try {
      const { data, status } = await BASE.get(`/contrato/codigo?codigo=${q}`, { headers: { Authorization: `Bearer ${token}` } });
    
      return ContratosConsultaResponse.fromJSON({
        success: data.success,
        status,
        message: "Consulta realizada con exito",
        results: data.results
      });
    }
    catch (error) {
      if (error instanceof Error) {
        return new ContratosConsultaResponse({ success: false, message: error.message, results: null, status: 500 });
      }
      return new ContratosConsultaResponse({ success: false, message: "Error desconocido", results: null, status: 500 });
    }
  }
}