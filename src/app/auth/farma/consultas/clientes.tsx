import useClienteConsulta from "@/core/hooks/consultas/useClienteConsulta";
import { Button, Container, Grid2 as Grid, Icon, InputAdornment, LinearProgress, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";

function ClientesFarma() {
  const [search, setSearch] = useState("");
  const { isPending, datos, buscar } = useClienteConsulta();

  return (
    <Container>
      <h3>Consulta de clientes de farma</h3>
      <Grid container p={1.5} spacing={1} alignItems="center">
        <Grid size={12}>{isPending && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Ingresar cedula..."
            onChange={({ target }) => {
              setSearch(target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Button onClick={() => buscar(search)}>Consultar</Button>
        </Grid>
        {datos && datos.farma && (
          <Fragment>
            <Grid size={12}>
              <Typography variant="h6">Farma</Typography>
            </Grid>
            <Grid size={12}>
              <h2>{search}</h2>
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Container>
  );
}

export default ClientesFarma;
