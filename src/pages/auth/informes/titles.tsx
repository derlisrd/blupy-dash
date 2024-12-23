import { Fragment } from "react";
import { GridItem, Text } from "@chakra-ui/react";

function Titles() {
  return (
    <Fragment>
      <GridItem p={2} borderBottomWidth={1}>
        <Text fontSize="sm" as="b">
          DATOS
        </Text>
      </GridItem>
      <GridItem bgColor="#bee3f8" borderRadius={4} p={2}>
        <Text fontSize="sm" as="b">
          FARMA
        </Text>
      </GridItem>
      <GridItem bgColor="#60bdf1" borderRadius={4} p={2}>
        <Text fontSize="sm" as="b">
          ALIANZAS
        </Text>
      </GridItem>
      <GridItem bgColor="#a5dc86" borderRadius={4} p={2}>
        <Text fontSize="sm" as="b">
          DIGITAL
        </Text>
      </GridItem>
      <GridItem borderRadius={4} p={2} bgColor="#f5f5f5">
        <Text fontSize="sm" as="b">
          TOTAL MES
        </Text>
      </GridItem>
      <GridItem borderRadius={4} p={2} bgColor="#f5f5f5">
        <Text fontSize="sm" as="b">
          TOTAL AÑO
        </Text>
      </GridItem>
    </Fragment>
  );
}

export default Titles;
