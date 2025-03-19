import { Box, IconButton, Paper, TableContainer, Tooltip } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column, Table, TableCellProps, TableHeaderProps } from "react-virtualized";
import { VentasPeriodoFormaResults } from "@/services/dto/ventas/ventasPeriodoForma";
import TableCell from "@/components/ui/tableCell";
import TableCellHead from "@/components/ui/tableCellHead";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";
import { utils } from "@/core/helpers/utils";

interface TableResultsProps {
  data: VentasPeriodoFormaResults[];
}
const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;
const cellRendererNumber = ({ cellData }: TableCellProps) => <TableCell>{utils.formatPY(cellData)}</TableCell>;

function TableResults({ data }: TableResultsProps) {
  const navigate = useNavigate();
  const cellRendederOption = ({ cellData }: TableCellProps) => (
    <TableCell>
      <Tooltip title="Ver detalles" placement="bottom" arrow>
        <IconButton onClick={() => navigate(`/ventas/por-codigo/${cellData}`)}>
          <Icon>eye-search</Icon>
        </IconButton>
      </Tooltip>
    </TableCell>
  );

  return (
    <Box boxShadow={6} borderRadius={4} component={Paper}>
      <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0, minHeight: `calc(100% - 100px)` }}>
        <AutoSizer>
          {({ height, width }) => (
            <Table
              height={height}
              width={width}
              rowHeight={48!}
              headerHeight={48!}
              rowStyle={{ display: "flex", alignItems: "center" }}
              rowCount={data.length}
              rowGetter={({ index }) => data[index]}
            >
              <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="codigo" label="Codigo" width={width * 0.1} />
              <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="fecha" label="fecha" width={width * 0.15} />
              <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="documento" label="Cliente" width={width * 0.1} />
              <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="factura" label="Factura" width={width * 0.15} />
              <Column headerRenderer={headerRenderer} cellRenderer={cellRendererNumber} dataKey="importe" label="Importe" width={width * 0.1} />
              <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="sucursal" label="Sucursal" width={width * 0.3} />
              <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="operacion" label="Tipo" width={width * 0.1} />
              <Column headerRenderer={headerRenderer} cellRenderer={cellRendederOption} dataKey="codigo" label="ver" width={width * 0.1} />
            </Table>
          )}
        </AutoSizer>
      </TableContainer>
    </Box>
  );
}

export default TableResults;
