import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { Container, Typography, LinearProgress, Alert, Box, Paper, TableContainer } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Column, Table } from "react-virtualized";

function VentasPorFechaForma() {
  const [searchParams] = useSearchParams();
  const { userData } = useAuth();

  // Obtener parámetros individuales
  const forma_codigo = searchParams.get("codigo") || "";
  const periodo = searchParams.get("periodo") || "";
  const alianza = searchParams.get("alianza") || "";

  const queryEnabled = !!forma_codigo && !!periodo && !!alianza;

  const { data, isLoading } = useQuery({
    queryKey: ["ventasPorFechaForma", forma_codigo, periodo, alianza],
    queryFn: async () => {
      console.log("Ejecutando consulta con parámetros:", { forma_codigo, periodo, alianza });
      const res = await API.venta.periodoForma({
        token: userData && userData.tokenWithBearer,
        forma_codigo,
        periodo,
        alianza,
      });
      return res && res.results;
    },
    enabled: queryEnabled && !!userData?.tokenWithBearer,
  });

  if (!queryEnabled) {
    return (
      <Container>
        <Typography variant="h5" component="h3" gutterBottom>
          Ventas
        </Typography>
        <Alert severity="warning">
          Faltan parámetros requeridos. Recibidos:
          {`codigo=${forma_codigo}, periodo=${periodo}, alianza=${alianza}`}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h3>Ventas por periodo y forma</h3>
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
                    rowCount={data.length}
                    rowGetter={({ index }) => data[index]}
                  >
                    <Column dataKey="id" label="ID" width={width * 0.1} />
                    <Column dataKey="codigo" label="Codigo" width={width * 0.1} />
                    <Column dataKey="documento" label="Cliente" width={width * 0.1} />
                    <Column dataKey="factura_numero" label="Factura" width={width * 0.2} />
                    <Column dataKey="importe_final" label="Importe" width={width * 0.1} />
                    <Column dataKey="sucursal" label="Sucursal" width={width * 0.3} />
                    <Column dataKey="forma_codigo" label="Forma" width={width * 0.2} />
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

export default VentasPorFechaForma;
