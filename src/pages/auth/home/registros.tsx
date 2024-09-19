import { CheckCircleIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHomeProvider } from "./provider";

function Registros() {
    const {datosTotales} = useHomeProvider()

    return ( 
    <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(4, 1fr)','repeat(4, 1fr)']} marginBottom={8} gap={2} >
        <GridItem w='100%'>
            <Card>
                <CardHeader>
                    <Text as='b' casing='uppercase'>Hoy:</Text>
                </CardHeader>
                <CardBody>
                    <Flex direction='row'  gap='2' alignItems='center' >
                        <InfoIcon boxSize={6} color='yellowgreen' />
                        <Text fontSize='2xl' as='samp' >{datosTotales.registrosHoy}</Text>
                    </Flex>
                </CardBody>
            </Card>
        </GridItem>
        <GridItem w='100%'>
            <Card>
                <CardHeader>
                    <Text as='b' casing='uppercase'>Semana:</Text>
                </CardHeader>
                <CardBody>
                    <Flex direction='row'  gap='2' alignItems='center' >
                        <InfoIcon boxSize={6} color='#7B341E' />
                        <Text fontSize='2xl' as='samp' >{datosTotales.registrosSemana}</Text>
                    </Flex>
                </CardBody>
            </Card>
        </GridItem>
        <GridItem w='100%'>
            <Card>
                <CardHeader>
                    <Text as='b' casing='uppercase' >Mes:</Text>
                </CardHeader>
                <CardBody>
                    <Flex direction='row'  gap='2' alignItems='center' >
                        <WarningIcon boxSize={6} color='#A0AEC0' />
                        <Text fontSize='2xl' as='samp' >{datosTotales.registrosMes}</Text>
                    </Flex>
                </CardBody>
            </Card>
        </GridItem>
        
        <GridItem w='100%'>
            <Card bgColor='#E9D8FD'>
                <CardHeader>
                    <Text as='b' casing='uppercase' >Total:</Text>
                </CardHeader>
                <CardBody>
                    <Flex direction='row'  gap='2' alignItems='center' >
                        <CheckCircleIcon boxSize={6} color='#805AD5' />
                        <Text fontSize='2xl' as='samp' >{datosTotales.registrosTotales}</Text>
                    </Flex>
                </CardBody>
            </Card>
        </GridItem>
    </Grid> );
}

export default Registros;