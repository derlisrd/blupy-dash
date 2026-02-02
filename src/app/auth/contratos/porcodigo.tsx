import Icon from "@/components/ui/icon";
import { config } from "@/constants/config";
import useContratoCodigo from "@/core/hooks/contrato/useContratoCodigo";
import { format } from "@formkit/tempo";
import {
  Alert, Button, Card, CardContent, Container, Grid2 as Grid,
  InputAdornment, LinearProgress, Stack, TextField, Typography,
  Box, Paper, Divider, Chip, Avatar
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ContratoPorCodigo() {
  const [search, setSearch] = useState("");
  const { isPending, buscar, dataBuscar, aprobar, recibir } = useContratoCodigo();
  const nav = useNavigate();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* SECCIÓN DE BÚSQUEDA */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#f8f9fa', borderRadius: 3, border: '1px solid #e0e0e0' }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Consulta de Contratos
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <TextField
              fullWidth
              label="Código de contrato"
              placeholder="Ej: CNT-12345"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              onKeyUp={({ key }) => key === "Enter" && buscar(search)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon size={20}>search</Icon>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={() => buscar(search)}
              sx={{ height: 56, borderRadius: 2 }}
            >
              Consultar
            </Button>
          </Grid>
          <Grid size={12}>{isPending && <LinearProgress sx={{ borderRadius: 1 }} />}</Grid>
        </Grid>
      </Paper>

      {dataBuscar && dataBuscar.cliente && (
        <Grid container spacing={3}>

          {/* COLUMNA IZQUIERDA: INFO CLIENTE Y ADJUNTOS */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
              <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Detalles del Cliente</Typography>
                <Chip
                  label={dataBuscar.cliente?.estado}
                  sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 'bold' }}
                />
              </Box>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">Nombre Completo</Typography>
                      <Typography variant="body1" fontWeight="bold">{dataBuscar.cliente?.nombre}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">Cédula</Typography>
                      <Typography variant="body1" fontWeight="bold">{dataBuscar.cliente?.cedula}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 3 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">Celular</Typography>
                      <Typography variant="body1" fontWeight="bold">{dataBuscar.cliente?.celular}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">Fecha de Solicitud</Typography>
                      <Typography variant="body1">
                        {format(dataBuscar.cliente?.fechaSolicitud, "D MMM YYYY HH:mm", "es-PY")}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} display="flex" alignItems="center" justifyContent="flex-end">
                    <Button
                      variant="outlined"
                      startIcon={<Icon>file-plus</Icon>}
                      onClick={() => nav(`/agregar-adjunto/${dataBuscar.cliente?.id}`)}
                    >
                      Nuevo Adjunto
                    </Button>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="subtitle2" gutterBottom fontWeight="bold">Documentos Adjuntos</Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  {dataBuscar.adjuntos?.map((item, i) => (
                    <Box key={i} sx={{ position: 'relative', '&:hover img': { filter: 'brightness(0.7)' } }}>
                      <a href={`${config.PATH}/${item.url}`} target="_blank" rel="noreferrer">
                        <img
                          src={`${config.PATH}/${item.url}`}
                          alt={item.nombre}
                          style={{ width: "120px", height: "120px", objectFit: 'cover', borderRadius: "12px", transition: '0.3s' }}
                        />
                      </a>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* COLUMNA DERECHA: ACCIONES Y ESTADO CONTRATO */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={3}>
              {/* Alertas de Estado */}
              {dataBuscar.cliente?.estado_id === 5 && (
                <Alert severity="info" variant="filled" sx={{ borderRadius: 2 }}>
                  <Typography variant="body2">Este contrato está <b>Pendiente de activación</b>.</Typography>
                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    sx={{ mt: 1, color: 'info.main', fontWeight: 'bold' }}
                    onClick={() => aprobar(dataBuscar.cliente?.codigo ?? "")}
                  >
                    Aprobar Ahora
                  </Button>
                </Alert>
              )}
              {dataBuscar.cliente?.estado_id === 7 && (
                <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>Contrato Vigente</Alert>
              )}

              {/* Detalle de Impresión */}
              {dataBuscar.contratos?.map((item, i) => (
                <Card key={i} sx={{ borderRadius: 3, border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Avatar sx={{ bgcolor: 'secondary.light', width: 32, height: 32 }}>
                        <Icon size={18}>printer</Icon>
                      </Avatar>
                      <Typography variant="subtitle1" fontWeight="bold">Información de Impresión</Typography>
                    </Box>
                    <Stack spacing={1.5}>
                      <DetailRow label="Código" value={item.codigoContrato} />
                      <DetailRow label="Sucursal" value={item.sucursal} />
                      <DetailRow label="Impresor" value={item.usuarioImpresor} />
                      <DetailRow label="Fecha" value={format(item.fechaImpresion, "D MMM YYYY HH:mm", "es-PY")} />
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Button
                      fullWidth
                      variant={item.estadoContrato === "RECI" ? "outlined" : "contained"}
                      disabled={item.estadoContrato === "RECI" || isPending}
                      onClick={() => recibir(item.codigoContrato)}
                      color="primary"
                    >
                      {item.estadoContrato === "RECI" ? "Recibido" : "Confirmar Recepción"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

// Componente auxiliar para filas de detalle
const DetailRow = ({ label, value }: { label: string, value: any }) => (
  <Box display="flex" justifyContent="space-between">
    <Typography variant="caption" color="text.secondary">{label}:</Typography>
    <Typography variant="body2" fontWeight="500">{value}</Typography>
  </Box>
);

export default ContratoPorCodigo;