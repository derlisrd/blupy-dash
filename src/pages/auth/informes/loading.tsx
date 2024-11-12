import { GridItem, Heading, Skeleton } from "@chakra-ui/react";
import { Fragment } from "react";

function LoadingDatas() {
  return (
    <Fragment>
      {[...Array(36)].map((_, index) => (
        <GridItem key={index}>
          <Skeleton>
            <Heading>Datos...</Heading>
          </Skeleton>
        </GridItem>
      ))}
    </Fragment>
  );
}

export default LoadingDatas;
