import { ClientesResults } from "@/services/dto/clientes/clientes";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField, Typography } from "@mui/material";

interface FichaProps {
  open: boolean;
  onClose: () => void;
  fichaSeleccionada: ClientesResults | null;
}

function ContrasenaModal({ open, onClose, fichaSeleccionada }: FichaProps) {
  if (!fichaSeleccionada) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Restablecer contraseña</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Alert severity="warning" variant="outlined">
              <Typography>Atención está a punto de cambiar la contraseña del usuario. Actuar con precaución</Typography>
            </Alert>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Typography>Usuario: </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 10 }}>
            <Typography>
              {fichaSeleccionada.name} {fichaSeleccionada.user_id}
            </Typography>
          </Grid>
          <Grid size={12}>
            <TextField label="Contraseña" placeholder="Ingrese la contraseña nueva..." autoFocus variant="outlined" fullWidth />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="warning">
          Cambiar
        </Button>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ContrasenaModal;
