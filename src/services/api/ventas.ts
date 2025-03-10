import { BASE } from "../base";
import { VentasPorFacturaResponse } from "../dto/ventas/ventaPorFactura";

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
  }
};
