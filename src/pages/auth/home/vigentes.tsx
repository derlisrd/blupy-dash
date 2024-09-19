import { InfoIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHomeProvider } from "./provider";

function Vigentes() {
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
                        <Text fontSize='2xl' as='samp' >{datosTotales.vigentesHoy}</Text>
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
                        <InfoIcon boxSize={6} color='yellowgreen' />
                        <Text fontSize='2xl' as='samp' >{datosTotales.vigentesSemana}</Text>
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
                        <InfoIcon boxSize={6} color='yellowgreen' />
                        <Text fontSize='2xl' as='samp' >{datosTotales.vigentesMes}</Text>
                    </Flex>
                </CardBody>
            </Card>
        </GridItem>
        <GridItem w='100%'>
            <Card bgColor='#C6F6D5'>
                <CardHeader>
                    <Text as='b' casing='uppercase' >Total:</Text>
                </CardHeader>
                <CardBody>
                    <Flex direction='row'  gap='2' alignItems='center' >
                        <InfoIcon boxSize={6} color='yellowgreen' />
                        <Text fontSize='2xl' as='samp' >{datosTotales.solicitudesVigentes}</Text>
                    </Flex>
                </CardBody>
            </Card>
        </GridItem>
        
     
    </Grid> );
}

export default Vigentes;