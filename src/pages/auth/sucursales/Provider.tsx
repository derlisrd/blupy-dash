import { APICALLER } from "@/services/api";
import { SucursalesVentasResults } from "@/services/dto/sucursalesventas";

import userDataHook from "@/store/user_data_store";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type modalType = {
  filtros: boolean;
};

interface SucursalesContextProps {
  punto: string;
  setPunto: Dispatch<SetStateAction<string>>;
  modal: modalType;
  setModal: Dispatch<SetStateAction<modalType>>;
  desde: string | null;
  setDesde: Dispatch<SetStateAction<string | null>>;
  hasta: string | null;
  setHasta: Dispatch<SetStateAction<string | null>>;
  loading: boolean;
  getVentas: () => void;
  ventas: Array<SucursalesVentasResults>;
  total: number;
}

const SucursalesContext = createContext<SucursalesContextProps>({
  modal: { filtros: false },
  punto: "",
  setPunto: () => {},
  setModal: () => {},
  desde: null,
  setDesde: () => {},
  hasta: null,
  setHasta: () => {},
  loading: false,
  getVentas: () => {},
  ventas: [],
  total: 0,
});

interface SucursalesProviderProps {
  children: React.ReactNode;
}

function SucursalesProvider({ children }: SucursalesProviderProps) {
  const { dataUser } = userDataHook();

  const [modal, setModal] = useState({ filtros: false });
  const [total, setTotal] = useState(0);
  const [ventas, setVentas] = useState<SucursalesVentasResults[]>([]);
  const [punto, setPunto] = useState("");
  const [loading, setLoading] = useState(false);
  const [desde, setDesde] = useState<string | null>(null);
  const [hasta, setHasta] = useState<string | null>(null);

  const getVentas = async () => {
    setLoading(true);
    const res = await APICALLER.ventasPorSucursal(dataUser.token, punto, desde, hasta);
    setLoading(false);
    if (res.success) {
      let total = 0;
      setVentas(res.results);
      res.results.forEach((item) => {
        total += item.importe_final;
      });
      setTotal(total);
    }
  };

  const values = { modal, setModal, desde, setDesde, hasta, setHasta, loading, getVentas, ventas, setPunto, punto, total };
  return <SucursalesContext.Provider value={values}>{children}</SucursalesContext.Provider>;
}

export const useSucursales = () => {
  const { modal, setModal, desde, setDesde, hasta, setHasta, loading, getVentas, ventas, setPunto, punto, total } = useContext(SucursalesContext);
  return { modal, setModal, desde, setDesde, hasta, setHasta, loading, getVentas, ventas, setPunto, punto, total };
};

export default SucursalesProvider;
