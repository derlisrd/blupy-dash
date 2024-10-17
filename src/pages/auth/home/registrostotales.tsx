import { QuestionIcon, StarIcon, SunIcon, WarningIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHomeProvider } from "./provider";

function RegistrosTotales() {
  const { datosTotales, porcentaje } = useHomeProvider();

  return (
    <Grid templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)"]} marginBottom={8} gap={2}>
      <GridItem w="100%">
        <Card bgColor="#FEEBC8">
          <CardHeader>
            <Text as="b" fontSize="sm" casing="uppercase">
              Uso:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <SunIcon boxSize={6} color="black" />
              <Text fontSize="xl" as="samp">
                {porcentaje}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card bgColor="#BEE3F8">
          <CardHeader>
            <Text as="b" fontSize="sm" casing="uppercase">
              Funcionarios:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <StarIcon boxSize={6} color="blue" />
              <Text fontSize="xl" as="samp">
                {datosTotales.funcionarios}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card bgColor="#EBF8FF">
          <CardHeader>
            <Text as="b" fontSize="sm" casing="uppercase">
              Asociaciones:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <WarningIcon boxSize={6} color="tomato" />
              <Text fontSize="xl" as="samp">
                {datosTotales.asociaciones}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card bgColor="#C4F1F9">
          <CardHeader>
            <Text as="b" fontSize="sm" casing="uppercase">
              Externos:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <QuestionIcon boxSize={6} color="#319795" />
              <Text fontSize="xl" as="samp">
                {datosTotales.externos}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default RegistrosTotales;
