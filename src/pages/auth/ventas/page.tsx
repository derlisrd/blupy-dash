import { Container, Text } from "@chakra-ui/react";
import VentasMes from "./totales";
import Digital from "./digital";
import Farma from "./farma";
import Aso from "./aso";

function VentasPage() {
  return (
    <Container maxW="5xl">
      <VentasMes />
      <Text as="b" casing="uppercase">
        Blupy digital
      </Text>
      <Digital />
      <Text as="b" casing="uppercase">
        Blupy 1 dia Farma
      </Text>
      <Farma />
      <Text as="b" casing="uppercase">
        Blupy 1 dia Aso
      </Text>
      <Aso />
    </Container>
  );
}

export default VentasPage;
