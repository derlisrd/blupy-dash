import { config } from "@/constants/config";
import useAdjuntos from "@/core/hooks/adjuntos/useAdjuntos";
import { Button, Container, Grid2 as Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

function Adjuntos() {
  const location = useLocation();
  const cliente = location.state?.cliente;

  console.log(cliente);


  const { isLoading, data } = useAdjuntos(String(cliente.id))


  if (!cliente) return null;


  return <Container>
    <Grid container spacing={2}>
      <Grid size={12}>
        {isLoading && <LinearProgress />}
      </Grid>
      <Grid size={12}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant="h6">Adjuntos: {cliente.name}</Typography>
          <Button>Agregar adjunto</Button>
        </Stack>
      </Grid>
      {
        data && data.map((item, i) => (
          <Grid key={i} size={{ xs: 12, md: 6 }}>
            <Stack>
              <Typography variant="overline" fontSize={14}>{item.nombre}</Typography>
              <img src={`${config.PATH}${item.path}/${item.url}`} alt="selfie" style={{ width: "320px", height: "280px", objectFit: "cover", maxWidth: "100%" }} />
            </Stack>
          </Grid>
        ))
      }
    </Grid>
  </Container>;
}

export default Adjuntos;
