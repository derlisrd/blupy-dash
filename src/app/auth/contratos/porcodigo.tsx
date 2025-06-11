import Icon from "@/components/ui/icon";
import { config } from "@/constants/config";
import useContratoCodigo from "@/core/hooks/contrato/useContratoCodigo";
import { format } from "@formkit/tempo";
import { Alert, Button, Card, CardContent, Container, Grid2 as Grid, InputAdornment, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

function ContratoPorCodigo() {
  const [search, setSearch] = useState("");
  const { isPending, buscar, dataBuscar, aprobar, recibir } = useContratoCodigo();
  const nav = useNavigate()
  return (
    <Container>
      <h3>Consulta de firma de contrato por código</h3>
      <Grid container p={1.5} spacing={2} alignItems="center">
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
          <Grid size={{ xs: 12, sm: 6 }}>
            {dataBuscar && dataBuscar.cliente?.estado_id === 5 && <Alert severity="info"> Pendiente de activación</Alert>}
            {dataBuscar && dataBuscar.cliente?.estado_id === 7 && <Alert severity="success"> Vigente</Alert>}
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
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
          {dataBuscar.adjuntos &&
            dataBuscar.adjuntos.map((item, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <a href={`${config.PATH}/${item.url}`} target="_blank" rel="noreferrer">
                  <img src={`${config.PATH}/${item.url}`} alt={item.nombre} style={{ width: "100%", maxWidth: "320px", borderRadius: "10px" }} />
                </a>
              </Grid>
            ))}
          <Grid size={12} />

          <Grid size={{ xs: 12, sm: 6, md: 8 }}>
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
                        {format(dataBuscar.cliente?.fechaSolicitud, "D MMM YYYY HH:mm", "es-PY")}
                      </Typography>
                    </Grid>
                    <Grid size={12}>
                      <Button sx={{ mx: 1 }} onClick={() => nav(`/agregar-adjunto/${dataBuscar.cliente?.id}`)} endIcon={<Icon>file</Icon>}>
                        Adjuntar
                      </Button>
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
                    <Stack spacing={2} alignItems='end'>
                      <Typography variant="caption">Estado Farma</Typography>
                      <Typography variant="body1">{item.estadoContrato}</Typography>
                      <Button disabled={item.estadoContrato == "RECI" || isPending} onClick={() => recibir(item.codigoContrato)} endIcon={<Icon>check</Icon>}>
                        Confimar recepción
                      </Button>
                    </Stack>
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
                    <Typography variant="body1">{format(item.fechaImpresion, "D MMM YYYY HH:mm", "es-PY")}</Typography>
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
