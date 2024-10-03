import { Box, Card, CardBody, CardHeader, Container, Heading, Input, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useState, useRef, KeyboardEvent } from "react";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import moment from "moment";

type alianzaType = {
  alianza: string;
  frpaCodigo: number;
  clieCodigo: number;
};

type resultadoType = {
  clerFchFinVigencia: string;
  clerLimiteCredito: number;
  clerLimiteCreditoAdic: number;
  clieCodigo: number;
  limiteCreditoTotal: number;
  pendiente: number;
  persCi: string;
  persNombre: string;
  saldoDisponible: number;
  esFuncionario: string;
  alianzas: Array<alianzaType>;
};

function ConsultasPage() {
  const { dataUser } = userDataHook();
  const [loading, setLoading] = useState(false);
  const buscarRef = useRef(null);

  const [resultado, setResultado] = useState<resultadoType>({
    clerFchFinVigencia: "",
    clerLimiteCredito: 0,
    clerLimiteCreditoAdic: 0,
    clieCodigo: 0,
    limiteCreditoTotal: 0,
    pendiente: 0,
    persCi: "",
    persNombre: "",
    saldoDisponible: 0,
    esFuncionario: "",
    alianzas: [],
  });

  const buscarEnter = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputElement = document.getElementById("_buscar") as HTMLInputElement | null;
      if (inputElement) {
        const buscar = inputElement.value;
        setLoading(true);
        const res = await APICALLER.consultaFarma({ token: dataUser.token, cedula: buscar });
        setLoading(false);

        if (res.success) {
          document.getElementById("_buscar")?.focus;
          setResultado(res.results);
        }
      }
    }
  };
  const alianza = resultado.alianzas.find((e) => e.frpaCodigo === 129);

  return (
    <Container>
      <Box>
        <h1>Consulta cliente de farma</h1>
      </Box>
      <Box>
        <Input disabled={loading} id="_buscar" ref={buscarRef} placeholder="Busca y presiona ENTER..." onKeyUp={buscarEnter} />
      </Box>
      {resultado.persCi !== "" && (
        <Card>
          <CardHeader>
            <Heading size="md">FICHA DE CLIENTE</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado.persNombre}
                </Heading>
                <Text pt="2" fontSize="sm">
                  cedula: {resultado.persCi}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado.esFuncionario === "N" ? "Asociacion" : "Funcionario de Farma"}
                </Heading>
                <Text pt="2" fontSize="sm"></Text>
              </Box>
              {alianza && (
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {alianza.alianza}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {alianza.clieCodigo}
                  </Text>
                </Box>
              )}
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado.clerLimiteCredito}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Limite de credito
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado.clerLimiteCreditoAdic}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Limite de credito Adicional
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {resultado.pendiente}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Pendiente
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  {moment(resultado.clerFchFinVigencia ?? "2070-01-01").format("DD-MM-YYYY")}
                </Heading>
                <Text pt="2" fontSize="sm">
                  Fecha de vigencia
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
