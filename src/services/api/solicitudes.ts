import { BASE } from "../base";
import { isAxiosError } from "axios";
import { AprobarSolicitudResponse } from "../dto/solicitudes/aprobar";
import { SolicitudesResponse } from "../dto/solicitudes/solicitudes";
import { ActualizarSolicitudResponse } from "../dto/solicitudes/actualizar.solicitud";

export const solicitudesApiService = {
  list: async (token: string | null) => {
    try {
      const { data, status } = await BASE.get("/solicitudes", { headers: { Authorization: token } });
      return SolicitudesResponse.fromJSON({ success: true, message: "", results: data.results, status: status });
    } catch (error) {
      if (error instanceof Error) {
        return new SolicitudesResponse({ success: false, message: error.message, results: [], status: 500 });
      }
      return new SolicitudesResponse({ success: false, message: "Error desconocido", results: [], status: 500 });
    }
  },
  buscar: async (q: string, token: string | null) => {
    try {
      const { data, status } = await BASE.get(`/solicitudes/buscar?q=${q}`, { headers: { Authorization: token } });
      return SolicitudesResponse.fromJSON({ success: true, message: "", results: data.results, status: status });
    } catch (error) {
      if (error instanceof Error) {
        return new SolicitudesResponse({ success: false, message: error.message, results: [], status: 500 });
      }
      return new SolicitudesResponse({ success: false, message: "Error desconocido", results: [], status: 500 });
    }
  },
  aprobarSolicitud: async (codigo: string, token: string | null) => {
    try {
      const { data, status } = await BASE.post(`/solicitudes/aprobar`, {codigo: codigo}, { headers: { Authorization: token } });
      return AprobarSolicitudResponse.fromJSON({ success: true, message: data.message, status: status, results: data.results });
    } catch (e) {
      if (isAxiosError(e)) {
        return new AprobarSolicitudResponse({ success: false, message: e.response?.data.message, status: e.response?.status || 500, results: null });
      }
      return new AprobarSolicitudResponse({ success: false, message: "Error desconocido", status: 500, results: null });
    }
  },
  actualizarSolicitud: async (q : string , token: string | null) => {
    try {
      const { data, status } = await BASE.put(`/solicitudes/actualizar-solicitud`, {codigo: q}, { headers: { Authorization: token } });
      return new ActualizarSolicitudResponse ({ success: true, message: data.message, results: data.results, status: status })
    } catch (e) {
      if (isAxiosError(e)) {
        return  new ActualizarSolicitudResponse({ success: false, message: e.response?.data.message, results: null, status: e.response?.status || 500 })
      }
      return  new ActualizarSolicitudResponse({ success: false, message: "Error desconocido", results: null, status: 500 })
    }
  }
};
