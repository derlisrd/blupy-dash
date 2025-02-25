import { Card, Container, Typography, Grid2 as Grid, CardContent } from "@mui/material";

function Home() {
  return (
    <Container>
      <h3>Hola Administrador !</h3>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: "background.negroFoco" }}>
            <CardContent>
              <Typography variant="overline" color="white">
                Registros hoy
              </Typography>
              <Typography variant="h4" color="white">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: "white" }}>
            <CardContent>
              <Typography variant="overline" color="primary">
                Registros semana
              </Typography>
              <Typography variant="h4" color="primary">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: "white" }}>
            <CardContent>
              <Typography variant="overline" color="primary">
                Registros mes
              </Typography>
              <Typography variant="h4" color="primary">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: "white" }}>
            <CardContent>
              <Typography variant="overline" color="primary">
                Total
              </Typography>
              <Typography variant="h4" color="primary">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="overline">Solicitudes hoy</Typography>
              <Typography variant="h4">10</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: "white" }}>
            <CardContent>
              <Typography variant="overline" color="primary">
                Registros semana
              </Typography>
              <Typography variant="h4" color="primary">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: "white" }}>
            <CardContent>
              <Typography variant="overline" color="primary">
                Registros mes
              </Typography>
              <Typography variant="h4" color="primary">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card sx={{ bgcolor: "white" }}>
            <CardContent>
              <Typography variant="overline" color="primary">
                Total
              </Typography>
              <Typography variant="h4" color="primary">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
