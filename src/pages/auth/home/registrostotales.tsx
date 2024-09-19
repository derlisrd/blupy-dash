import {  QuestionIcon, StarIcon, WarningIcon } from "@chakra-ui/icons";
import { Card, CardBody, CardHeader, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useHomeProvider } from "./provider";

function RegistrosTotales() {
    const {datosTotales} = useHomeProvider()

    return ( 
    <Grid templateColumns={['repeat(1, 1fr)','repeat(1, 1fr)','repeat(3, 1fr)','repeat(3, 1fr)']} marginBottom={8} gap={2} >

        
        <GridItem w='100%'>
            <Card bgColor='#BEE3F8' >
                <CardHeader>
                    <Text as='b' casing='uppercase' >Funcionarios:</Text>
                </CardHeader>
                <CardBody>
                    <Flex direction='row'  gap='2' alignItems='center' >
                        <StarIcon boxSize={6} color='blue' />
                        <Text fontSize='2xl' as='samp' >{datosTotales.funcionarios}</Text>
                    </Flex>
                </CardBody>
            </Card>
        </GridItem>
        <GridItem w='100%'>
            <Card bgColor='#EBF8FF'>
                <CardHeader>
                    <Text as='b' casing='uppercase' >Asociaciones:</Text>
                </CardHeader>
                <CardBody>
                    <Flex direction='row'  gap='2' alignItems='center' >
                        <WarningIcon boxSize={6} color='tomato' />
                        <Text fontSize='2xl' as='samp' >{datosTotales.asociaciones}</Text>
                    </Flex>
                </CardBody>
            </Card>
        </GridItem>
        <GridItem w='100%'>
            <Card bgColor='#C4F1F9'>
                <CardHeader>
                    <Text as='b' casing='uppercase' >Externos:</Text>
                </CardHeader>
                <CardBody>
                    <Flex direction='row'  gap='2' alignItems='center' >
                        <QuestionIcon boxSize={6} color='#319795' />
                        <Text fontSize='2xl' as='samp' >{datosTotales.externos}</Text>
                    </Flex>
                </CardBody>
            </Card>
        </GridItem>
    </Grid> );
}

export default RegistrosTotales;