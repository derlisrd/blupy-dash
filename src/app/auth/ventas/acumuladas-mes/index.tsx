import { fechas } from "@/constants/fechas";
import { utils } from "@/core/helpers/utils";
import { useVentasAcumuladasMes } from "@/core/hooks/ventas/useVentasAcumuladasMes";

import { Button, Container, FormControl, Grid2 as Grid, InputLabel, LinearProgress, MenuItem, Select } from "@mui/material";
import ResultadosVentas from "./resultados.ventas";

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
              {utils.getYearsRange().map((year) => (
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
        {data && <ResultadosVentas data={data} periodo={`${year}-${month}`} />}
      </Grid>
    </Container>
  );
}

export default VentasAcumuladasMes;
