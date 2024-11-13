import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { datosMainType } from "./useInformes";

interface Props {
  datos: datosMainType;
}

function Rechazados({ datos }: Props) {
  return (
    <Fragment>
      <GridItem bgColor="#f5f5f5" padding={1} borderRadius={2}>
        <Text fontSize="xs" as="b">
          Rechazado
        </Text>
      </GridItem>
      <GridItem alignSelf="center" borderBottomWidth={1} p={1}>
        <Text fontSize="xs" as="b" align="center">
          {datos.rechazados.farma.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem alignSelf="center" borderBottomWidth={1} p={1}>
        <Text fontSize="xs" as="b">
          {datos.rechazados.alianzas.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem alignSelf="center" borderBottomWidth={1} p={1}>
        <Text fontSize="xs" as="b">
          {datos.rechazados.digital.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem bgColor="#fde1ff" p={1} alignSelf="center">
        <Text fontSize="xs" as="b">
          {datos.rechazados.total.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem p={1} alignSelf="center">
        <Text fontSize="xs" as="b">
          {datos.rechazados.anio.toLocaleString("es-PY")}
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default Rechazados;
