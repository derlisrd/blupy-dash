import { Container, Grid, GridItem, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useVentas } from "./provider";
import TopTickets from "./topTickets";
import TopIngresos from "./topIngresos";
import FormaPago from "./formaPago";
import CompararFechas from "./compararfechas";

function VentasPage() {
  const { loading } = useVentas();

  return (
    <Container maxW="7xl">
      <Text fontWeight="bold" as={"h1"} fontSize={20}>
        Estadisticas de ventas
      </Text>
      {loading ? (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <Grid templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
          <GridItem colSpan={3}>
            <CompararFechas />
          </GridItem>

          <GridItem>
            <TopTickets />
          </GridItem>
          <GridItem>
            <TopIngresos />
          </GridItem>
          <GridItem>
            <FormaPago />
          </GridItem>
        </Grid>
      )}
    </Container>
  );
}

export default VentasPage;
