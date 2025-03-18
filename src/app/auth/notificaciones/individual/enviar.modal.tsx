import useSendPushIndividual from "@/core/hooks/notificaciones/useSendPushIndividual";
import { UserDevice } from "@/services/dto/notificaciones/ficha";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";

interface EnviarModalProps {
  open: boolean;
  device: UserDevice | null;
  onClose: () => void;
}

function EnviarModal({ open, device, onClose }: EnviarModalProps) {
  const { isPending, sendPush, setTitle, setBody, title, body } = useSendPushIndividual();

  const enviarNotificacion = () => {
    if (device) {
      sendPush(device.id);
      onClose();
    }
  };

  if (!device) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enviar Notificación</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid size={12}>{isPending && <LinearProgress />}</Grid>
          <Grid size={12}>
            {device.os} {device.dispositivo}
          </Grid>
          <Grid size={12}>
            <TextField label="Título" autoFocus value={title} fullWidth onChange={({ target }) => setTitle(target.value)} />
          </Grid>
          <Grid size={12}>
            <TextField label="Descripción" value={body} fullWidth onChange={({ target }) => setBody(target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={enviarNotificacion}>Enviar</Button>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EnviarModal;
