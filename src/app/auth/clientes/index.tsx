import "@/styles/tables/virtualized.css";
import useClientes from "@/core/hooks/clientes/useClientes";
import { Box, Container, IconButton, LinearProgress, Link, Paper, TableContainer } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column, Table, TableCellProps } from "react-virtualized";
import { useState } from "react";
import { cellRenderer, cellRendererAlianza, cellRendererFuncionario, headerRenderer } from "@/core/components/clientes/celdas";
import Filtros from "./filtros";
import { ClientesResults } from "@/services/dto/clientes/clientes";
import TableCell from "@/components/ui/tableCell";
import Ficha from "./modals/ficha";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { ColumnConfigType } from "./types/column.config";
import RowOptionsMenu from "./components/rowOptionMenu";

function ClientesList() {
  const { lista, isLoading, buscar, isPending, handleModals, modals, cambiarEstadoCliente } = useClientes();
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

  const handleViewProfile = () => {
    handleMenuClose();
    handleModals("ficha", true);
  };

  const handleUpdatePhoto = () => {
    if (selectedRow) {
      navigate("/clientes/foto-cedula", { state: { cliente: selectedRow } });
    }
    handleMenuClose();
  };

  const handleResetPassword = () => {
    if (selectedRow) {
      navigate("/clientes/cambiar-contrasena", { state: { cliente: selectedRow } });
    }
    handleMenuClose();
  };

  // Opciones del menú
  const menuOptions = [
    { label: "Ver Ficha", onClick: handleViewProfile },
    { label: "Actualizar foto cédula", onClick: handleUpdatePhoto },
    { label: "Restablecer contraseña", onClick: handleResetPassword },
  ];
  const getColumnConfig = (width: number): ColumnConfigType[] => [
    { dataKey: "id", label: "ID", width: width * 0.05 },
    { dataKey: "cedula", label: "Cedula", width: width * 0.08 },
    { dataKey: "name", label: "Nombre", width: width * 0.3 },
    { dataKey: "celular", label: "Tel.", width: width * 0.1 },
    { dataKey: "funcionario", label: "_", width: width * 0.1, cellRenderer: cellRendererFuncionario },
    { dataKey: "asofarma", label: "_", width: width * 0.1, cellRenderer: cellRendererAlianza },
    { dataKey: "fecha", label: "Fecha Registro", width: width * 0.14 },
    {
      dataKey: "active",
      label: "Estado",
      width: width * 0.05,
      cellRenderer: ({ rowData }: TableCellProps) => (
        <Link
          onClick={() => {
            cambiarEstadoCliente(rowData.user_id);
          }}
          sx={{
            color: rowData.active === 1 ? "green" : "red",
            cursor: "pointer",
          }}
        >
          {rowData.active === 1 ? "Activo" : "Inactivo"}
        </Link>
      ),
    },
    {
      dataKey: "acciones",
      label: "",
      width: width * 0.1,
      cellRenderer: ({ rowData }: TableCellProps) => (
        <TableCell>
          <IconButton onClick={(event) => handleMenuOpen(event, rowData)}>
            <Icon>caret-down</Icon>
          </IconButton>
        </TableCell>
      ),
    },
  ];

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
                    {getColumnConfig(width).map((column) => (
                      <Column
                        key={column.dataKey}
                        headerRenderer={headerRenderer}
                        cellRenderer={column.cellRenderer || cellRenderer}
                        dataKey={column.dataKey}
                        label={column.label}
                        width={Number(column.width)}
                      />
                    ))}
                  </Table>
                )}
              </AutoSizer>
            )}
          </TableContainer>
        </Box>
      )}

      <RowOptionsMenu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose} options={menuOptions} />
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
