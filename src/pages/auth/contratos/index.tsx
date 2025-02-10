import { env } from "@/config/env";
import { APICALLER } from "@/services/api";
import userDataHook from "@/store/user_data_store";
import { Box, Container, GridItem, Grid, Input, Image, Button } from "@chakra-ui/react";
import { Fragment, useRef, useState } from "react";
import React from "react";

type ContratosDataType = {
  estrDescripcion: string;
  micoCantImpresiones: number;
  micoCodigo: number;
  micoEstado: string;
  usuarioImpresor: string;
  micoValorLineaCredito: number;
};
type ClienteDataType = {
  foto_ci_frente: string;
  id: number;
};
type resultsType = {
  cliente: ClienteDataType;
  contratos: ContratosDataType[];
};

function ContratosPage() {
  const { dataUser } = userDataHook();
  const [loading, setLoading] = useState(false);
  const buscarRef = useRef(null);
  const [results, setResults] = useState<resultsType | null>(null);

  const aprobarContrato = async (contrato: ContratosDataType) => {
    setLoading(true);
    const res = await APICALLER.aprobarContrato(contrato.micoCodigo, dataUser.token);
    setLoading(false);
    if (res.success) {
      alert("Contrato aprobado");
    } else {
      alert("Error al aprobar el contrato");
    }
  };

  const buscarEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputElement = document.getElementById("_buscar") as HTMLInputElement | null;
      if (inputElement) {
        const buscar = inputElement.value;
        setLoading(true);
        const { results, success } = await APICALLER.consultaEstadoContrato(buscar, dataUser.token);
        setLoading(false);

        if (!success) {
          setResults(null);
          return;
        }

        if (success) {
          document.getElementById("_buscar")?.focus;
          setResults({
            cliente: results.cliente,
            contratos: results.contratos,
          });
        }
      }
    }
  };

  return (
    <Container>
      <h3>Consultas de contrato blupy</h3>
      <Box>
        <Input disabled={loading} id="_buscar" ref={buscarRef} placeholder="Ingresa cedula y presiona ENTER..." onKeyUp={buscarEnter} />
      </Box>
      {results && results.cliente && (
        <Box>
          <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]} gap={4}>
            <GridItem>
              <h4>Nombre:</h4>
              <p>{results.cliente.id}</p>
              <h4>Cedula:</h4>
              <Image src={env.PUBLIC_PATH + "/" + results.cliente.foto_ci_frente} />
            </GridItem>
            <GridItem>
              {results.contratos.map((e, i) => (
                <Fragment key={i}>
                  <h4>Contrato</h4>
                  <p>Descripcion: {e.estrDescripcion}</p>
                  <p>Cantidad de impresiones: {e.micoCantImpresiones}</p>
                  <p>Codigo de contrato: {e.micoCodigo}</p>
                  <p>Estado: {e.micoEstado}</p>
                  <p>Impresor: {e.usuarioImpresor}</p>
                  <p>Valor linea de credito: {e.micoValorLineaCredito}</p>
                  <Button
                    mt={3}
                    onClick={() => {
                      aprobarContrato(e);
                    }}
                  >
                    activar contrato
                  </Button>
                </Fragment>
              ))}
            </GridItem>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default ContratosPage;
