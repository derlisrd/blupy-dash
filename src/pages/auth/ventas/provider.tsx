import { APICALLER } from "@/services/api";
import { VentaFormaPagoResults, VentasCompararMesesResults, VentaTopSucursalesTicketsResults, VentaTopSucursalIngresosResults } from "@/services/dto/informeventa";
import userDataHook from "@/store/user_data_store";
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

interface VentasContextType {
  forma: VentaFormaPagoResults[];
  loading: boolean;
  fecha1: string;
  fecha2: string;
  setFecha1: Dispatch<SetStateAction<string>>;
  setFecha2: Dispatch<SetStateAction<string>>;
  topSucursalesIngresos: VentaTopSucursalIngresosResults[];
  topSucursalesTickets: VentaTopSucursalesTicketsResults[];
  compararMeses: VentasCompararMesesResults;
  cambioFecha: (fechaInicio: string, fechaHasta: string) => void;
}

const VentasContext = createContext<VentasContextType>({
  forma: [],
  loading: false,
  fecha1: "",
  fecha2: "",
  setFecha1: () => {},
  setFecha2: () => {},
  topSucursalesIngresos: [],
  topSucursalesTickets: [],
  compararMeses: {
    tickets1: 0,
    tickets2: 0,
    total1: 0,
    total2: 0,
  },
  cambioFecha: () => {},
});

const obtenerMesAnterior = () => {
  const fecha = new Date();
  fecha.setMonth(fecha.getMonth() - 1);
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
};

const obtenerMesActual = () => {
  const fecha = new Date();
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
};

function VentasProvider({ children }: { children: ReactNode }) {
  const { dataUser } = userDataHook();
  const [loading, setLoading] = useState<boolean>(false);
  const [fecha1, setFecha1] = useState<string>(obtenerMesAnterior());
  const [fecha2, setFecha2] = useState<string>(obtenerMesActual());
  const [forma, setForma] = useState<VentaFormaPagoResults[]>([]);
  const [topSucursalesIngresos, setSucursalesTopIngresos] = useState<VentaTopSucursalIngresosResults[]>([]);
  const [topSucursalesTickets, setSucursalesTopTickets] = useState<VentaTopSucursalesTicketsResults[]>([]);
  const [compararMeses, setCompararMeses] = useState<VentasCompararMesesResults>({
    tickets1: 0,
    tickets2: 0,
    total1: 0,
    total2: 0,
  });

  const cambioFecha = useCallback(
    async (fechaInicio: string, fechaHasta: string) => {
      setLoading(true);

      // Convertir MM-YYYY a YYYY-MM
      const convertirFormato = (fecha: string) => {
        const [mes, año] = fecha.split("-");
        return `${año}-${mes}`; // Convertimos a YYYY-MM
      };

      const fechaInicioConvertida = convertirFormato(fechaInicio);
      const fechaHastaConvertida = convertirFormato(fechaHasta);

      const res = await APICALLER.compararMeses(dataUser.token, fechaInicioConvertida, fechaHastaConvertida);

      setLoading(false);
      setCompararMeses(res.results);
    },
    [dataUser.token]
  );
  const getLista = useCallback(async () => {
    const fechaActual = new Date();
    const fechaHasta = `${String(fechaActual.getMonth() + 1).padStart(2, "0")}-${fechaActual.getFullYear()}`;
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    const fechaDesde = `${String(fechaActual.getMonth()).padStart(2, "0")}-${fechaActual.getFullYear()}`;

    const { topSucursalesIngresos, topSucursalesTickets, compararMeses, formaPago } = APICALLER;
    setLoading(true);
    const [topIngresos, topTickets, meses, forma] = await Promise.all([
      topSucursalesIngresos(dataUser.token),
      topSucursalesTickets(dataUser.token),
      compararMeses(dataUser.token, fechaDesde, fechaHasta),
      formaPago(dataUser.token),
    ]);
    setLoading(false);
    setForma(forma.results.map((f: VentaFormaPagoResults) => VentaFormaPagoResults.fromJson(f)));
    setSucursalesTopIngresos(VentaTopSucursalIngresosResults.mapFromJson(topIngresos.results));
    setSucursalesTopTickets(VentaTopSucursalesTicketsResults.mapFromJson(topTickets.results));
    setCompararMeses(meses.results);
  }, [dataUser.token]);

  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      getLista();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [getLista]);

  const values = {
    loading,
    forma,
    fecha1,
    fecha2,
    setFecha1,
    setFecha2,
    topSucursalesIngresos,
    topSucursalesTickets,
    compararMeses,
    cambioFecha,
  };
  return <VentasContext.Provider value={values}>{children}</VentasContext.Provider>;
}

export const useVentas = () => {
  const { loading, forma, fecha1, fecha2, setFecha1, setFecha2, topSucursalesIngresos, topSucursalesTickets, compararMeses, cambioFecha } = useContext(VentasContext);
  return { loading, forma, fecha1, fecha2, setFecha1, setFecha2, topSucursalesIngresos, topSucursalesTickets, compararMeses, cambioFecha };
};

export default VentasProvider;
