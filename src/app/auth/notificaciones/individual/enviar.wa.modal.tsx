import Icon from "@/components/ui/icon";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, TextField, Typography } from "@mui/material";
import { useNotificationHook } from "./provider";
import useSendWa from "@/core/hooks/notificaciones/useSendWa";

function EnviarWaModal() {
  const { isPending, sendWa, setTitle, setBody, title, body, error, setError } = useSendWa();
  const { modals, handleModal, selectedDevice, cliente } = useNotificationHook();

  const enviarNotificacion = () => {
    if (!title || !body) {
      setError({ code: 1, message: "Todos los campos son obligatorios" });
      return;
    }
    setError({ code: 0, message: "" });
    if (selectedDevice) {
      if (cliente) {
        const nuevoNumero = cliente.celular.replace(/^0/, "595");
        sendWa(nuevoNumero);
      }
    }
  };

  const reclamarDeuda = () => {
    setTitle(`Estimado/a ` + cliente?.nombre);
    setBody("Recuerde que tiene una deuda pendiente en BLUPY, por favor realiza el pago para evitar inconvenientes en el futuro. Para mas información, contactar al 0985713544.");
  };

  const close = () => handleModal("wa");

  if (!selectedDevice) return null;
  return (
    <Dialog open={modals.wa} onClose={close} disableRestoreFocus fullWidth>
      <DialogTitle>Enviar whatsapp</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={12}>
            {error.code > 0 && <Alert severity="error">{error.message}</Alert>}
            {isPending && <LinearProgress />}
          </Grid>
          <Grid size={12}>
            <Typography variant="button">Para: {cliente && cliente.celular}</Typography>
          </Grid>
          <Grid size={12}>
            <TextField label="Título" required autoFocus value={title} fullWidth onChange={({ target }) => setTitle(target.value)} />
          </Grid>
          <Grid size={12}>
            <TextField label="Descripción..." value={body} fullWidth onChange={({ target }) => setBody(target.value)} rows={3} multiline />
          </Grid>
          <Grid size={12}>
            <Typography variant="button">Mensajes predefinidos:</Typography>
          </Grid>
          <Grid size={4}>
            <Button variant="outlined" onClick={reclamarDeuda} color="warning" size="small" fullWidth>
              Reclamar deuda
            </Button>
          </Grid>
          <Grid size={4}>
            <Button variant="outlined" color="info" size="small" fullWidth>
              30% Miércoles
            </Button>
          </Grid>
          <Grid size={4}>
            <Button variant="outlined" size="small" fullWidth>
              Contrato pendiente
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} startIcon={<Icon>arrow-narrow-left-dashed</Icon>} variant="outlined">
          Regresar
        </Button>
        <Button onClick={enviarNotificacion} endIcon={<Icon>brand-telegram</Icon>}>
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EnviarWaModal;
