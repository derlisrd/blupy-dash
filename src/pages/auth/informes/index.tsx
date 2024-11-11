import { Container, Grid, GridItem, Text } from "@chakra-ui/react";
import useInformes from "./useInformes";
import Titles from "./titles";
import Registros from "./registros";
import TasaUso from "./tasauso";
import Share from "./share";

function InformesPage() {
  const { datos } = useInformes();
  return (
    <Container maxW="4xl">
      <Text fontSize="xl" as="b">
        INFORMES
      </Text>
      <Grid templateColumns="repeat(5,1fr)" gap={1}>
        <Titles />
        {/*DATOS */}
        <GridItem bgColor="#ededed" padding={1} borderRadius={2}>
          <Text fontSize="md" as="b" align="center">
            Ventas
          </Text>
        </GridItem>
        <GridItem alignItems="center">
          <Text fontSize="sm" as="b" p={1}>
            {datos.ventas.farma.toLocaleString("es-PY")}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" as="b" p={1}>
            {datos.ventas.alianzas.toLocaleString("es-PY")}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="sm" as="b" p={1}>
            {datos.ventas.digital.toLocaleString("es-PY")}
          </Text>
        </GridItem>
        <GridItem bgColor="#fde1ff" p={1}>
          <Text fontSize="sm" as="b">
            {datos.ventas.total.toLocaleString("es-PY")}
          </Text>
        </GridItem>
        {/*DATOS */}
        <Share datos={datos} />
        {/*DATOS */}
        <GridItem bgColor="#ededed" padding={1} borderRadius={2}>
          <Text fontSize="md" as="b">
            Uso
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="md" as="b">
            Uso
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="md" as="b">
            Uso
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="md" as="b">
            Uso
          </Text>
        </GridItem>
        <GridItem bgColor="#fde1ff" p={1}>
          <Text fontSize="md" as="b">
            Uso
          </Text>
        </GridItem>
        {/*DATOS */}
        <TasaUso datos={datos} />
        {/*DATOS */}
        <GridItem bgColor="#ededed" padding={1} borderRadius={2}>
          <Text fontSize="md" as="b">
            Cant. tickets
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="md" as="b">
            {datos.cantidadTickets.farma.toLocaleString("es-PY")}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="md" as="b">
            {datos.cantidadTickets.alianzas.toLocaleString("es-PY")}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="md" as="b">
            {datos.cantidadTickets.digital.toLocaleString("es-PY")}
          </Text>
        </GridItem>
        <GridItem bgColor="#fde1ff" p={1}>
          <Text fontSize="md" as="b">
            {datos.cantidadTickets.total.toLocaleString("es-PY")}
          </Text>
        </GridItem>
        {/*DATOS */}
        <GridItem bgColor="#ededed" padding={1} borderRadius={2}>
          <Text fontSize="md" as="b">
            Tickets prom.
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="md" as="b">
            t
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="md" as="b">
            t
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="md" as="b">
            t
          </Text>
        </GridItem>
        <GridItem bgColor="#fde1ff" p={1}>
          <Text fontSize="md" as="b">
            t
          </Text>
        </GridItem>
        {/*DATOS */}
        <Registros datos={datos} />
      </Grid>
    </Container>
  );
}

export default InformesPage;
