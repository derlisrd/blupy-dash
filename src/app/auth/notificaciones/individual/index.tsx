import Icon from "@/components/ui/icon";
import useNotificaIndividual from "@/core/hooks/notificaciones/useNotificacionIndividual";
import { Button, Container, Grid2 as Grid, InputAdornment, LinearProgress, TextField } from "@mui/material";

import EnviarModal from "./enviar.modal";
import FichaCliente from "./ficha.cliente";
import DevicesTable from "./devices.table";

function Individual() {
  const { setSearch, search, buscarFicha, cliente, isPending, selectedDevice, handleSelectedDevice, setSelectedDevice } = useNotificaIndividual();

  return (
    <Container>
      <h3>Notificación Individual</h3>
      <Grid container spacing={2} alignItems="center">
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

      {cliente && <FichaCliente cliente={cliente} />}
      {cliente && cliente.devices && <DevicesTable items={cliente.devices} onSelected={handleSelectedDevice} />}

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
