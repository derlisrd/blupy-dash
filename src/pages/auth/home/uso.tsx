import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHomeProvider } from "./useHome";

function Uso() {
  const { porcentaje } = useHomeProvider();
  return (
    <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)"]} marginBottom={8} gap={2}>
      <GridItem w="100%">
        <Card bgColor="#fff">
          <CardHeader>
            <Text as="b" fontSize="sm" casing="uppercase">
              Digital:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <Text fontSize="xl" as="samp">
                {porcentaje.tasaUsoDigital}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card bgColor="#fff">
          <CardHeader>
            <Text as="b" fontSize="sm" casing="uppercase">
              Funcionarios:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <Text fontSize="xl" as="samp">
                {porcentaje.tasaUsoFuncionario}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card bgColor="#fff">
          <CardHeader>
            <Text as="b" fontSize="sm" casing="uppercase">
              Asociaciones:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <Text fontSize="xl" as="samp">
                {porcentaje.tasaUsoAsoc}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem w="100%">
        <Card bgColor="#1c0b19">
          <CardHeader>
            <Text as="b" fontSize="sm" casing="uppercase" color="#fff">
              Todos:
            </Text>
          </CardHeader>
          <CardBody>
            <Flex direction="row" gap="2" alignItems="center">
              <Text fontSize="xl" as="samp" color="#fff">
                {porcentaje.tasaUsoTotal}
              </Text>
            </Flex>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default Uso;
