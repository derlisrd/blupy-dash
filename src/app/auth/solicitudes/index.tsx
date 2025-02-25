import { Box, Container, LinearProgress, Paper, Grid2 as Grid, TextField, InputAdornment, Icon, TableContainer, IconButton, Menu, MenuItem } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column, Table, TableCellProps, TableHeaderProps } from "react-virtualized";
import TableCell from "@/core/components/clientes/tableCell";
import TableCellHead from "@/core/components/clientes/tablecellhead";
import "@/styles/tables/virtualized.css";
import useSolicitudes from "@/core/hooks/solicitudes/useSolicitudes";
import { useState } from "react";
import { SolicitudesResults } from "@/services/dto/solicitudes/solicitudes";
import Ficha from "./modal/ficha";

const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

function Solicitudes() {
  const { lista, isLoading } = useSolicitudes();

  const [openFicha, setOpenFicha] = useState(false);
  const [search, setSearch] = useState("");

  const listado = lista?.filter((cliente) => cliente.name.toLowerCase().includes(search.toLowerCase()) || cliente.cedula.toLowerCase().includes(search.toLowerCase())) || [];

  // Estado para el menú contextual
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<SolicitudesResults | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: SolicitudesResults) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const cellOptionRenderer = ({ rowData }: TableCellProps) => (
    <TableCell>
      <IconButton onClick={(event) => handleMenuOpen(event, rowData)}>
        <Icon>more_vert</Icon>
      </IconButton>
    </TableCell>
  );

  return (
    <Container>
      <h3>Solicitudes de línea</h3>

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
          <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0, minHeight: `calc(100% - 210px)` }}>
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
                    <Column headerRenderer={headerRenderer} dataKey="id" label="#" width={60} cellRenderer={cellRenderer} />
                    <Column headerRenderer={headerRenderer} dataKey="cedula" label="Cedula" width={80} cellRenderer={cellRenderer} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="name" label="Nombre" width={280} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="estado" label="Estado" width={140} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="fecha" label="fecha" width={148} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellOptionRenderer} dataKey="acciones" label="_" width={148} />
                  </Table>
                )}
              </AutoSizer>
            )}
          </TableContainer>
        </Box>
      )}
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            setSelectedRow(selectedRow);
            handleMenuClose();
            setOpenFicha(true);
          }}
        >
          Ver Ficha
        </MenuItem>
        <MenuItem onClick={() => console.log("Editar", selectedRow)}>Enviar notificación </MenuItem>
      </Menu>
      <Ficha
        open={openFicha}
        fichaSeleccionada={selectedRow}
        onClose={() => {
          setOpenFicha(false);
        }}
      />
    </Container>
  );
}

export default Solicitudes;
