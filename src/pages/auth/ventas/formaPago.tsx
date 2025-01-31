import { Box, Card, CardBody, CardHeader, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useVentas } from "./provider";

function FormaPago() {
  const { forma } = useVentas();
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Formas de pago</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {forma.map((item, i) => (
            <Box key={i}>
              <Text fontWeight="bold">{item.forma_pago.substring(0, 20)}</Text>
              <Text pt="2" fontSize="sm">
                {item.tickets.toLocaleString("es-PY")} tickets
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

export default FormaPago;
