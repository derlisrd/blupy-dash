import { config } from "@/constants/config";
import { ClientesResults } from "@/services/dto/clientes/clientes";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, Icon, Typography } from "@mui/material";

interface FichaProps {
  open: boolean;
  onClose: () => void;
  fichaSeleccionada: ClientesResults | null;
}

function Ficha({ open, onClose, fichaSeleccionada }: FichaProps) {
  if (!fichaSeleccionada) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Ficha de cliente</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="overline" sx={{ textDecoration: "underline" }} display="block" fontSize={14}>
              Documento:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography variant="overline" fontSize={14}>
              {fichaSeleccionada.cedula}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography variant="overline" sx={{ textDecoration: "underline" }} display="block" fontSize={14}>
              Nombre completo:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography variant="overline" fontSize={14}>
              {fichaSeleccionada.name}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography display="block" variant="overline" fontSize={14}>
              Celular:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography variant="overline" fontSize={14}>
              {fichaSeleccionada.celular}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Typography display="block" variant="overline" fontSize={14}>
              Email:
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Typography variant="body1" fontSize={14}>
              {fichaSeleccionada.email}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            {fichaSeleccionada.selfie ? (
              <img src={`${config.PATH_IMAGE}${fichaSeleccionada.selfie}`} alt="selfie" style={{ width: "256px", height: "256px", objectFit: "cover" }} />
            ) : (
              <Icon>image</Icon>
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            {fichaSeleccionada.foto_ci_frente ? (
              <img src={`${config.PATH_IMAGE}${fichaSeleccionada.foto_ci_frente}`} alt="cedula frente" style={{ width: "256px", height: "256px", objectFit: "cover" }} />
            ) : (
              <Icon>image</Icon>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Ficha;
