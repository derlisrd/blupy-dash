import FichaCard from "@/components/common/fichaCard";

import useVentasPorCodigo from "@/core/hooks/ventas/useVentaPorCodigo";

import { format } from "@formkit/tempo";
import { Container, Grid2 as Grid, LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";

function VentaPorCodigo() {
  const { codigo = "" } = useParams();
  const { data, isPending } = useVentasPorCodigo(codigo);

  return (
    <Container>
      <h3>Detalles de venta por codigo</h3>

      <Grid container spacing={2}>
        <Grid size={12}>{isPending && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 6 }}>Codigo: {codigo}</Grid>
        <Grid size={{ xs: 12, sm: 6 }}></Grid>
      </Grid>
      {data && (
        <Grid container spacing={2} mt={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FichaCard title="Nro de factura" subtitle={data.factura} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FichaCard title="Fecha de factura" subtitle={format(data.fecha, "DD MMM YYYY HH:mm", "es-PY")} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FichaCard title="Operacion" subtitle={data.operacion} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FichaCard title="Forma de pago" subtitle={data.formaPagoDescripcion} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <FichaCard title="Cliente" subtitle={data.cliente} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FichaCard title="Cedula" subtitle={data.cedula} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FichaCard title="Codigo adicional" subtitle={data.codigoClienteAdicional ?? "Sin adicional"} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FichaCard title="Valor total" subtitle={data.importe.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FichaCard title="Valor descuento" subtitle={data.descuento.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FichaCard title="Valor bruto" subtitle={data.bruto.toLocaleString("es-PY", { style: "currency", currency: "PYG" })} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <FichaCard title="Sucursal" subtitle={data.sucursal} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <FichaCard title="Observacion" subtitle={data.observaciones} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default VentaPorCodigo;
