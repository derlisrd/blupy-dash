import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useVentas } from "./provider";

function TopIngresos() {
  const { topSucursalesIngresos } = useVentas();
  return (
    <Card>
      <CardHeader>
        <Heading size="md">VENTAS</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {topSucursalesIngresos.map((item, i) => (
            <Box key={i}>
              <Text>{item.sucursal.substring(0, 36)}</Text>
              <Text pt="2" fontSize="sm">
                {item.tickets} tickets
              </Text>
              <Text pt="2" fontSize="sm" fontWeight="bold">
                {item.total.toLocaleString("es-PY", { style: "currency", currency: "PYG" })}
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default TopIngresos;
