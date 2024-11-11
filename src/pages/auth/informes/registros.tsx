import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { datosMainType } from "./useInformes";

interface Props {
  datos: datosMainType;
}

function Registros({ datos }: Props) {
  return (
    <Fragment>
      <GridItem bgColor="#ededed" padding={1} borderRadius={2}>
        <Text fontSize="md" as="b">
          Registros
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="md" as="b">
          {datos.registros.farma.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="md" as="b">
          {datos.registros.alianzas.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="md" as="b">
          {datos.registros.digital.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem bgColor="#fde1ff" p={1}>
        <Text fontSize="md" as="b">
          {datos.registros.total.toLocaleString("es-PY")}
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default Registros;
