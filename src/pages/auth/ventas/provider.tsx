import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";

type ventasTotalesType = {
  descuentoTotalMes: number;
  importeTotalAyer: number;
  importeTotalSemana: number;
  importeTotalMes: number;

  importeTotalAyerDigital: number;
  importeTotalSemanaDigital: number;
  importeTotalMesDigital: number;

  importeTotalAyerFuncionario: number;
  importeTotalSemanaFuncionario: number;
  importeTotalMesFuncionario: number;

  importeTotalAyerAso: number;
  importeTotalSemanaAso: number;
  importeTotalMesAso: number;
};
type ticketsType = {
  aso: number;
  digital: number;
  farma: number;
};

interface ContextProps {
  ventasTotales: ventasTotalesType;
  loading: boolean;
  tickets: ticketsType;
}

export const VentasContext = createContext<ContextProps>({
  ventasTotales: {
    descuentoTotalMes: 0,
    importeTotalAyer: 0,
    importeTotalSemana: 0,
    importeTotalMes: 0,

    importeTotalAyerDigital: 0,
    importeTotalSemanaDigital: 0,
    importeTotalMesDigital: 0,

    importeTotalAyerFuncionario: 0,
    importeTotalSemanaFuncionario: 0,
    importeTotalMesFuncionario: 0,

    importeTotalAyerAso: 0,
    importeTotalSemanaAso: 0,
    importeTotalMesAso: 0,
  },
  loading: true,
  tickets: {
    aso: 0,
    digital: 0,
    farma: 0,
  },
});

interface Props {
  children: ReactNode;
}
function VentasProvider({ children }: Props) {
  const { dataUser } = userDataHook();
  const datosIniciales = {
    descuentoTotalMes: 0,
    importeTotalAyer: 0,
    importeTotalSemana: 0,
    importeTotalMes: 0,

    importeTotalAyerDigital: 0,
    importeTotalSemanaDigital: 0,
    importeTotalMesDigital: 0,

    importeTotalAyerFuncionario: 0,
    importeTotalSemanaFuncionario: 0,
    importeTotalMesFuncionario: 0,

    importeTotalAyerAso: 0,
    importeTotalSemanaAso: 0,
    importeTotalMesAso: 0,
  };
  const [tickets, setTickets] = useState<ticketsType>({ aso: 0, digital: 0, farma: 0 });
  const [ventasTotales, setVentasTotales] = useState(datosIniciales);
  const [loading, setLoading] = useState(true);

  const getLista = useCallback(async () => {
    setLoading(true);
    const periodo = new Date();
    const desde = `${periodo.getFullYear()}-${String(periodo.getMonth() + 1).padStart(2, "0")}-01`;
    const hasta = new Date(periodo.getFullYear(), periodo.getMonth() + 1, 0).toISOString().split("T")[0];
    const [ventas, tickets] = await Promise.all([APICALLER.ventasTotales(dataUser.token, desde, hasta), APICALLER.tickets({ token: dataUser.token, desde, hasta })]);
    ventas.success && setVentasTotales(ventas.results);
    tickets.success && setTickets(tickets.results);

    setLoading(false);
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
  const values = { loading, ventasTotales, tickets };
  return <VentasContext.Provider value={values}>{children}</VentasContext.Provider>;
}

export const useVentasProvider = () => {
  const { loading, ventasTotales, tickets } = useContext(VentasContext);
  return { loading, ventasTotales, tickets };
};

export default VentasProvider;
