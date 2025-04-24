import useSendSMS from "@/core/hooks/notificaciones/useSendSMS";
import { Container, Grid2 as Grid, TextField, Button, LinearProgress } from "@mui/material";

function Sms() {
  const { isPending, sendSms, text, setText, number, setNumber } = useSendSMS();

  return (
    <Container>
      <h3>Enviar SMS</h3>
      <Container maxWidth="sm">
        <Grid container spacing={3} mt={1}>
          <Grid size={12}>{isPending && <LinearProgress />}</Grid>
          <Grid size={12}>
            <TextField label="Número" autoFocus autoComplete="off" fullWidth disabled={isPending} onChange={({ target }) => setNumber(target.value)} value={number} />
          </Grid>
          <Grid size={12}>
            <TextField label="Texto" fullWidth disabled={isPending} onChange={({ target }) => setText(target.value)} value={text} />
          </Grid>
          <Grid size={12}>
            <Button disabled={isPending} onClick={() => sendSms()}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
export default Sms;
