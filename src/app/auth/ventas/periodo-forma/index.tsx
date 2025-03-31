import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { Container, Typography, LinearProgress, Alert, Grid2 as Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import TableResults from "./table.results";
import { useState } from "react";
import { utils } from "@/core/helpers/utils";
import { format } from "@formkit/tempo";

function VentasPorFechaForma() {
  const [searchParams] = useSearchParams();
  const { userData } = useAuth();
  const [total, setTotal] = useState(0);

  // Obtener parámetros individuales
  const forma_codigo = searchParams.get("codigo") || "";
  const descripcion = searchParams.get("descripcion") || "";
  const periodo = searchParams.get("periodo") || "";
  const alianza = searchParams.get("alianza") || "";

  const queryEnabled = !!forma_codigo && !!periodo && !!alianza;

  const { data, isLoading } = useQuery({
    queryKey: ["ventasPorFechaForma", forma_codigo, periodo, alianza],
    queryFn: async () => {
      const res = await API.venta.periodoForma({
        token: userData && userData.tokenWithBearer,
        forma_codigo,
        periodo,
        alianza,
      });
      let suma = 0;
      res.results?.forEach((item) => {
        suma += item.importe;
      });
      setTotal(suma);
      return res && res.results;
    },
    enabled: queryEnabled && !!userData?.tokenWithBearer,
    staleTime: 1000 * 60 * 60 * 24,
  });

  if (!queryEnabled) {
    return (
      <Container>
        <Typography variant="h5" component="h3" gutterBottom>
          Ventas
        </Typography>
        <Alert severity="warning">
          Faltan parámetros requeridos. Recibidos:
          {`codigo=${forma_codigo}, periodo=${periodo}, alianza=${alianza}`}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={2} my={1}>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Alert severity="info" icon={false}>
            <strong>Periodo: {format(periodo, "MMMM YYYY")}</strong>
          </Alert>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Alert severity="info" icon={false}>
            <strong>Forma Pago: {descripcion}</strong>
          </Alert>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Alert severity="info" icon={false}>
            <strong>Total: {utils.formatPYG(total)}</strong>
          </Alert>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Alert severity="info" icon={false}>
            <strong>Total: {utils.formatPYG(total)}</strong>
          </Alert>
        </Grid>
      </Grid>
      {isLoading ? <LinearProgress /> : <TableResults data={data || []} />}
    </Container>
  );
}

export default VentasPorFechaForma;
