import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { datosMainType } from "./useInformes";

interface Props {
  datos: datosMainType;
}

function CantidadTickets({ datos }: Props) {
  return (
    <Fragment>
      <GridItem bgColor="#f5f5f5" padding={1} borderRadius={2}>
        <Text fontSize="xs" as="b">
          Cant. tickets
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="xs" as="b">
          {datos.cantidadTickets.farma.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="xs" as="b">
          {datos.cantidadTickets.alianzas.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="xs" as="b">
          {datos.cantidadTickets.digital.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem bgColor="#fde1ff" p={1}>
        <Text fontSize="xs" as="b">
          {datos.cantidadTickets.total.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem p={1}>
        <Text fontSize="xs" as="b">
          {datos.cantidadTickets.anio.toLocaleString("es-PY")}
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default CantidadTickets;
