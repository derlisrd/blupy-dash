import { Grid2 as Grid } from "@mui/material";
import CardCliente from "./card.cliente";
import { FichaResults } from "@/services/dto/notificaciones/ficha";
import { Fragment } from "react";
import { format } from "@formkit/tempo";

function FichaCliente({ cliente }: { cliente: FichaResults }) {
  return (
    <Grid container spacing={2} mt={2}>
      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <CardCliente title="Nombre" descripcion={cliente.nombre} />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
        <CardCliente title="Correo" descripcion={cliente.email} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CardCliente title="Cliente ID:" descripcion={String(cliente.cliente_id)} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CardCliente title="User ID:" descripcion={String(cliente.user_id)} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CardCliente title="Cédula" descripcion={cliente.cedula} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CardCliente title="Telefono:" descripcion={cliente.celular} />
      </Grid>
      {cliente.micredito && (
        <Fragment>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCliente title="Cuenta:" descripcion={cliente.micredito.cuenta} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCliente title="Deuda:" descripcion={cliente.micredito.deuda.toLocaleString("es-PY")} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCliente title="Minimo:" descripcion={cliente.micredito.pagoMinimo.toLocaleString("es-PY")} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <CardCliente title="Vencimiento:" descripcion={format(cliente.micredito.fechaVencimiento, "DD MMM YYYY")} />
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
}

export default FichaCliente;
