import Icon from "@/components/ui/icon";
import { config } from "@/constants/config";
import useContratoConsulta from "@/core/hooks/consultas/useContratoConsulta";
import { Button, Card, CardContent, CardMedia, Container, Grid2 as Grid, InputAdornment, LinearProgress, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";

function ContratoPorDocumento() {
  const [search, setSearch] = useState("");
  const { isPending, buscar, datos } = useContratoConsulta();

  return (
    <Container>
      <h3>Consulta de firma de contrato</h3>
      <Grid container p={1.5} spacing={1} alignItems="center">
        <Grid size={12}>{isPending && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon size={18}>search</Icon>
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Ingresar cedula..."
            onChange={({ target }) => {
              setSearch(target.value);
            }}
            onKeyUp={({ key }) => {
              if (key === "Enter") buscar(search);
            }}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button onClick={() => buscar(search)}>Consultar</Button>
        </Grid>
      </Grid>
      {datos && (
        <Grid container rowSpacing={2} columnSpacing={1} p={1.5}>
          <Grid size={12}>
            <Typography variant="h6">Estado de contrato</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardMedia image={`${config.PATH_IMAGE}${datos.cliente?.imagenCedula}`} sx={{ height: 256 }} title="Imagen de cedula" />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardMedia image={`${config.PATH_IMAGE}${datos.cliente?.selfie}`} sx={{ height: 256 }} title="Imagen de cedula" />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Grid container rowSpacing={4}>
                  <Grid size={12}>
                    <Typography variant="caption">Cedula</Typography>
                    <Typography variant="body1">{datos.cliente?.cedula}</Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="caption">Nombre</Typography>
                    <Typography variant="body1">{datos.cliente?.nombre}</Typography>
                  </Grid>
                  <Grid size={12}>
                    <Typography variant="caption">Celular</Typography>
                    <Typography variant="body1">{datos.cliente?.celular}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {datos.contratos?.map((item, i) => (
            <Fragment key={i}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Estado</Typography>
                    <Typography variant="body1">{item.estadoContrato}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Usuario impresor</Typography>
                    <Typography variant="body1">{item.usuarioImpresor}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Sucursal</Typography>
                    <Typography variant="body1">{item.sucursal}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Codigo de contrato</Typography>
                    <Typography variant="body1">{item.codigoContrato}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ContratoPorDocumento;
