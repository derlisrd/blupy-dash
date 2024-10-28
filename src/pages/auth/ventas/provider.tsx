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

interface ContextProps {
  ventasTotales: ventasTotalesType;
  loading: boolean;
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

  const [ventasTotales, setVentasTotales] = useState(datosIniciales);
  const [loading, setLoading] = useState(true);

  const getLista = useCallback(async () => {
    setLoading(true);
    const res = await APICALLER.ventasTotales(dataUser.token);
    if (res.success) {
      setVentasTotales(res.results);
    }
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
  const values = { loading, ventasTotales };
  return <VentasContext.Provider value={values}>{children}</VentasContext.Provider>;
}

export const useVentasProvider = () => {
  const { loading, ventasTotales } = useContext(VentasContext);
  return { loading, ventasTotales };
};

export default VentasProvider;
