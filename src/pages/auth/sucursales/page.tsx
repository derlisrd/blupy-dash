import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Box, Stack, Text, Skeleton } from "@chakra-ui/react";
import { useSucursales } from "./Provider";
import TablaVentas from "./tablaventas";
import { CSVLink } from "react-csv";

function Page() {
  const { modal, setModal, desde, hasta, punto, loading, ventas, total } = useSucursales();

  const cabeceras: Array<{ label: string; key: string }> = [
    { label: "Codigo", key: "codigo" },
    { label: "Documento", key: "documento" },
    { label: "Factura", key: "factura_numero" },
    { label: "Importe", key: "importe" },
    { label: "Forma", key: "forma_pago" },
    { label: "Sucursal", key: "sucursal" },
    { label: "Fecha", key: "fecha" },
  ];

  return (
    <Box>
      <h1>Ventas por Sucursales</h1>
      <Button
        rightIcon={<ChevronDownIcon />}
        variant="outline"
        size="sm"
        onClick={() => {
          setModal({ ...modal, filtros: true });
        }}
      >
        Filtrar
      </Button>
      <Stack direction="row" gap={4} justifyContent="space-between">
        <Stack direction="row" gap={4}>
          <Text>Desde: {desde}</Text>
          <Text>Hasta: {hasta}</Text>
          <Text>Punto: {punto}</Text>
          <b>Total: {total.toLocaleString("es-Py")}</b>
        </Stack>
        <Button variant="outline" size="sm">
          <CSVLink headers={cabeceras} data={ventas} filename={"ventas_por_sucursales.csv"}>
            EXCEL
          </CSVLink>
        </Button>
      </Stack>
      {loading ? (
        <Stack marginY={8}>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <Box minW="max-content" marginY={3}>
          <TablaVentas />
        </Box>
      )}
    </Box>
  );
}

export default Page;
