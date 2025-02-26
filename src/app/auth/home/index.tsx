import useHome from "@/core/hooks/home/useHome";
import { useAuth } from "@/hooks/useAuth";
import { Card, Container, Typography, Grid2 as Grid, CardContent, LinearProgress } from "@mui/material";

function Home() {
  const { info, isLoading } = useHome();
  const { userData } = useAuth();

  return (
    <Container>
      <h3>Hola {userData && userData.name} !</h3>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ bgcolor: "primary.light", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="overline" color="white">
                  Registros hoy
                </Typography>
                <Typography variant="h4" color="white">
                  {info?.registrosHoy}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ bgcolor: "primary.contrastText", boxShadow: 3 }}>
              <CardContent>
                <Typography variant="overline" color="primary">
                  Registros semana
                </Typography>
                <Typography variant="h4" color="primary">
                  {info?.registrosSemana}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="overline" color="primary">
                  Registros de mes
                </Typography>
                <Typography variant="h4" color="primary">
                  {info?.registrosMes}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ bgcolor: "white", boxShadow: 5 }}>
              <CardContent>
                <Typography variant="overline" color="primary">
                  Total Registros
                </Typography>
                <Typography variant="h4" color="primary">
                  {info?.registrosTotales}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Home;
