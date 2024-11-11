import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { datosMainType } from "./useInformes";

interface Props {
  datos: datosMainType;
}

function TasaUso({ datos }: Props) {
  return (
    <Fragment>
      <GridItem bgColor="#ededed" padding={1} borderRadius={2}>
        <Text fontSize="md" as="b">
          Tasa de uso
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.porcentajeUso.farma}
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.porcentajeUso.alianzas}
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.porcentajeUso.digital}
        </Text>
      </GridItem>
      <GridItem bgColor="#fde1ff" p={1}>
        <Text fontSize="sm" as="b">
          {datos.porcentajeUso.total}
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default TasaUso;
