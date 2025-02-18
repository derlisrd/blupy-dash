import { InfoIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHomeProvider } from "./useHome";

function Solicitudes() {
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
              <InfoIcon boxSize={6} color="#3182CE" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.solicitudesHoy}
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
              <InfoIcon boxSize={6} color="#3182CE" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.solicitudesSemana}
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
              <InfoIcon boxSize={6} color="#3182CE" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.solicitudesMes}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card bgColor="#BEE3F8">
          <CardHeader>
            <Text as="b" casing="uppercase">
              Total:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <InfoIcon boxSize={6} color="#3182CE" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.solicitudesTotales}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default Solicitudes;
