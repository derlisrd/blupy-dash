import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { datosMainType } from "./useInformes";

interface Props {
  datos: datosMainType;
}

function PromedioTickets({ datos }: Props) {
  return (
    <Fragment>
      <GridItem bgColor="#f5f5f5" padding={1} borderRadius={2}>
        <Text fontSize="md" as="b">
          Prom. tickets
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.promedioTickets.farma.toFixed(0)}
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.promedioTickets.alianzas.toFixed(0)}
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b">
          {datos.promedioTickets.digital.toFixed(0)}
        </Text>
      </GridItem>
      <GridItem bgColor="#fde1ff" p={1}>
        <Text fontSize="sm" as="b">
          {datos.promedioTickets.total.toFixed(0)}
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default PromedioTickets;
