import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { Container, Typography, LinearProgress, Alert, Grid2 as Grid, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import TableResults from "./table.results";
import { useState } from "react";
import { utils } from "@/core/helpers/utils";
import { format } from "@formkit/tempo";

function VentasPorFechaForma() {
  const [searchParams] = useSearchParams();
  const { userData } = useAuth();
  const [search, setSearch] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");

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
  const filtroIdentificacion = data?.filter((elm) => elm.documento.toLowerCase().includes(search.toLowerCase()) || elm.factura.includes(search)) || [];

  const listado = filtroFecha === "" ? filtroIdentificacion : filtroIdentificacion.filter((elm) => elm.fechaSimple?.toLowerCase().includes(filtroFecha.toLowerCase()));

  const total = listado?.reduce((acc, item) => acc + item.importe, 0) || 0;

  return (
    <Container>
      <Grid container spacing={2} my={1} alignItems="center">
        <Grid size={{ xs: 12, sm: 3 }}>
          <Alert severity="info" icon={false}>
            <strong>
              {format(periodo, "MMMM YYYY")} {descripcion}
            </strong>
          </Alert>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <Alert severity="info" icon={false}>
            <strong>Total: {utils.formatPYG(total)}</strong>
          </Alert>
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField placeholder="Filtrar por cédula o factura" fullWidth value={search} onChange={({ target }) => setSearch(target.value)} variant="outlined" size="small" />
        </Grid>
        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField type="date" size="small" value={filtroFecha} onChange={({ target }) => setFiltroFecha(target.value)} variant="outlined" fullWidth />
        </Grid>
      </Grid>
      {isLoading ? <LinearProgress /> : <TableResults data={listado || []} />}
    </Container>
  );
}

export default VentasPorFechaForma;
