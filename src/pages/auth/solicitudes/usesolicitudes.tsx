import { useContext } from "react";
import { SolicitudesContext } from "./provider";

export const useSolicitudes = () => {
  const { conteo, setConteo, listaOriginal, lista, loading, form, setForm, setLista, setLoading, getListaCB, filtros, setFiltros, actualizarSolicitud } =
    useContext(SolicitudesContext);
  return { conteo, setConteo, listaOriginal, lista, loading, form, setForm, setLista, setLoading, getListaCB, filtros, setFiltros, actualizarSolicitud };
};
