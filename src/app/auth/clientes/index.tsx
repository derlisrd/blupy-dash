import useClientes from "@/core/hooks/clientes/useClientes";
import { Box, Container, LinearProgress, Paper, Stack, Grid2 as Grid, TextField, InputAdornment, Icon, TableContainer } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column, Table, TableCellProps, TableHeaderProps } from "react-virtualized";
import MuiTableCell from "@mui/material/TableCell";

const TableCell = ({ children }: { children: React.ReactNode }) => {
  return (
    <MuiTableCell
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        boxSizing: "border-box",
        cursor: "pointer",
        height: 48,
      }}
      variant="head"
    >
      {children}
    </MuiTableCell>
  );
};

function ClientesList() {
  const { lista, isLoading } = useClientes();

  const headerRenderer = ({ label }: TableHeaderProps) => <TableCell>{label}</TableCell>;
  const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

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
          <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0, minHeight: `calc(100% - 280px)` }}>
            {lista && (
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    height={height}
                    width={width}
                    rowHeight={48!}
                    headerHeight={48!}
                    rowStyle={{ display: "flex", alignItems: "center" }}
                    rowCount={lista.length}
                    rowGetter={({ index }) => lista[index]}
                  >
                    <Column headerRenderer={headerRenderer} dataKey="id" label="#" width={80} cellRenderer={cellRenderer} />
                    <Column headerRenderer={headerRenderer} dataKey="cedula" label="Cedula" width={80} cellRenderer={cellRenderer} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="name" label="Nombre" width={250} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="vendedor_id" label="vendedor" width={90} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="created_at" label="fecha" width={128} />
                  </Table>
                )}
              </AutoSizer>
            )}
          </TableContainer>
        </Box>
      )}
    </Container>
  );
}

export default ClientesList;
