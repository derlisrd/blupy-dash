import useClientePassword from "@/core/hooks/clientes/useClientePassword";
import { ClientesResults } from "@/services/dto/clientes/clientes";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, TextField, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function CambiarContrasena() {
  const location = useLocation();
  const navigate = useNavigate();
  const { password, setPassword, isPending, cambiar } = useClientePassword();
  const cliente = location.state?.cliente as ClientesResults;

  if (!cliente) return <p>No hay datos de cliente.</p>;

  return (
    <Dialog open={true} onClose={() => {}} fullWidth>
      <DialogTitle>Restablecer contraseña</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>{isPending && <LinearProgress />}</Grid>
          <Grid size={12}>
            <Alert severity="warning" variant="outlined">
              <Typography>Atención está a punto de cambiar la contraseña del usuario. Actuar con precaución</Typography>
            </Alert>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Typography>Cédula: </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 10 }}>
            <Typography>{cliente.cedula}</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Typography>Usuario: </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 10 }}>
            <Typography>
              {cliente.name} {cliente.user_id}
            </Typography>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Contraseña nueva"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Ingrese la contraseña nueva..."
              autoFocus
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            cambiar(cliente.user_id);
          }}
          disabled={isPending}
          variant="outlined"
          color="warning"
        >
          Cambiar
        </Button>
        <Button disabled={isPending} onClick={() => navigate(-1)}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CambiarContrasena;
