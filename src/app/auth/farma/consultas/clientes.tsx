import useClienteConsulta from "@/core/hooks/consultas/useClienteConsulta";
import { format } from "@formkit/tempo";
import { Button, Card, CardContent, Container, Grid2 as Grid, Icon, InputAdornment, LinearProgress, TextField, Typography } from "@mui/material";
import { Fragment, useState } from "react";

function ClientesFarma() {
  const [search, setSearch] = useState("");
  const { isPending, datos, buscar } = useClienteConsulta();

  return (
    <Container sx={{ py: 1.5 }}>
      <h3>Consulta de clientes de farma</h3>
      <Grid container p={1.5} spacing={1} alignItems="center">
        <Grid size={12}>{isPending && <LinearProgress />}</Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
              },
            }}
            placeholder="Ingresar cedula..."
            onChange={({ target }) => {
              setSearch(target.value);
            }}
            onKeyUp={({ key }) => {
              if (key === "Enter") buscar(search);
            }}
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button onClick={() => buscar(search)}>Consultar</Button>
        </Grid>
      </Grid>
      {datos && datos.farma && (
        <Grid container rowSpacing={2} columnSpacing={1} p={1.5}>
          <Grid size={12}>
            <Typography variant="h6">Ficha Farma</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 2 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Código</Typography>
                <Typography variant="body1">{datos.farma.codigo}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Nombre:</Typography>
                <Typography variant="body1">{datos.farma.nombre}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Funcionario:</Typography>
                <Typography variant="body1">{datos.farma.esFuncionario ? "SI" : "NO"}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Registro:</Typography>
                <Typography variant="body1">{datos.registro ? "SI" : "NO"}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Card sx={{ boxShadow: 4, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Crédito</Typography>
                <Typography variant="body1">{datos.farma.credito?.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Crédito adicional:</Typography>
                <Typography variant="body1">{datos.farma.creditoAdicional ? datos.farma.creditoAdicional.toLocaleString() : "0"}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Disponible:</Typography>
                <Typography variant="body1">{datos.farma.saldoDisponible.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
              <CardContent>
                <Typography variant="caption">Deuda pendiente:</Typography>
                <Typography variant="body1">{datos.farma.pendiente.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          {datos.farma.alianzas?.map((item, key) => (
            <Fragment key={key}>
              <Grid size={12}>
                <Typography variant="h6">Alianza</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Alianza:</Typography>
                    <Typography variant="body1">{item.alianza}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Código alianza:</Typography>
                    <Typography variant="body1">{item.codigo}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Forma de pago:</Typography>
                    <Typography variant="body1">{item.formaPago}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ boxShadow: 3, bgcolor: "primary.contrastText" }}>
                  <CardContent>
                    <Typography variant="caption">Vencimiento:</Typography>
                    <Typography variant="body1">{format(item.vencimiento)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default ClientesFarma;
