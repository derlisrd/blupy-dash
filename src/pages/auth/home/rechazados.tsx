import { NotAllowedIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHomeProvider } from "./useHome";

function Rechazados() {
  const { datosTotales } = useHomeProvider();

  return (
    <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)"]} marginBottom={8} gap={2}>
      <GridItem w="100%">
        <Card>
          <CardHeader>
            <Text as="b" casing="uppercase">
              Hoy:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <NotAllowedIcon boxSize={6} color="tomato" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.rechazadosHoy}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card>
          <CardHeader>
            <Text as="b" casing="uppercase">
              Semana:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <NotAllowedIcon boxSize={6} color="tomato" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.rechazadosSemana}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card>
          <CardHeader>
            <Text as="b" casing="uppercase">
              Mes:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <NotAllowedIcon boxSize={6} color="tomato" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.rechazadosMes}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card bgColor="#FED7D7">
          <CardHeader>
            <Text as="b" casing="uppercase">
              Total:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <NotAllowedIcon boxSize={6} color="tomato" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.solicitudesRechazadas}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default Rechazados;
