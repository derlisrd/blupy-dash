import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { datosMainType } from "./useInformes";

interface Props {
  datos: datosMainType;
}

function CantidadTickets({ datos }: Props) {
  return (
    <Fragment>
      <GridItem bgColor="#ededed" padding={1} borderRadius={2}>
        <Text fontSize="md" as="b">
          Cant. tickets
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.cantidadTickets.farma.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.cantidadTickets.alianzas.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.cantidadTickets.digital.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem bgColor="#fde1ff" p={1}>
        <Text fontSize="sm" as="b">
          {datos.cantidadTickets.total.toLocaleString("es-PY")}
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default CantidadTickets;
