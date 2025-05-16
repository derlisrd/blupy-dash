import { Container, Grid2 as Grid, TextField, InputAdornment, LinearProgress, Button } from "@mui/material";

import Icon from "@/components/ui/icon";
import FichaCliente from "./ficha.cliente";
import DevicesTable from "./devices.table";
import { useNotificationHook } from "./provider";
import { useState } from "react";

function MainNotificaciontIndividual() {
  const { isPending, buscarFicha, cliente } = useNotificationHook();
  const [search, setSearch] = useState("");

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
      {cliente && cliente.devices && <DevicesTable items={cliente.devices} />}
    </Container>
  );
}

export default MainNotificaciontIndividual;
