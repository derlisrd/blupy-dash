import { APICALLER } from "@/services/api";
import userDataHook from "@/store/user_data_store";
import { Box, Container, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import React from "react";

function ContratosPage() {
  const { dataUser } = userDataHook();
  const [loading, setLoading] = useState(false);
  const buscarRef = useRef(null);

  const buscarEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputElement = document.getElementById("_buscar") as HTMLInputElement | null;
      if (inputElement) {
        const buscar = inputElement.value;
        setLoading(true);
        const { results, success } = await APICALLER.consultaEstadoContrato(buscar, dataUser.token);
        setLoading(false);
        if (success) {
          document.getElementById("_buscar")?.focus;
        }
        console.log(results);
      }
    }
  };

  return (
    <Container>
      <h3>Consultas de contrato blupy</h3>

      <Box>
        <Input disabled={loading} id="_buscar" ref={buscarRef} placeholder="Busca y presiona ENTER..." onKeyUp={buscarEnter} />
      </Box>
    </Container>
  );
}

export default ContratosPage;
