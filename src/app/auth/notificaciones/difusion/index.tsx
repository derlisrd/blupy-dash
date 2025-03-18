import useSendPushDifusion from "@/core/hooks/notificaciones/useSendPushDifusion";
import { Container } from "@mui/material";
import { Button, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";
function NotificacionDifusion() {
  const { isPending, sendPush, title, body, setBody, setTitle } = useSendPushDifusion();
  return (
    <Container>
      <h3>Notificaciones masivas o difusión</h3>
      <Container maxWidth="sm">
        <Grid container spacing={3} mt={1}>
          <Grid size={12}>{isPending && <LinearProgress />}</Grid>
          <Grid size={12}>
            <TextField label="Título" autoFocus fullWidth disabled={isPending} onChange={({ target }) => setTitle(target.value)} value={title} />
          </Grid>
          <Grid size={12}>
            <TextField label="Texto" fullWidth disabled={isPending} onChange={({ target }) => setBody(target.value)} value={body} />
          </Grid>
          <Grid size={12}>
            <Button disabled={isPending} onClick={() => sendPush()}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}

export default NotificacionDifusion;
