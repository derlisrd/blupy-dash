import { createContext, MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import { solicitudesData } from "../../../models/solicitudes_data_model";

interface userForm extends solicitudesData {
  cliente_id: number | string;
}

type filtrosType = {
  desde: string;
  hasta: string;
  estado_id: string;
  tipo: string;
  asofarma: string;
  funcionario: string;
};

type solicitudesTypes = {
  listaOriginal: MutableRefObject<solicitudesData[]>;
  conteo: number;
  setConteo: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  filtros: filtrosType;
  setFiltros: React.Dispatch<React.SetStateAction<filtrosType>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  lista: solicitudesData[];
  setLista: React.Dispatch<React.SetStateAction<solicitudesData[]>>;
  form: userForm;
  setForm: React.Dispatch<React.SetStateAction<userForm>>;
  getListaCB: () => void;
};
const listaOriginalRef: MutableRefObject<solicitudesData[]> = { current: [] };

export const SolicitudesContext = createContext<solicitudesTypes>({
  listaOriginal: listaOriginalRef,
  conteo: 0,
  setConteo: () => {},
  loading: true,
  setLoading: () => {},
  filtros: { desde: "", hasta: "", estado_id: "", tipo: "", asofarma: "", funcionario: "" },
  setFiltros: () => {},
  lista: [],
  setLista: () => {},
  form: {
    uid: 0,
    estado_id: 0,
    funcionario: 0,
    id: null,
    name: "",
    celular: "",
    cedula: "",
    cliente_id: "",
    estado: "",
    tipo: 0,
    email: "",
    asofarma: 0,
    user_id: 0,
    foto_ci_frente: "",
    solicitud_credito: 0,
    codigo: "",
  },
  setForm: () => {},
  getListaCB: () => {},
});

type Props = {
  children: ReactNode;
};

function SolicitudesProvider({ children }: Props) {
  const { dataUser } = userDataHook();

  const [conteo, setConteo] = useState<number>(0);
  const listaOriginal = useRef<solicitudesData[]>([]);
  const [lista, setLista] = useState<solicitudesData[]>([]);
  const [filtros, setFiltros] = useState({
    desde: "",
    hasta: "",
    estado_id: "",
    tipo: "",
    asofarma: "",
    funcionario: "",
  });
  const [loading, setLoading] = useState(true);

  const initialForm: userForm = {
    estado_id: 0,
    funcionario: 0,
    id: null,
    name: "",
    celular: "",
    cedula: "",
    cliente_id: "",
    tipo: 0,
    estado: "",
    email: "",
    asofarma: 0,
    user_id: 0,
    uid: 0,
    foto_ci_frente: "",
    solicitud_credito: 0,
    codigo: "",
  };
  const [form, setForm] = useState<userForm>(initialForm);

  const getListaCB = useCallback(async () => {
    const res = await APICALLER.solicitudes({ token: dataUser.token });
    setLoading(false);
    if (res.success) {
      setLista(res.results);
      listaOriginal.current = res.results;
      setConteo(res.results.length);
    }
  }, [dataUser.token]);

  useEffect(() => {
    const ca = new AbortController();
    let isA = true;
    isA && getListaCB();
    return () => {
      isA = false;
      ca.abort();
    };
  }, [getListaCB]);

  const values = { listaOriginal, conteo, setConteo, lista, setLista, filtros, setFiltros, loading, setLoading, form, setForm, getListaCB };
  return <SolicitudesContext.Provider value={values}>{children}</SolicitudesContext.Provider>;
}

export default SolicitudesProvider;
