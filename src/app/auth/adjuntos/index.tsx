import PageNotFound from "@/app/404";
import Icon from "@/components/ui/icon";
import { config } from "@/constants/config";
import useAdjuntos from "@/core/hooks/adjuntos/useAdjuntos";
import { Button, Container, Grid2 as Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

function Adjuntos() {
  const location = useLocation();
  const cliente = location.state?.cliente;



  const { isLoading, data } = useAdjuntos(String(cliente.id))


  if (!cliente) return <PageNotFound />


  return <Container>
    <Grid container spacing={2}>
      <Grid size={12}>
        {isLoading && <LinearProgress />}
      </Grid>
      <Grid size={12}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant="h6" display='block'>Adjuntos: {cliente.name}</Typography>
          <Typography variant="h6" display='block'> {cliente.cedula}</Typography>
          <Button
            startIcon={<Icon>photo-plus</Icon>}
            component={RouterLink} // Usa Link de React Router si estás navegando dentro de la app
            to={`/agregar-adjunto/${cliente.id}`}
          >
            Agregar
          </Button>
        </Stack>
      </Grid>
      {
        data && data.map((item, i) => (
          <Grid key={i} size={{ xs: 12, md: 4 }}>
            <Stack>
              <Typography variant="overline" fontSize={14}>{item.tipo}</Typography>
              <img src={`${config.PATH}/${item.path}/${item.nombre}`} alt={item.tipo} style={{ width: "320px", height: "280px", objectFit: "cover", maxWidth: "100%" }} />
            </Stack>
          </Grid>
        ))
      }
    </Grid>
  </Container>;
}

export default Adjuntos;
