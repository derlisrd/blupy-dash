import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { useVentasProvider } from "./provider";
function Tickets() {
  const { tickets } = useVentasProvider();

  return (
    <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} marginBottom={8} gap={2}>
      <GridItem w="100%">
        <Card>
          <CardHeader>
            <Text as="b" casing="uppercase">
              FARMA:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <InfoIcon boxSize={6} color="yellowgreen" />
              <Text fontSize="xl" as="samp">
                {tickets.farma.toLocaleString("es-PY")}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card>
          <CardHeader>
            <Text as="b" casing="uppercase">
              ASO:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <InfoIcon boxSize={6} color="#7B341E" />
              <Text fontSize="xl" as="samp">
                {tickets.aso.toLocaleString("es-PY")}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card>
          <CardHeader>
            <Text as="b" casing="uppercase">
              DIGITAL
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <WarningIcon boxSize={6} color="#A0AEC0" />
              <Text fontSize="xl" as="samp">
                {tickets.digital.toLocaleString("es-PY")}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default Tickets;
