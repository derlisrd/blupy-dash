import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useVentas } from "./provider";

function TopTickets() {
  const { topSucursalesTickets } = useVentas();
  return (
    <Card>
      <CardHeader>
        <Heading size="md">TICKETS</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {topSucursalesTickets.map((item, i) => (
            <Box key={i}>
              <Text>{item.sucursal.substring(0, 20)}</Text>
              <Text pt="2" fontSize="sm" fontWeight="bold">
                {item.tickets} tickets
              </Text>
              <Text pt="2" fontSize="sm">
                {item.total.toLocaleString("es-PY", { style: "currency", currency: "PYG" })}
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export default TopTickets;
