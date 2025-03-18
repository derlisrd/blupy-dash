import { BASE } from "../base";
import { VentasPorFacturaResponse } from "../dto/ventas/ventaPorFactura";
import { VentasAcumuladasResponse } from "../dto/ventas/ventasAcumuladas";
import { VentasAcumuladasMesResponse } from "../dto/ventas/ventasAcumuladosMes";

export const ventasApiService = {
  ventaPorFactura: async (q: string, token: string | null) => {
    try {
      const { data, status } = await BASE.get(`/ventas/por-factura?factura=${q}`, { headers: { Authorization: `${token}` } });

      return VentasPorFacturaResponse.fromJSON({ success: true, message: "", results: data.results, status });

    } catch (error) {
      if (error instanceof Error) {
        return new VentasPorFacturaResponse({ success: false, message: error.message, results: null, status: 500 });
      }
      return new VentasPorFacturaResponse({ success: false, message: "Error desconocido", results: null, status: 500 });
    }
  },
  acumuladas: async (token: string | null) => {
    try {
      const { data, status } = await BASE.get("/ventas/acumulados", { headers: { Authorization: `${token}` } });
      return new VentasAcumuladasResponse({ success: true, message: "", results: data.results, status });
    }
    catch (error) {
      if (error instanceof Error) {
        return new VentasAcumuladasResponse({ success: false, message: error.message, results: null, status: 500 });
      }
      return new VentasAcumuladasResponse({ success: false, message: "Error desconocido", results: null, status: 500 });
    }
  },
  acumuladasMes: async (periodo : string,token: string | null) => {
    try {
      const { data, status } = await BASE.get(`/ventas/acumulados-mes?periodo=${periodo}`, { headers: { Authorization: `${token}` } });
      return new VentasAcumuladasMesResponse({ success: true, message: "", results: data.results, status });
    }
    catch (error) {
      if (error instanceof Error) {
        return new VentasAcumuladasMesResponse({ success: false, message: error.message, results: null, status: 500 });
      }
      return new VentasAcumuladasMesResponse({ success: false, message: "Error desconocido", results: null, status: 500 });
    }
  },
  periodoForma: async({token, periodo, forma_codigo, alianza}: {token: string | null, periodo: string, forma_codigo: string, alianza: string}) => {
    try {
      const { data, status } = await BASE.get(`/ventas/periodo-forma?periodo=${periodo}&forma_codigo=${forma_codigo}&alianza=${alianza}`, { headers: { Authorization: `${token}` } });
      return  ({ success: true, message: "", results: data.results, status });
    }
    catch (error) {
      if (error instanceof Error) {
        return ({ success: false, message: error.message, results: null, status: 500 });
      }
      return ({ success: false, message: "Error desconocido", results: null, status: 500 });
    }
  }
}
