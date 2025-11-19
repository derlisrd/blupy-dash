import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { Box, Container, LinearProgress, Paper, TableContainer } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AutoSizer from "react-virtualized-auto-sizer";
import { Column, Table, TableCellProps, TableHeaderProps } from "react-virtualized";
import { ColumnConfigType } from "@/core/types/columnsconfig";
import TableCellHead from "@/components/ui/tableCellHead";
import TableCell from "@/components/ui/tableCell";

const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const cellRenderer = ({ cellData }: TableCellProps) => <TableCell>{cellData}</TableCell>;

export default function ImpresosEnFarma() {
  const { userData } = useAuth();

  const { isLoading, data } = useQuery({
    queryKey: ["solicitudes"],
    queryFn: async () => await API.contratos.impresosEnFarma(userData && userData.tokenWithBearer),
    enabled: !!(userData && userData.token),
    staleTime: 1000 * 60 * 5,
  });

  const getColumnConfig = (width: number): ColumnConfigType[] => [
    { dataKey: "micoCodigo", label: "ID", width: width * 0.07 },
    { dataKey: "micoEstado", label: "Estado", width: width * 0.1 },
    { dataKey: "estrDescripcion", label: "Sucursal", width: width * 0.3 },
    { dataKey: "usuarioImpresor", label: "Func.", width: width * 0.2 },
    { dataKey: "persCi", label: "Ci. Func.", width: width * 0.1 },
    { dataKey: "micoPersCi", label: "Cliente", width: width * 0.1 },
  ];
  return (
    <Container>
      <h3>Contratos pendientes en Farma</h3>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Box boxShadow={6} borderRadius={4} component={Paper}>
          <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0, minHeight: `calc(100% - 160px)` }}>
            {data && (
              <AutoSizer>
                {({ height, width }) => (
                  <Table
                    height={height}
                    width={width}
                    rowHeight={48!}
                    headerHeight={48!}
                    rowStyle={{ display: "flex", alignItems: "center" }}
                    rowCount={data.results.length}
                    rowGetter={({ index }) => data.results[index]}
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
    </Container>
  );
}
