import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { MovimientosResults } from "@/services/dto/farma/movimientos";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function useMovimientos() {
  const { userData } = useAuth();
  const [periodo, setPeriodo] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [error, setError] = useState({ code: 0, message: "" });
  const [movimientos,setMovimientos] = useState<MovimientosResults[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: async({ periodo }: { periodo: string }) => API.farma.movimientos({ cedula, periodo, token: userData && userData?.tokenWithBearer }),
    onSettled(data) {
      //console.log(data, error, variables, context);
      if (data && data.results) {
        setMovimientos(data.results);
      }
    }
  });

  const consultar = () => {
    if (cedula.length < 4) return setError({ code: 1, message: "Cedula invalida" });
    if (periodo.length < 6) return setError({ code: 2, message: "Periodo invalido" });
    setError({ code: 0, message: "" });
    const nuevoPeriodoSplit = periodo.split("-");
    const nuevoPeriodo = `${nuevoPeriodoSplit[1]}-${nuevoPeriodoSplit[0]}`;
    mutate({ periodo: nuevoPeriodo });
  };

  return { consultar, periodo, setPeriodo, cedula, setCedula, error, isPending,movimientos };
}

export default useMovimientos;
