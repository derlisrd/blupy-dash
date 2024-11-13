import { Container, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import useInformes from "./useInformes";
import Titles from "./titles";
import Registros from "./registros";
import TasaUso from "./tasauso";
import Share from "./share";
import CantidadTickets from "./cantidadtickets";
import Ventas from "./ventas";
import Vigentes from "./vigentes";
import LoadingDatas from "./loading";
import { Fragment } from "react";
import Rechazados from "./rechazados";
import PromedioTickets from "./promediotickets";

function InformesPage() {
  const { datos, loading, setPeriodo } = useInformes();
  return (
    <Container maxW="3xl">
      <Text fontSize="xl" as="b">
        INFORME MENSUAL
      </Text>
      <Grid my={4} gap={12} templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}>
        <GridItem alignSelf="center">
          <Input
            variant="unstyled"
            type="month"
            // value={`${periodo.getFullYear()}-${String(periodo.getMonth() + 1).padStart(2, "0")}`} // Formato yyyy-MM
            name="periodo"
            placeholder="Seleccionar mes"
            onChange={({ target }) => {
              const [year, month] = target.value.split("-");
              setPeriodo(new Date(parseInt(year), parseInt(month) - 1));
            }}
          />
        </GridItem>
      </Grid>
      <Grid templateColumns={["repeat(1, 1fr)", "repeat(6, 1fr)"]} gap={1}>
        <Titles />
        {loading ? (
          <LoadingDatas />
        ) : (
          <Fragment>
            <Ventas datos={datos} />

            <Share datos={datos} />

            <TasaUso datos={datos} />

            <CantidadTickets datos={datos} />
            <PromedioTickets datos={datos} />

            <Registros datos={datos} />
            <Vigentes datos={datos} />
            <Rechazados datos={datos} />
          </Fragment>
        )}
      </Grid>
    </Container>
  );
}

export default InformesPage;
