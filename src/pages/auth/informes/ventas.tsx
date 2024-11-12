import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";
import { datosMainType } from "./useInformes";

interface Props {
  datos: datosMainType;
}

function Ventas({ datos }: Props) {
  return (
    <Fragment>
      <GridItem bgColor="#f5f5f5" padding={1} borderRadius={2}>
        <Text fontSize="md" as="b" align="center">
          Ventas
        </Text>
      </GridItem>
      <GridItem alignSelf="center" borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b" p={1}>
          {datos.ventas.farma.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem alignSelf="center" borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b" p={1}>
          {datos.ventas.alianzas.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem alignSelf="center" borderBottomWidth={1} p={1}>
        <Text fontSize="sm" as="b" p={1}>
          {datos.ventas.digital.toLocaleString("es-PY")}
        </Text>
      </GridItem>
      <GridItem bgColor="#fde1ff" p={1} alignSelf="center">
        <Text fontSize="sm" as="b">
          {datos.ventas.total.toLocaleString("es-PY", {
            style: "currency",
            currency: "PYG",
            minimumFractionDigits: 0, // Opcional, para evitar decimales si no los necesitas
          })}
        </Text>
      </GridItem>
      <GridItem p={1} alignSelf="center">
        <Text fontSize="sm" as="b">
          {datos.ventas.anio.toLocaleString("es-PY", {
            style: "currency",
            currency: "PYG",
            minimumFractionDigits: 0, // Opcional, para evitar decimales si no los necesitas
          })}
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default Ventas;
