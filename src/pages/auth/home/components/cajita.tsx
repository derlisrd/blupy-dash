import { WarningTwoIcon } from "@chakra-ui/icons";
import { GridItem,Card,Text,CardBody, CardHeader,Flex } from "@chakra-ui/react";

interface Props {
    bgColor: string
    dato: string
    texto: string
}


function Cajita({bgColor,dato,texto}:Props) {
    return (<GridItem w='100%'>
    <Card bgColor={bgColor}>
        <CardHeader>
            <Text as='b' casing='uppercase' >{texto}</Text>
        </CardHeader>
        <CardBody>
            <Flex direction='row'  gap='2' alignItems='center' >
                <WarningTwoIcon boxSize={6} color='#ED8936' />
                <Text fontSize='2xl' as='samp' >{dato}</Text>
            </Flex>
        </CardBody>
    </Card>
</GridItem>  );
}

export default Cajita;