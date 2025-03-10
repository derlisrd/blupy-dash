import Icon from "@/components/ui/icon";
import { config } from "@/constants/config";
import useContratoCodigo from "@/core/hooks/contrato/useContratoCodigo";
import { Alert, Button, Card, CardContent, CardMedia, Container, Grid2 as Grid, InputAdornment, LinearProgress, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";

function ContratoPorCodigo() {
  const [search, setSearch] = useState("");
  const { isPending, buscar, dataBuscar, aprobar } = useContratoCodigo();

  return (
    <Container>
      <h3>Consulta de firma de contrato por código</h3>
      <Grid container p={1.5} spacing={1} alignItems="center">
        <Grid size={12}>{isPending && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Ingrese código de contrato"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon size={18}>search</Icon>
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Ingrese código de contrato"
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
      {dataBuscar && dataBuscar.cliente && (
        <Grid container rowSpacing={2} columnSpacing={1} p={1.5}>
          <Grid size={12}>
            <Typography variant="h6">Estado de contrato</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            {dataBuscar && dataBuscar.cliente?.estado_id === 5 && <Alert severity="info"> El contrato se encuentra pendiente de activación</Alert>}
            {dataBuscar && dataBuscar.cliente?.estado_id === 7 && <Alert severity="success"> El contrato se encuentra vigente</Alert>}
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            {dataBuscar.cliente?.estado_id === 5 && (
              <Button
                onClick={() => {
                  aprobar(dataBuscar.cliente?.codigo ?? "");
                }}
              >
                Aprobar
              </Button>
            )}
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardMedia image={`${config.PATH_IMAGE}${dataBuscar.cliente?.imagenCedula}`} sx={{ height: 256 }} title="Imagen de cedula" />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardMedia image={`${config.PATH_IMAGE}${dataBuscar.cliente?.selfie}`} sx={{ height: 256 }} title="Imagen de cedula" />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            {dataBuscar.cliente && (
              <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                <CardContent>
                  <Grid container rowSpacing={1}>
                    <Grid size={12}>
                      <Typography variant="caption">Cedula</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {dataBuscar.cliente?.cedula}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Typography variant="caption">Estado contrato</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {dataBuscar.cliente?.estado}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Typography variant="caption">Nombre</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {dataBuscar.cliente?.nombre}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Typography variant="caption">Celular</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {dataBuscar.cliente?.celular}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Typography variant="caption">Fecha de solicitud</Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {dataBuscar.cliente?.fechaSolicitud}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Grid>
          {dataBuscar.contratos?.map((item, i) => (
            <Fragment key={i}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Estado Farma</Typography>
                    <Typography variant="body1">{item.estadoContrato}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Usuario impresor</Typography>
                    <Typography variant="body1">{item.usuarioImpresor}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Sucursal</Typography>
                    <Typography variant="body1">{item.sucursal}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Codigo de contrato</Typography>
                    <Typography variant="body1">{item.codigoContrato}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Fecha de impresión</Typography>
                    <Typography variant="body1">{item.fechaImpresion}</Typography>
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

export default ContratoPorCodigo;
