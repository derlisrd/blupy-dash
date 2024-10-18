import { Box, Card, CardBody, CardHeader, Container, Heading, Input, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useState, useRef, KeyboardEvent } from "react";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import moment from "moment";
import { ConsultaClienteResults } from "../../../services/dto/consultacliente";

function ConsultasPage() {
  const { dataUser } = userDataHook();
  const [loading, setLoading] = useState(false);
  const buscarRef = useRef(null);

  const [resultado, setResultado] = useState<ConsultaClienteResults | null>(null);

  const buscarEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputElement = document.getElementById("_buscar") as HTMLInputElement | null;
      if (inputElement) {
        const buscar = inputElement.value;
        setLoading(true);
        const { results, success } = await APICALLER.consultaCliente({ token: dataUser.token, cedula: buscar });
        setLoading(false);
        if (success) {
          document.getElementById("_buscar")?.focus;
          setResultado(results);
        }
      }
    }
  };
  //const alianza = resultado && resultado.alianzas.find((e) => e.frpaCodigo === 129);
  return (
    <Container>
      <Box>
        <h1>Consulta cliente de farma</h1>
      </Box>
      <Box>
        <Input disabled={loading} id="_buscar" ref={buscarRef} placeholder="Busca y presiona ENTER..." onKeyUp={buscarEnter} />
      </Box>

      {resultado && resultado.farma && (
        <Card>
          <CardHeader>
            <Heading size="md">FICHA DE CLIENTE</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado.farma.nombre}
                </Heading>
                <Text pt="2" fontSize="sm">
                  {resultado.farma.cedula}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado.farma.funcionario === "N" ? "Asociacion" : "Funcionario de Farma"}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Pertenece
                </Text>
              </Box>
              {resultado?.farma.alianzas &&
                resultado.farma.alianzas.map((e, i) => (
                  <Box key={i}>
                    <Heading size="xs" textTransform="uppercase">
                      {e.nombre}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {e.formaPago}
                    </Text>
                    <Text pt="2" fontSize="sm">
                      {e.codigoAdicional}
                    </Text>
                  </Box>
                ))}
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado?.farma.credito}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Limite de credito
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado?.farma.creditoAdicional || "0"}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Limite de credito Adicional
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado?.farma.pendiente}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Pendiente
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {moment(resultado?.farma.fechaVigencia ?? "2070-01-01").format("DD-MM-YYYY")}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Fecha de vigencia
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      )}

      {resultado && resultado.micredito && (
        <Card>
          <CardHeader>
            <Heading size="md">BLUPY DIGITAL</Heading>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado.micredito.cuenta}
                </Heading>
                <Text pt="2" fontSize="sm">
                  CUENTA:
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado.micredito.linea}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Linea
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado?.micredito.pendiente}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Pendiente
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado?.micredito.tarjetaNumero}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Tarjeta Numero
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      )}
    </Container>
  );
}

export default ConsultasPage;
