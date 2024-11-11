import { Container, Grid, Text } from "@chakra-ui/react";
import useInformes from "./useInformes";
import Titles from "./titles";
import Registros from "./registros";
import TasaUso from "./tasauso";
import Share from "./share";
import CantidadTickets from "./cantidadtickets";
import Ventas from "./ventas";
import Vigentes from "./vigentes";

function InformesPage() {
  const { datos } = useInformes();
  return (
    <Container maxW="4xl">
      <Text fontSize="xl" as="b">
        INFORMES
      </Text>
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(5, 1fr)"]} gap={1}>
        <Titles />
        {/*DATOS */}
        <Ventas datos={datos} />
        {/*DATOS */}
        <Share datos={datos} />
        {/*DATOS */}
        {/*DATOS */}
        <TasaUso datos={datos} />
        {/*DATOS */}
        <CantidadTickets datos={datos} />
        {/*DATOS */}
        <Registros datos={datos} />
        {/*DATOS */}
        <Vigentes datos={datos} />
      </Grid>
    </Container>
  );
}

export default InformesPage;
