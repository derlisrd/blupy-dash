import useMovimientos from "@/core/hooks/farma/useMovimientos";
import { Button, Container, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";
import TableMovimientos from "./table.movimientos";
import { DatePicker } from "@mui/x-date-pickers";

function Movimientos() {
  const { setCedula, setPeriodo, consultar, error, isPending, movimientos } = useMovimientos();

  return (
    <Container>
      <h3>Movimientos en Farma</h3>
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid size={12}>{isPending && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            label="Cedula"
            fullWidth
            onChange={(e) => setCedula(e.target.value)}
            disabled={isPending}
            error={error.code === 1}
            helperText={error.code === 1 && error.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <DatePicker
            views={["year", "month"]}
            openTo="month"
            onChange={(e) => e && setPeriodo(e.format("MM-YYYY"))}
            label="Periodo"
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Button size="large" onClick={consultar} disabled={isPending}>
            Consultar
          </Button>
        </Grid>
      </Grid>
      {movimientos.length > 0 && <TableMovimientos data={movimientos} />}
    </Container>
  );
}

export default Movimientos;
