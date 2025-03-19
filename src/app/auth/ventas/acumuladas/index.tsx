import FichaCard from "@/components/common/fichaCard";
import { utils } from "@/core/helpers/utils";
import { useVentasAcumuladas } from "@/core/hooks/ventas/useVentasAcumuladas";
import { Container, Grid2 as Grid, LinearProgress } from "@mui/material";
import { Fragment } from "react";

function VentasAcumuladas() {
  const { isLoading, data } = useVentasAcumuladas();
  return (
    <Container>
      <h3>Ventas acumuladas</h3>
      <Grid container spacing={2}>
        <Grid size={12}>{isLoading && <LinearProgress />}</Grid>

        {data && (
          <Fragment>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <FichaCard title="Totales" bold subtitle={utils.formatPYG(data.total)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy Digital" bold subtitle={utils.formatPYG(data.blupyDigital)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy Funcionarios" bold subtitle={utils.formatPYG(data.blupy1DiaFuncionarios)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy Alianzas" bold subtitle={utils.formatPYG(data.blupy1DiaAlianzas)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy 3 cuotas" bold subtitle={utils.formatPYG(data.blupy3Cuotas)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy 3 cuotas alianzas" bold subtitle={utils.formatPYG(data.blupy3CuotasAso)} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy 4 cuotas alianzas" bold subtitle={utils.formatPYG(data.blupy4CuotasAso)} />
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Container>
  );
}

export default VentasAcumuladas;
