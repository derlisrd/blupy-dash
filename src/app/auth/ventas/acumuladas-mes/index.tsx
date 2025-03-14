import FichaCard from "@/components/common/fichaCard";
import { fechas } from "@/constants/fechas";
import { useVentasAcumuladasMes } from "@/core/hooks/ventas/useVentasAcumuladasMes";

import { Button, Container, FormControl, Grid2 as Grid, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material";
import { Fragment } from "react";

function VentasAcumuladasMes() {
  const { isLoading, data, setYear, year, month, setMonth, filtrar } = useVentasAcumuladasMes();
  return (
    <Container>
      <h3>Ventas acumuladas del Mes</h3>
      <Grid container spacing={2}>
        <Grid size={12}>{isLoading && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 3, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Mes</InputLabel>
            <Select value={month} label="Año" onChange={(event) => setMonth(event.target.value)}>
              {fechas.months().map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 3, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Año</InputLabel>
            <Select value={year} label="Año" onChange={(event) => setYear(event.target.value)}>
              {fechas.getYearsRange().map((year) => (
                <MenuItem key={year.value} value={year.value}>
                  {year.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Button onClick={() => filtrar()}>Filtrar</Button>
        </Grid>
        {data && (
          <Fragment>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
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

export default VentasAcumuladasMes;
