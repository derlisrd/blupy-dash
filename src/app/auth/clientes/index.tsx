import useClientes from "@/core/hooks/clientes/useClientes";
import { Box, Container, LinearProgress, Paper, Grid2 as Grid, TextField, InputAdornment, Icon, TableContainer } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column, Table, TableCellProps, TableHeaderProps } from "react-virtualized";
import TableCell from "@/core/components/clientes/tableCell";
import TableCellHead from "@/core/components/clientes/tablecellhead";
import "@/styles/tables/virtualized.css";
import { useState } from "react";

function ClientesList() {
  const { lista, isLoading } = useClientes();

  const [search, setSearch] = useState("");

  const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
  const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

  const listado = lista?.filter((cliente) => cliente.name.toLowerCase().includes(search.toLowerCase()) || cliente.cedula.toLowerCase().includes(search.toLowerCase())) || [];

  return (
    <Container>
      <h3>Clientes</h3>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box boxShadow={6} borderRadius={4} component={Paper}>
          <Grid container p={1.5} spacing={0}>
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
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}></Grid>
          </Grid>
          <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0, minHeight: `calc(100% - 200px)` }}>
            {listado && (
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    height={height}
                    width={width}
                    rowHeight={48!}
                    headerHeight={48!}
                    rowStyle={{ display: "flex", alignItems: "center" }}
                    rowCount={listado.length}
                    rowGetter={({ index }) => listado[index]}
                  >
                    <Column headerRenderer={headerRenderer} dataKey="id" label="ID" width={50} cellRenderer={cellRenderer} />
                    <Column headerRenderer={headerRenderer} dataKey="cedula" label="Cedula" width={80} cellRenderer={cellRenderer} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="name" label="Nombre" width={280} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="fecha" label="Fecha Registro" width={148} />
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
