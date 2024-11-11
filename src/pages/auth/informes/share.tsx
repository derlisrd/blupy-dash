import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { datosMainType } from "./useInformes";

interface Props {
  datos: datosMainType;
}

function Share({ datos }: Props) {
  return (
    <Fragment>
      <GridItem bgColor="#ededed" padding={1} borderRadius={2}>
        <Text fontSize="md" as="b">
          Share
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="md" as="b">
          {((datos.cantidadTickets.farma * 100) / datos.cantidadTickets.total).toFixed(2)}%
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="md" as="b">
          {((datos.cantidadTickets.alianzas * 100) / datos.cantidadTickets.total).toFixed(2)}%
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="md" as="b">
          {((datos.cantidadTickets.digital * 100) / datos.cantidadTickets.total).toFixed(2)}%
        </Text>
      </GridItem>
      <GridItem bgColor="#fde1ff" p={1}>
        <Text fontSize="md" as="b">
          100%
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default Share;
