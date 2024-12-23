import { Text, Container } from "@chakra-ui/react";
import Registros from "./registros";
import RegistrosTotales from "./registrostotales";
import Vigentes from "./vigentes";
import Rechazados from "./rechazados";
import Pendientes from "./pendientes";
import Solicitudes from "./solicitudes";
import Uso from "./uso";

function HomePage() {
  return (
    <Container maxW="5xl">
      <Text as="b" casing="uppercase">
        Registros
      </Text>
      <Registros />
      <Text as="b" casing="uppercase">
        Tasa de uso
      </Text>
      <Uso />
      <RegistrosTotales />
      <Text as="b" casing="uppercase">
        Solicitudes
      </Text>
      <Solicitudes />
      <Text as="b" casing="uppercase">
        Solicitudes Vigentes
      </Text>
      <Vigentes />
      <Text as="b" casing="uppercase">
        Solicitudes Pendientes
      </Text>
      <Pendientes />
      <Text as="b" casing="uppercase">
        Solicitudes Rechazadas
      </Text>
      <Rechazados />
    </Container>
  );
}

export default HomePage;
