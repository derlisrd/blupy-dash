import Icon from "@/components/ui/icon";
import useNotificaIndividual from "@/core/hooks/notificaciones/useNotificacionIndividual";
import { Button, Container, Grid2 as Grid, InputAdornment, LinearProgress, TextField } from "@mui/material";
import DevicesTable from "./devices.table";
import EnviarModal from "./enviar.modal";
import CardCliente from "./card.cliente";

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
            <CardCliente title="Nombre" descripcion={cliente.nombre} />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CardCliente title="Correo" descripcion={cliente.email} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCliente title="Cliente ID:" descripcion={String(cliente.cliente_id)} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCliente title="User ID:" descripcion={String(cliente.user_id)} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCliente title="Cédula" descripcion={cliente.cedula} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCliente title="Telefono:" descripcion={cliente.celular} />
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
