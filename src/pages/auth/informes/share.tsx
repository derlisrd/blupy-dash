import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { datosMainType } from "./useInformes";

interface Props {
  datos: datosMainType;
}

function Share({ datos }: Props) {
  return (
    <Fragment>
      <GridItem bgColor="#f5f5f5" padding={1} borderRadius={2}>
        <Text fontSize="xs" as="b">
          Share
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1} alignSelf="end">
        <Text fontSize="xs" as="b">
          {((datos.cantidadTickets.farma * 100) / datos.cantidadTickets.total).toFixed(2)}%
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1} alignSelf="end">
        <Text fontSize="xs" as="b">
          {((datos.cantidadTickets.alianzas * 100) / datos.cantidadTickets.total).toFixed(2)}%
        </Text>
      </GridItem>
      <GridItem borderBottomWidth={1} p={1} alignSelf="end">
        <Text fontSize="xs" as="b">
          {((datos.cantidadTickets.digital * 100) / datos.cantidadTickets.total).toFixed(2)}%
        </Text>
      </GridItem>
      <GridItem bgColor="#fde1ff" p={1}>
        <Text fontSize="xs" as="b">
          100%
        </Text>
      </GridItem>
      <GridItem p={1}>
        <Text fontSize="xs" as="b">
          _
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default Share;
