import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";

type ventasTotalesType = {
  descuentoTotalMes: string;
  importeTotalAyer: string;
  importeTotalSemana: string;
  importeTotalMes: string;

  importeTotalAyerDigital: string;
  importeTotalSemanaDigital: string;
  importeTotalMesDigital: string;

  importeTotalAyerFuncionario: string;
  importeTotalSemanaFuncionario: string;
  importeTotalMesFuncionario: string;

  importeTotalAyerAso: string;
  importeTotalSemanaAso: string;
  importeTotalMesAso: string;
};

interface ContextProps {
  ventasTotales: ventasTotalesType;
  loading: boolean;
}

export const VentasContext = createContext<ContextProps>({
  ventasTotales: {
    descuentoTotalMes: "",
    importeTotalAyer: "",
    importeTotalSemana: "",
    importeTotalMes: "",

    importeTotalAyerDigital: "",
    importeTotalSemanaDigital: "",
    importeTotalMesDigital: "",

    importeTotalAyerFuncionario: "",
    importeTotalSemanaFuncionario: "",
    importeTotalMesFuncionario: "",

    importeTotalAyerAso: "",
    importeTotalSemanaAso: "",
    importeTotalMesAso: "",
  },
  loading: true,
});

interface Props {
  children: ReactNode;
}
function VentasProvider({ children }: Props) {
  const { dataUser } = userDataHook();
  const datosIniciales = {
    descuentoTotalMes: "",
    importeTotalAyer: "0",
    importeTotalSemana: "0",
    importeTotalMes: "0",

    importeTotalAyerDigital: "0",
    importeTotalSemanaDigital: "0",
    importeTotalMesDigital: "0",

    importeTotalAyerFuncionario: "0",
    importeTotalSemanaFuncionario: "0",
    importeTotalMesFuncionario: "0",

    importeTotalAyerAso: "0",
    importeTotalSemanaAso: "0",
    importeTotalMesAso: "0",
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
