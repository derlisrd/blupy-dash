import Icon from "@/components/ui/icon";
import useHome from "@/core/hooks/home/useHome";
import { useAuth } from "@/hooks/useAuth";
import {
  Card, Container, Typography, Grid2 as Grid,
  CardContent, LinearProgress, Box, Divider, Stack
} from "@mui/material";

function Home() {
  const { info, isLoading } = useHome();
  const { userData } = useAuth();

  const formatVal = (val: any) => val ?? 0;

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Typography variant="h4" fontWeight="800" color="primary.dark">
          Hola, {userData?.name || 'Usuario'}!
        </Typography>
        <Icon size={40}>ti-dumpling</Icon>
      </Box>

      {isLoading ? (
        <LinearProgress sx={{ borderRadius: 2, height: 8 }} />
      ) : (
        <Grid container spacing={3}>

          {/* --- SECCIÓN DE REGISTROS --- */}
          <Grid size={12}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon size={20}>users</Icon>
              <Typography variant="h6" fontWeight="bold">Estadísticas de Registro</Typography>
            </Stack>
          </Grid>

          {[
            { label: "Hoy", val: info?.registrosHoy, icon: "calendar-event", color: "primary.main" },
            { label: "Semana", val: info?.registrosSemana, icon: "calendar-stats", color: "primary.main" },
            { label: "Mes", val: info?.registrosMes, icon: "calendar-month", color: "primary.main" },
            { label: "Total Usuarios", val: info?.registrosTotales, icon: "users-group", color: "info.main" },
          ].map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="overline" color="text.secondary" fontWeight="bold">
                        {item.label}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" sx={{ color: item.color }}>
                        {formatVal(item.val)}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 1, bgcolor: 'action.hover', borderRadius: 2 }}>
                      <Icon size={28}>{item.icon}</Icon>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          <Grid size={12}><Divider sx={{ my: 2 }} /></Grid>

          {/* --- SECCIÓN DE SOLICITUDES --- */}
          <Grid size={12}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon size={20}>file-check</Icon>
              <Typography variant="h6" fontWeight="bold">Gestión de Solicitudes</Typography>
            </Stack>
          </Grid>

          {/* Card Destacada: Vigentes */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: "success.main", color: "white", borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
              <CardContent>
                <Box sx={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.2, color: 'white' }}>
                  <Icon size={120}>circle-check</Icon>
                </Box>
                <Typography variant="overline" sx={{ opacity: 0.9, fontWeight: 'bold' }}>Vigentes Mes</Typography>
                <Typography variant="h2" fontWeight="bold">{formatVal(info?.vigentesMes)}</Typography>
                <Typography variant="body2">Solicitudes aprobadas con éxito</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card Destacada: Pendientes */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: "warning.main", color: "white", borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
              <CardContent>
                <Box sx={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.2, color: 'white' }}>
                  <Icon size={120}>clock-hour-4</Icon>
                </Box>
                <Typography variant="overline" sx={{ opacity: 0.9, fontWeight: 'bold' }}>Pendientes Mes</Typography>
                <Typography variant="h2" fontWeight="bold">{formatVal(info?.pendientesMes)}</Typography>
                <Typography variant="body2">Revisiones de identidad en curso</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card Destacada: Rechazados */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ bgcolor: "error.main", color: "white", borderRadius: 4, position: 'relative', overflow: 'hidden' }}>
              <CardContent>
                <Box sx={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.2, color: 'white' }}>
                  <Icon size={120}>circle-x</Icon>
                </Box>
                <Typography variant="overline" sx={{ opacity: 0.9, fontWeight: 'bold' }}>Rechazados</Typography>
                <Box display="flex" alignItems="baseline" gap={1}>
                  <Typography variant="h2" fontWeight="bold">{formatVal(info?.solicitudesRechazadas)}</Typography>
                  <Typography variant="h5">({info?.porcentajeRechazo}%)</Typography>
                </Box>
                <Typography variant="body2">No cumplieron los requisitos</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Detalle de Dispositivos (Extra) */}
          <Grid size={{ xs: 12 }}>
            <Card variant="outlined" sx={{ borderRadius: 3, bgcolor: 'grey.50' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Icon size={48}>device-mobile</Icon>
                <Box>
                  <Typography variant="h6" fontWeight="bold">Externos registrados</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Hay <strong>{info?.externos}</strong> usuarios registrados desde dispositivos externos este mes.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      )}
    </Container>
  );
}

export default Home;