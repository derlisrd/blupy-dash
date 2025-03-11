import FichaCard from "@/components/common/fichaCard";
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
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Totales" bold subtitle={data.total.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy Digital" bold subtitle={data.blupyDigital.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy Funcionarios" bold subtitle={data.blupy1DiaFuncionarios.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy Alianzas" bold subtitle={data.blupy1DiaAlianzas.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy 3 cuotas" bold subtitle={data.blupy3Cuotas.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy 3 cuotas alianzas" bold subtitle={data.blupy3CuotasAso.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FichaCard title="Blupy 4 cuotas alianzas" bold subtitle={data.blupy4CuotasAso.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Container>
  );
}

export default VentasAcumuladas;
