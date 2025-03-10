import FichaCard from "@/components/common/fichaCard";
import Icon from "@/components/ui/icon";
import useVentasPorFactura from "@/core/hooks/ventas/useVentaPorFactura";
import { format } from "@formkit/tempo";
import { Button, Container, Grid2 as Grid, InputAdornment, LinearProgress, TextField } from "@mui/material";

function VentasPorFactura() {
  const { search, setSearch, buscarVentaPorFactura, data, isPending } = useVentasPorFactura();

  return (
    <Container>
      <h3>Venta por factura</h3>

      <Grid container spacing={2}>
        <Grid size={12}>{isPending && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Ingrese nro de factura"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon size={18}>search</Icon>
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Ingrese nro de factura"
            onChange={({ target }) => {
              setSearch(target.value);
            }}
            onKeyUp={({ key }) => {
              if (key === "Enter") buscarVentaPorFactura(search);
            }}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button onClick={() => buscarVentaPorFactura(search)}>Buscar</Button>
        </Grid>
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
            <FichaCard title="Tipo" subtitle={data.tipoVenta} />
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

export default VentasPorFactura;
