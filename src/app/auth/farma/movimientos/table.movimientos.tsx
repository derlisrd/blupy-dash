import { Box, Paper, TableContainer } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column, Table, TableCellProps, TableHeaderProps } from "react-virtualized";
import { MovimientosResults } from "@/services/dto/farma/movimientos";
import TableCell from "@/components/ui/tableCell";
import TableCellHead from "@/components/ui/tableCellHead";

interface TableMovimientosProps {
  data: MovimientosResults[];
}

const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

function TableMovimientos({ data }: TableMovimientosProps) {
  return (
    <Box boxShadow={5} borderRadius={4} component={Paper}>
      <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0, minHeight: `calc(100% - 160px)` }}>
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
              <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="fecha" label="fecha" width={width * 0.3} />
              <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="comercio" label="comercio" width={width * 0.3} />
              <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="descripcion" label="descripcion" width={width * 0.3} />
              <Column headerRenderer={headerRenderer} cellRenderer={cellRenderer} dataKey="detalles" label="detalles" width={width * 0.3} />
              <Column
                headerRenderer={headerRenderer}
                dataKey="monto"
                label="monto"
                width={width * 0.3}
                cellRenderer={({ cellData }: TableCellProps) => <TableCell>{cellData.toLocaleString("es-PY")}</TableCell>}
              />
            </Table>
          )}
        </AutoSizer>
      </TableContainer>
    </Box>
  );
}

export default TableMovimientos;
