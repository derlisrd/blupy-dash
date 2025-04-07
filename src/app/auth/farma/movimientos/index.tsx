import useMovimientos from "@/core/hooks/farma/useMovimientos";
import { Button, Container, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";
import TableMovimientos from "./table.movimientos";

function Movimientos() {
  const { setCedula, setPeriodo, periodo, consultar, error, isPending, movimientos } = useMovimientos();

  return (
    <Container>
      <h3>Movimientos</h3>
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid size={12}>{isPending && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField label="Cedula" onChange={(e) => setCedula(e.target.value)} error={error.code === 1} helperText={error.message} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField label="Mes" type="month" value={periodo} onChange={(e) => setPeriodo(e.target.value)} error={error.code === 2} helperText={error.message} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Button onClick={consultar}>Consultar</Button>
        </Grid>
      </Grid>
      {movimientos.length > 0 && <TableMovimientos data={movimientos} />}
    </Container>
  );
}

export default Movimientos;
