import { useContext } from "react";
import { HomeContext } from "./provider";

export const useHomeProvider = () => {
    const { lista, loading, datosTotales, porcentaje } = useContext(HomeContext);
    return { lista, loading, datosTotales, porcentaje };
  };