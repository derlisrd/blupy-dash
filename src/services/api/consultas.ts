import { BASE } from "../base";

import { ContratosConsultaResponse } from "../dto/farma/contratos";

export const consultasApiService = {
  
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