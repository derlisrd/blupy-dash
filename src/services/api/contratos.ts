import { isAxiosError } from "axios";
import { BASE } from "../base";
import { RecibirContratosResponse } from "../dto/solicitudes/contratos";

export const contratosApiService = {
  impresosEnFarma: async (token: string | null) => {
    try {
      const { data } = await BASE.get(`/contrato/impresos-en-farma`, { headers: { Authorization: token } });
      return data;
    } catch (e) {
      if (isAxiosError(e)) {
        throw Error(e.response?.data.message);
      }
      throw Error("Error desconocido");
    }
  },
  recibir: async (codigo: number, token: string | null) => {
    try {
      const { data, status } = await BASE.post(`/contrato/recibir`, { codigo: codigo }, { headers: { Authorization: token } });
      return RecibirContratosResponse.fromJSON({
        success: true,
        message: data.message,
        results: data.results,
        status: status
      });
    } catch (e) {
      if (isAxiosError(e)) {
        return RecibirContratosResponse.fromJSON({ success: false, message: e.response?.data.message, status: e.response?.status || 500, results: null });
      }
      return RecibirContratosResponse.fromJSON({ success: false, message: "Error desconocido", status: 500, results: null });
    }
  }
};
