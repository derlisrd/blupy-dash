import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { ContratosConsultaResults } from "@/services/dto/farma/contratos";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function useContratoCodigo() {
  const { userData } = useAuth();
  const [dataBuscar, setDataBuscar] = useState<ContratosConsultaResults | null>(null);

  const buscarMutate = useMutation({
    mutationKey: ["contratoPorDocumento", "buscar"],
    mutationFn: async (q:string) => {
      const response = await API.consultas.contratoPorCodigo(q, userData && userData.token);
        //setDataBuscar((response && response.results) || null);
      return response;
    },
    onSettled: (data) => {
      setDataBuscar(data && data.results ? data.results : null);
    }
  });
  const aprobarMutate =  useMutation({
    mutationKey: ["contratoPorDocumento", "aprobar"],
    mutationFn: async (q: string) => API.solicitudes.aprobarSolicitud(q, userData && userData.tokenWithBearer),
    onSettled: (data) => {
      if (data && data.success && data.results) {
        const dataAntigua = dataBuscar ? { ...dataBuscar } : null;
        // Modificar la copia, no el original
        if (dataAntigua && dataAntigua.cliente) {
          // Crear una copia del objeto cliente para mantener la inmutabilidad
          dataAntigua.cliente = {
            ...dataAntigua.cliente,
            estado_id: data.results.estado_id,
            estado: data.results.estado
          };
          // Actualizar el estado con la copia modificada
          setDataBuscar(dataAntigua);
        }
      }
    }
  });
  const recibirMutate = useMutation({
    mutationKey: ["contratoPorDocumento", "recibir"],
    mutationFn: async ({ codigo }: { codigo: number }) => {
      const response = await API.contratos.recibir(codigo, userData && userData.tokenWithBearer);
      return response
    },
    onSettled: (data, _, variables) => {
      if(data && data.success && data.results && dataBuscar!==null){
        const dataAntigua = { ...dataBuscar } 
        const codigo = variables.codigo;
 
        if (dataAntigua.contratos) {
          const contratoIndex = dataAntigua.contratos.findIndex(e=> e.codigoContrato === codigo)
          if (contratoIndex >= 0) {
            dataAntigua.contratos[contratoIndex].estadoContrato = data.results.estado;
            setDataBuscar(dataAntigua);
            
          }
        }
      }
    }  })
  
  const recibir = async (codigo: number) => {
    recibirMutate.mutateAsync({codigo});
  };
  const buscar = (q: string) => buscarMutate.mutate(q);
  const aprobar = (codigo: string) => aprobarMutate.mutate(codigo);

  return { isPending: aprobarMutate.isPending || buscarMutate.isPending || recibirMutate.isPending, dataBuscar, buscar, aprobar, recibir };
}

export default useContratoCodigo;
