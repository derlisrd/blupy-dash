import Icon from "@/components/ui/icon";
import useNotificaIndividual from "@/core/hooks/notificaciones/useNotificacionIndividual";
import { Button, Card, CardContent, Container, Grid2 as Grid, InputAdornment, LinearProgress, TextField, Typography } from "@mui/material";
import DevicesTable from "./devices.table";
import EnviarModal from "./enviar.modal";

function Individual() {
  const { setSearch, search, buscarFicha, cliente, isPending, selectedDevice, handleSelectedDevice, setSelectedDevice } = useNotificaIndividual();

  return (
    <Container>
      <h3>Notificación Individual</h3>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>{isPending && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Ingrese nro de cédula"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon size={18}>search</Icon>
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Ingrese nro de cédula"
            onChange={({ target }) => {
              setSearch(target.value);
            }}
            onKeyUp={({ key }) => {
              if (key === "Enter") buscarFicha(search);
            }}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button onClick={() => buscarFicha(search)}>Buscar</Button>
        </Grid>
      </Grid>

      {cliente && (
        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Nombre:</Typography>
                <Typography variant="body1">{cliente.nombre}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Correo:</Typography>
                <Typography variant="body1">{cliente.email}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Cliente ID:</Typography>
                <Typography variant="body1">{cliente.cliente_id}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">User ID:</Typography>
                <Typography variant="body1">{cliente.user_id}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Cedula:</Typography>
                <Typography variant="body1">{cliente.cedula}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Teléfono:</Typography>
                <Typography variant="body1">{cliente.celular}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {cliente.devices && (
            <Grid size={{ xs: 12 }}>
              <DevicesTable items={cliente.devices} onSelected={handleSelectedDevice} />
            </Grid>
          )}
        </Grid>
      )}
      <EnviarModal
        open={selectedDevice ? true : false}
        device={selectedDevice}
        onClose={() => {
          setSelectedDevice(null);
        }}
      />
    </Container>
  );
}

export default Individual;
