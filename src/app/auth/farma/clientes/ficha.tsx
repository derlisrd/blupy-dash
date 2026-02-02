import Icon from "@/components/ui/icon";
import FichaCard from "@/core/components/farma/fichaCard";
import useClienteFarma from "@/core/hooks/farma/useClienteFarma";
import { format } from "@formkit/tempo";
import {
  Button, Card, CardContent, Container, Grid2 as Grid,
  InputAdornment, LinearProgress, TextField, Typography,
  Box, Divider, Paper, Stack, Avatar, Chip
} from "@mui/material";
import { useState } from "react";

function FichaClienteFarma() {
  const [search, setSearch] = useState("");
  const { isPending, datos, buscar } = useClienteFarma();

  // Helper para moneda
  const toPYG = (val: number | null | undefined) =>
    (val || 0).toLocaleString("es-PY", { style: "currency", currency: "PYG" });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header y Buscador */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 }, borderRadius: 4, bgcolor: 'primary.main', color: 'white', mb: 4,
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.15)'
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>Consulta de Clientes Farma</Typography>
        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
          Gestión de créditos, deudas y beneficios del cliente.
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <TextField
              fullWidth
              placeholder="Ingresar cédula..."
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              onKeyUp={({ key }) => key === "Enter" && buscar(search)}
              sx={{ bgcolor: 'white', borderRadius: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon color="action">search</Icon>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, md: 2 }}>
            <Button
              fullWidth variant="contained" color="secondary" size="large"
              onClick={() => buscar(search)}
              disabled={isPending}
              sx={{ height: 56, borderRadius: 2, fontWeight: 'bold' }}
            >
              {isPending ? "Buscando..." : "Consultar"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {isPending && <LinearProgress sx={{ mb: 4, borderRadius: 2 }} />}

      {datos && (
        <Stack spacing={4}>

          {/* SECCIÓN MICREDITO - Usando ConsultaClienteResultsMiCredito */}
          {datos.micredito && (
            <Box>
              <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
                <Avatar sx={{ bgcolor: 'primary.main' }}><Icon>credit-card</Icon></Avatar>
                <Typography variant="h5" fontWeight="bold">Ficha Cliente Micredito</Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FichaCard title="Nombre:" subtitle={datos.micredito.nombre} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper sx={{ p: 2, borderLeft: '5px solid', borderColor: 'success.main', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Linea:</Typography>
                    <Typography variant="h6" color="success.main" fontWeight="bold">{toPYG(datos.micredito.linea)}</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper sx={{ p: 2, borderLeft: '5px solid', borderColor: 'error.main', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Deuda:</Typography>
                    <Typography variant="h6" color="error.main" fontWeight="bold">{toPYG(datos.micredito.deuda)}</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FichaCard title="Mínimo:" subtitle={toPYG(datos.micredito.pagoMinimo)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FichaCard title="Cuenta:" subtitle={datos.micredito.cuenta} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FichaCard title="Número de tarjeta:" subtitle={datos.micredito.numeroTarjeta} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FichaCard
                    title="Vencimiento:"
                    subtitle={datos.micredito.fechaVencimiento !== "0000-00-00" ? datos.micredito.fechaVencimiento : "Sin vencimiento"}
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          <Divider />

          {/* SECCIÓN FARMA - Usando ConsultaClienteResultsFarma */}
          {datos.farma && (
            <Box>
              <Stack direction="row" alignItems="center" spacing={1.5} mb={2}>
                <Avatar sx={{ bgcolor: 'success.main' }}><Icon>first-aid-kit</Icon></Avatar>
                <Typography variant="h5" fontWeight="bold">Ficha Cliente Farma</Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 2 }}>
                  <FichaCard title="Código:" subtitle={datos.farma.codigo} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FichaCard title="Nombre:" subtitle={datos.farma.nombre} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Card variant="outlined" sx={{ p: 1, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="caption" display="block">Funcionario</Typography>
                    <Chip label={datos.farma.esFuncionario ? "SÍ" : "NO"} color={datos.farma.esFuncionario ? "success" : "default"} size="small" />
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Card variant="outlined" sx={{ p: 1, textAlign: 'center', borderRadius: 2 }}>
                    <Typography variant="caption" display="block">Registro BluPy</Typography>
                    <Chip label={datos.registro ? "SÍ" : "NO"} color={datos.registro ? "info" : "default"} size="small" />
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 3 }}>
                  <FichaCard title="Crédito:" subtitle={toPYG(datos.farma.credito)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <FichaCard title="Crédito adicional:" subtitle={toPYG(datos.farma.creditoAdicional)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'success.contrastText', borderRadius: 2 }}>
                    <Typography variant="caption">Disponible:</Typography>
                    <Typography variant="h6" fontWeight="bold">{toPYG(datos.farma.saldoDisponible)}</Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Paper sx={{ p: 2, bgcolor: 'warning.light', color: 'warning.contrastText', borderRadius: 2 }}>
                    <Typography variant="caption">Deuda pendiente:</Typography>
                    <Typography variant="h6" fontWeight="bold">{toPYG(datos.farma.pendiente)}</Typography>
                  </Paper>
                </Grid>

                {/* ALIANZAS */}
                {datos.farma.alianzas?.map((item, key) => (
                  <Grid size={{ xs: 12, md: 6 }} key={key} mt={1}>
                    <Card variant="outlined" sx={{ borderRadius: 3, border: '1px solid #e0e0e0', position: 'relative', overflow: 'visible' }}>
                      <Box sx={{ position: 'absolute', top: -10, left: 15, bgcolor: 'white', px: 1 }}>
                        <Typography variant="caption" color="primary" fontWeight="bold">ALIANZA ACTIVA</Typography>
                      </Box>
                      <CardContent>
                        <Stack spacing={1}>
                          <Typography variant="h6" color="primary.main">{item.alianza}</Typography>
                          <Grid container spacing={1}>
                            <Grid size={6}><Typography variant="caption">Código: {item.codigo}</Typography></Grid>
                            <Grid size={6}><Typography variant="caption">Pago: {item.formaPago}</Typography></Grid>
                            <Grid size={12}>
                              <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
                                Vencimiento: <b>{item.vencimiento ? format(item.vencimiento, "D MMM YYYY", "es-PY") : "31 Dic 2070"}</b>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Stack>
      )}
    </Container>
  );
}

export default FichaClienteFarma;