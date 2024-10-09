import { InfoIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHomeProvider } from "./provider";

function SolicitudesFarma() {
  const { datosTotales } = useHomeProvider();

  return (
    <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)"]} marginBottom={8} gap={2}>
      <GridItem w="100%">
        <Card>
          <CardHeader>
            <Text as="b" casing="uppercase">
              Farma:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <InfoIcon boxSize={6} color="#cc66dd" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.solicitudesFuncionarios}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card>
          <CardHeader>
            <Text as="b" casing="uppercase">
              Aso:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <InfoIcon boxSize={6} color="#3182CE" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.solicitudesAsociaciones}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card>
          <CardHeader>
            <Text as="b" casing="uppercase">
              Farma Vigentes:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <InfoIcon boxSize={6} color="green" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.solicitudesFuncionariosVigentes}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card>
          <CardHeader>
            <Text as="b" casing="uppercase">
              Aso Vigentes:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <InfoIcon boxSize={6} color="green" />
              <Text fontSize="2xl" as="samp">
                {datosTotales.solicitudesAsociacionesVigentes}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default SolicitudesFarma;
