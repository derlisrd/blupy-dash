import { useAuth } from "@/hooks/useAuth";
import { validacionesApiService } from "@/services/api/validaciones";
import { Box, Container, LinearProgress, Paper, TableContainer } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Column, Table } from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";
import { TableCellProps, TableHeaderProps } from "react-virtualized";
import TableCellHead from "@/components/ui/tableCellHead";


const headerRenderer = ({ label }: TableHeaderProps) => <TableCellHead>{label}</TableCellHead>;
const cellRenderer = ({ cellData }: TableCellProps) => (
    <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "0 16px" }}>
        {cellData}
    </div>
);
export default function Validaciones() {
    const { userData } = useAuth()
    const { data, isLoading } = useQuery({
        queryKey: ["validaciones"],
        queryFn: async () => await validacionesApiService.validaciones(userData?.token || null),
        select: data => {
            if (data && data.results) {
                return data.results
            }
            return []
        }
    });



    return <Container>
        <h3>Ultimos PINs enviados</h3>
        {isLoading && <LinearProgress />}
        <Box boxShadow={6} borderRadius={4} component={Paper}>
            <TableContainer component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0, minHeight: `calc(100% - 100px)` }}>
                {data && (
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
                                <Column headerRenderer={headerRenderer} dataKey="id" label="#" width={60} cellRenderer={cellRenderer} />
                                <Column headerRenderer={headerRenderer} dataKey="email" label="Email" width={220} cellRenderer={cellRenderer} />
                                <Column headerRenderer={headerRenderer} dataKey="celular" label="Celular" width={120} cellRenderer={cellRenderer} />
                                <Column headerRenderer={headerRenderer} dataKey="origen" label="Origen" width={160} cellRenderer={cellRenderer} />
                                <Column headerRenderer={headerRenderer} dataKey="codigo" label="PIN" width={100} cellRenderer={cellRenderer} />
                            </Table>
                        )}
                    </AutoSizer>
                )}
            </TableContainer>
        </Box>
    </Container>
}