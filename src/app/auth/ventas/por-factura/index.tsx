import Icon from "@/components/ui/icon";
import useVentasPorFactura from "@/core/hooks/ventas/useVentaPorFactura";
import { Button, Container, Grid2 as Grid, InputAdornment, TextField } from "@mui/material";

function VentasPorFactura() {
  const { search, setSearch, buscarVentaPorFactura } = useVentasPorFactura();

  return (
    <Container>
      <h3>Venta por factura</h3>

      <Grid container spacing={2}>
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
    </Container>
  );
}

export default VentasPorFactura;
