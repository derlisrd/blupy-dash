import useVentasActualizaciones from "@/core/hooks/actualizaciones/useVentasActualizaciones";
import { Button, Container, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";

function VentasFecha() {
  const { fecha, setFecha, isPending, enviar } = useVentasActualizaciones();

  return (
    <Container>
      <h3>Actualizaciones de ventas</h3>
      <Grid container spacing={2} alignItems={"center"}>
        <Grid size={12}>{isPending && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField type="date" fullWidth onChange={(e) => setFecha(e.target.value)} value={fecha} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Button onClick={() => enviar()}>Enviar</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default VentasFecha;
