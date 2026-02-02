import Icon from "@/components/ui/icon";
import FichaCard from "@/core/components/farma/fichaCard";
import useClienteFarma from "@/core/hooks/farma/useClienteFarma";
import { format } from "@formkit/tempo";
import {
  Button, Card, CardContent, Container, Grid2 as Grid,
  InputAdornment, LinearProgress, TextField, Typography,
  Box, Divider, Paper, Stack
} from "@mui/material";
import { useState } from "react";

function FichaClienteFarma() {
  const [search, setSearch] = useState("");
  const { isPending, datos, buscar } = useClienteFarma();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header y Buscador */}
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: 'primary.main', color: 'white', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Portal de Clientes Farma
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
          Consulta líneas de crédito, deudas y beneficios de alianzas.
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, sm: 8, md: 6 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ingrese cédula del cliente..."
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              onKeyUp={({ key }) => key === "Enter" && buscar(search)}
              sx={{
                bgcolor: 'white',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': { borderRadius: 2 }
              }}
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
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
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
          {/* SECCIÓN MICREDITO */}
          {datos.micredito && (
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Icon color="primary">credit-card</Icon>
                <Typography variant="h5" fontWeight="bold">Ficha Micredito</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FichaCard title="Nombre del Titular" subtitle={datos.micredito.nombre} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper sx={{ p: 2, borderLeft: '5px solid', borderColor: 'success.main', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Línea de Crédito</Typography>
                    <Typography variant="h6" color="success.main" fontWeight="bold">
                      {datos.micredito.linea.toLocaleString("es-PY", { style: "currency", currency: "PYG" })}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper sx={{ p: 2, borderLeft: '5px solid', borderColor: 'error.main', borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Deuda Total</Typography>
                    <Typography variant="h6" color="error.main" fontWeight="bold">
                      {datos.micredito.deuda.toLocaleString("es-PY", { style: "currency", currency: "PYG" })}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FichaCard title="Pago Mínimo" subtitle={datos.micredito.pagoMinimo.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
                </Grid>
              </Grid>
            </Box>
          )}

          <Divider />

          {/* SECCIÓN FARMA */}
          {datos.farma && (
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Icon color="primary">first-aid-kit</Icon>
                <Typography variant="h5" fontWeight="bold">Ficha Farma</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FichaCard title="Saldo Disponible" subtitle={datos.farma.saldoDisponible.toLocaleString()} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <FichaCard title="Pendiente de Cobro" subtitle={datos.farma.pendiente.toLocaleString()} />
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Typography variant="caption">¿Es Funcionario?</Typography>
                    <Box mt={1}>
                      <Chip
                        label={datos.farma.esFuncionario ? "SÍ" : "NO"}
                        color={datos.farma.esFuncionario ? 'success' : 'warning'}
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              {/* ALIANZAS - Diseño tipo lista */}
              {datos.farma.alianzas && datos.farma.alianzas.length > 0 && (
                <Box mt={4}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={2}>Alianzas Activas</Typography>
                  <Grid container spacing={2}>
                    {datos.farma.alianzas.map((item, key) => (
                      <Grid size={{ xs: 12, md: 6 }} key={key}>
                        <Card variant="outlined" sx={{ borderRadius: 3 }}>
                          <CardContent>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                              <Box>
                                <Typography variant="h6">{item.alianza}</Typography>
                                <Typography variant="caption" color="text.secondary">Código: {item.codigo}</Typography>
                              </Box>
                              <Box textAlign="right">
                                <Typography variant="body2" fontWeight="bold">{item.formaPago}</Typography>
                                <Typography variant="caption" display="block">
                                  Vence: {item.vencimiento ? format(item.vencimiento) : "31/12/2070"}
                                </Typography>
                              </Box>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          )}
        </Stack>
      )}
    </Container>
  );
}

// Pequeño componente Chip para estados internos
const Chip = ({ label, color }: { label: string, color: any }) => (
  <Box sx={{
    display: 'inline-block',
    px: 2, py: 0.5,
    borderRadius: 5,
    fontSize: '0.75rem',
    fontWeight: 'bold',
    bgcolor: `${color}.main`,
    color: 'white'
  }}>
    {label}
  </Box>
);

export default FichaClienteFarma;