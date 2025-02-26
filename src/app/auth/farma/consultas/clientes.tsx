import { Button, Container, Grid2 as Grid, Icon, InputAdornment, TextField } from "@mui/material";

function ClientesFarma() {
  return (
    <Container>
      <h3>Consulta de clientes de farma</h3>

      <Grid container p={1.5} spacing={1} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
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
            onChange={() => {}}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Button>Consultar</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ClientesFarma;
