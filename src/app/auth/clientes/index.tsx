import "@/styles/tables/virtualized.css";
import useClientes from "@/core/hooks/clientes/useClientes";
import { Box, Container, LinearProgress, Paper, TableContainer } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column, Table } from "react-virtualized";
import { useState } from "react";
import { cellRenderer, cellRendererAlianza, cellRendererFuncionario, headerRenderer } from "@/core/components/clientes/celdas";
import Filtros from "./filtros";

function ClientesList() {
  const { lista, isLoading, buscar, isPending } = useClientes();

  const [search, setSearch] = useState("");

  const listado = lista?.filter((cliente) => cliente.name.toLowerCase().includes(search.toLowerCase()) || cliente.cedula.includes(search)) || [];

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
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="id" label="ID" width={50} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="cedula" label="Cedula" width={80} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="name" label="Nombre" width={280} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="celular" label="Tel." width={148} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRendererFuncionario} dataKey="funcionario" label="_" width={148} />
                    <Column headerRenderer={headerRenderer} cellRenderer={cellRendererAlianza} dataKey="asofarma" label="_" width={148} />
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
