import { Container, Grid2 as Grid, Icon, InputAdornment, TextField } from "@mui/material";

function ClientesFarma() {
  return (
    <Container>
      <h3>Consulta de clientes de farma</h3>

      <Grid container p={1.5} spacing={0}>
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
            placeholder="Buscar..."
            onChange={() => {}}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}></Grid>
      </Grid>
    </Container>
  );
}

export default ClientesFarma;
