import { APICALLER } from "@/services/api";
import { VentasPorSucursalResults } from "@/services/dto/ventasPorSucursal";
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
  ventas: Array<VentasPorSucursalResults>;
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
});

interface SucursalesProviderProps {
  children: React.ReactNode;
}

function SucursalesProvider({ children }: SucursalesProviderProps) {
  const { dataUser } = userDataHook();

  const [modal, setModal] = useState({ filtros: false });
  const [ventas, setVentas] = useState([]);
  const [punto, setPunto] = useState("");
  const [loading, setLoading] = useState(false);
  const [desde, setDesde] = useState<string | null>(null);
  const [hasta, setHasta] = useState<string | null>(null);

  const getVentas = async () => {
    setLoading(true);
    const res = await APICALLER.ventasPorSucursal(dataUser.token, punto, desde, hasta);
    setLoading(false);
    if (res.success) {
      setVentas(res.results);
    }
  };

  const values = { modal, setModal, desde, setDesde, hasta, setHasta, loading, getVentas, ventas, setPunto, punto };
  return <SucursalesContext.Provider value={values}>{children}</SucursalesContext.Provider>;
}

export const useSucursales = () => {
  const { modal, setModal, desde, setDesde, hasta, setHasta, loading, getVentas, ventas, setPunto, punto } = useContext(SucursalesContext);
  return { modal, setModal, desde, setDesde, hasta, setHasta, loading, getVentas, ventas, setPunto, punto };
};

export default SucursalesProvider;
