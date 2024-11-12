import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { datosMainType } from "./useInformes";

interface Props {
  datos: datosMainType;
}

function Vigentes({ datos }: Props) {
  return (
    <Fragment>
      <GridItem bgColor="#f5f5f5" padding={1} borderRadius={2}>
        <Text fontSize="md" as="b">
          Vigentes
        </Text>
      </GridItem>
      <GridItem alignSelf="center" borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b" align="center">
          {datos.registros.farma.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem alignSelf="center" borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.registros.alianzas.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem alignSelf="center" borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.vigentes.digital.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem bgColor="#fde1ff" p={1} alignSelf="center">
        <Text fontSize="sm" as="b">
          {datos.vigentes.total.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem p={1} alignSelf="center">
        <Text fontSize="sm" as="b">
          {datos.vigentes.anio.toLocaleString("es-PY")}
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default Vigentes;
