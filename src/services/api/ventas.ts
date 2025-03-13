import { BASE } from "../base";
import { VentasPorFacturaResponse } from "../dto/ventas/ventaPorFactura";
import { VentasAcumuladasResponse } from "../dto/ventas/ventasAcumuladas";

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
  acumuladasMes: async (token: string | null) => {
    try {
      const { data, status } = await BASE.get("/ventas/acumulados-mes", { headers: { Authorization: `${token}` } });
      return new VentasAcumuladasResponse({ success: true, message: "", results: data.results, status });
    }
    catch (error) {
      if (error instanceof Error) {
        return new VentasAcumuladasResponse({ success: false, message: error.message, results: null, status: 500 });
      }
      return new VentasAcumuladasResponse({ success: false, message: "Error desconocido", results: null, status: 500 });
    }
  }
}
