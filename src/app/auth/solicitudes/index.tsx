import { Box, Container, LinearProgress, Paper, TableContainer, IconButton, Menu, MenuItem } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column, Table, TableCellProps } from "react-virtualized";
import "@/styles/tables/virtualized.css";
import useSolicitudes from "@/core/hooks/solicitudes/useSolicitudes";
import { useState } from "react";
import { SolicitudesResults } from "@/services/dto/solicitudes/solicitudes";
import Ficha from "./modal/ficha";
import TableCell from "@/components/ui/tableCell";
import { cellRenderer, cellRendererEstado, headerRenderer, cellRendererTipo } from "@/core/components/solicitudes/celdas";
import Filtros from "./filtros";
import Icon from "@/components/ui/icon";

function Solicitudes() {
  const { lista, isLoading, buscar, isPending, actualizar } = useSolicitudes();

  const [openFicha, setOpenFicha] = useState(false);
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState<number | "">("");

  const listado =
    lista?.filter(
      (cliente) =>
        (cliente.name.toLowerCase().includes(search.toLowerCase()) || cliente.cedula.includes(search) || cliente.codigo.includes(search)) &&
        (estadoFiltro === "" || cliente.estado_id === estadoFiltro) // Filtrar por estado si está seleccionado
    ) || [];

  // Estado para el menú contextual
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<SolicitudesResults | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: SolicitudesResults) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => setMenuAnchor(null);

  const cellOptionRenderer = ({ rowData }: TableCellProps) => (
    <TableCell>
      <IconButton onClick={(event) => handleMenuOpen(event, rowData)}>
        <Icon>caret-down</Icon>
      </IconButton>
    </TableCell>
  );

  return (
    <Container>
      <h3>Solicitudes de línea</h3>

      {isLoading || isPending ? (
        <LinearProgress />
      ) : (
        <Box boxShadow={6} borderRadius={4} component={Paper}>
          <Filtros setSearch={setSearch} setEstadoFiltro={setEstadoFiltro} estadoFiltro={estadoFiltro} buscar={buscar} search={search} />
          <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0, minHeight: `calc(100% - 160px)` }}>
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
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRendererEstado} dataKey="estado_id" label="Estado" width={140} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="codigo" label="Codigo" width={100} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRendererTipo} dataKey="tipo" label="Producto" width={148} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="fecha" label="fecha" width={148} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellOptionRenderer} dataKey="acciones" label="" width={60} />
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
        <MenuItem onClick={() => actualizar(selectedRow)}>Actualizar solicitud</MenuItem>
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
