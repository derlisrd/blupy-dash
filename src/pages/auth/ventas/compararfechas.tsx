import { Button, Card, CardBody, Input, Stack, Text } from "@chakra-ui/react";
import { useVentas } from "./provider";

function CompararFechas() {
  const { fecha1, fecha2, compararMeses, setFecha1, setFecha2, cambioFecha } = useVentas();
  return (
    <Stack direction="row" gap={4}>
      <Card w="100%">
        <CardBody>
          <Stack gap={6}>
            <Input type="month" value={fecha1} onChange={(e) => setFecha1(e.target.value)} />
            <Text fontWeight="bold">{compararMeses.tickets1.toLocaleString("es-PY")} Tickets</Text>
            <Text fontWeight="bold">{compararMeses.total1.toLocaleString("es-PY", { style: "currency", currency: "PYG" })}</Text>
          </Stack>
        </CardBody>
      </Card>
      <Card w="100%">
        <CardBody>
          <Stack gap={6}>
            <Input type="month" value={fecha2} onChange={(e) => setFecha2(e.target.value)} />
            <Text fontWeight="bold">{compararMeses.tickets2} Tickets</Text>
            <Text fontWeight="bold">{compararMeses.total2.toLocaleString("es-PY", { style: "currency", currency: "PYG" })}</Text>
            <Button
              onClick={() => {
                cambioFecha(fecha1, fecha2);
              }}
            >
              Comparar
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default CompararFechas;
