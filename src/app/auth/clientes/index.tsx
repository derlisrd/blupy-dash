import "@/styles/tables/virtualized.css";
import useClientes from "@/core/hooks/clientes/useClientes";
import { Box, Container, Icon, IconButton, LinearProgress, Menu, MenuItem, Paper, TableContainer } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column, Table, TableCellProps } from "react-virtualized";
import { useState } from "react";
import { cellRenderer, cellRendererAlianza, cellRendererFuncionario, headerRenderer } from "@/core/components/clientes/celdas";
import Filtros from "./filtros";
import { ClientesResults } from "@/services/dto/clientes/clientes";
import TableCell from "@/components/ui/tableCell";
import Ficha from "./modals/ficha";
import { useNavigate } from "react-router-dom";

function ClientesList() {
  const { lista, isLoading, buscar, isPending, handleModals, modals } = useClientes();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const listado = lista?.filter((cliente) => cliente.name.toLowerCase().includes(search.toLowerCase()) || cliente.cedula.includes(search)) || [];
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<ClientesResults | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: ClientesResults) => {
    setMenuAnchor(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => setMenuAnchor(null);
  const cellOptionRenderer = ({ rowData }: TableCellProps) => (
    <TableCell>
      <IconButton onClick={(event) => handleMenuOpen(event, rowData)}>
        <Icon>more_vert</Icon>
      </IconButton>
    </TableCell>
  );

  return (
    <Container>
      <h3>Clientes</h3>
      {isLoading || isPending ? (
        <LinearProgress />
      ) : (
        <Box boxShadow={6} borderRadius={4} component={Paper}>
          <Filtros setSearch={setSearch} buscar={buscar} search={search} />
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
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="id" label="ID" width={width * 0.1} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="cedula" label="Cedula" width={width * 0.1} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="name" label="Nombre" width={width * 0.3} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="celular" label="Tel." width={width * 0.1} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRendererFuncionario} dataKey="funcionario" label="_" width={width * 0.1} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRendererAlianza} dataKey="asofarma" label="_" width={width * 0.1} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="fecha" label="Fecha Registro" width={width * 0.2} />
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
            handleModals("ficha", true);
          }}
        >
          Ver Ficha
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedRow) {
              navigate("/clientes/foto-cedula", { state: { cliente: selectedRow } });
            }
            handleMenuClose();
          }}
        >
          Actualizar foto cédula
        </MenuItem>
      </Menu>
      <Ficha
        open={modals.ficha}
        fichaSeleccionada={selectedRow}
        onClose={() => {
          handleModals("ficha", false);
        }}
      />
    </Container>
  );
}

export default ClientesList;
