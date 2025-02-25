import useClientes from "@/core/hooks/clientes/useClientes";
import {
  Box,
  Container,
  LinearProgress,
  Paper,
  Stack,
  Grid2 as Grid,
  TextField,
  InputAdornment,
  Icon,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableBody,
  IconButton,
  TableFooter,
} from "@mui/material";

function ClientesList() {
  const { lista, isLoading } = useClientes();
  return (
    <Container sx={{ paddingBottom: 4 }}>
      <Stack direction={{ xs: "row" }} justifyContent="space-between" alignItems="center" padding={2}>
        <h3>Clientes</h3>
      </Stack>

      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box boxShadow={6} borderRadius={4} component={Paper} py={{ xs: 2 }}>
          <Grid container padding={2} spacing={{ xs: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
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
                placeholder="Buscar..."
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}></Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0 }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>Doc.</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>
                    <span></span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lista &&
                  lista.map((item, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>{item.cedula}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.created_at}</TableCell>
                      <TableCell>
                        <IconButton>
                          <Icon>more_vert</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>

              <TableFooter></TableFooter>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}

export default ClientesList;
