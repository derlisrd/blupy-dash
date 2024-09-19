import { Button, Container, Input, InputGroup, InputLeftAddon, Select, Stack, Text } from "@chakra-ui/react";
import { Column, Table } from "react-virtualized";
import useComisionVendedorHook from "./comision.vendedor.hook";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { CSVLink } from 'react-csv';

type listaComisionesType = {
    id: number
    estado: string
    fecha: string
    name: string
    cedula: string
    cedula_vendedor: string
    codigo: string
    tipo: number
    vendedor: string
    punto: string
}

const ancho = window.innerWidth> 1110 ? 1110 : window.innerWidth - 60;

function ReporteComisionVendedor() {
    const {lista,filtros,setFiltros, filtrar, count} = useComisionVendedorHook()

    const cabeceras : {label:string,key:string}[] = [
        { label: "id", key: "id" },
        { label: "contrato", key: "contrato" },
        { label: "cliente", key: "cliente" },
        { label: "ciVendedor", key: "ciVendedor" },
        { label: "vendedor", key: "vendedor" },
        { label: "producto", key: "producto" },
        { label: "estado", key: "estado" },
        { label: "punto", key: "punto" },
        { label: "fecha", key: "fecha" },
      ]

      const list = lista.map((e : listaComisionesType) => ({
        id: e.id,
        contrato: e.codigo,
        cliente: e.name,
        ciVendedor: e.cedula_vendedor,
        vendedor: e.vendedor,
        producto: e.tipo === 1 ? 'Linea de crédito' : 'Registro',
        estado: e.estado,
        fecha: e.fecha,
        punto: e.punto
      }));

    return <Container maxW='6xl'>
        <Text fontSize='2xl'>Reporte de comisiones: </Text>

        <Stack direction='row' my={4} gap={6} alignItems='center'>
            <InputGroup w='xs'>
                <InputLeftAddon children='Desde:' />
                <Input type="date" name="desde" placeholder="Desde" onChange={(e)=>{ setFiltros({...filtros, desde: e.target.value})  }} />
            </InputGroup>
            <InputGroup w='xs'>
                <InputLeftAddon children='Hasta:' />
                <Input type="date" name="hasta" placeholder="Hasta" onChange={(e)=>{ setFiltros({...filtros, hasta: e.target.value})  }} />
            </InputGroup>
            <Select w='xs' onChange={(e)=>{ setFiltros({...filtros,tipo:e.target.value});
              }} placeholder='Seleccionar producto' icon={<ChevronDownIcon />} value={filtros.tipo}  >
                <option value='0'>Registro</option>
                <option value='1'>Solicitud línea de crédito</option>
              </Select>
            <Button colorScheme='blue' size='sm' display='block' onClick={filtrar}> Filtrar</Button>
        </Stack>
    <Stack direction='row' alignItems='center' mb={2} gap={12}>
        <Text>Cantidad: {count}</Text>
        <Button colorScheme="green" size='sm'>
            <CSVLink headers={cabeceras}data={list} filename={'comision-vendedores'}>descarga excel</CSVLink>
        </Button> 
    </Stack>
    {

    }
        
    <Table
        width={ancho}
        autoWidth
        height={window.innerHeight - 255}
        headerHeight={20}
        rowHeight={30}
        rowCount={list.length}
        rowGetter={({ index }) => list[index]}
    >
        <Column
            headerRenderer={({dataKey,})=>(<div>{dataKey}</div>)}
            dataKey="id"
            label="#"
            width={60}
        />
        <Column
            headerRenderer={({label})=>(<div>{label}</div>)}
            dataKey="contrato"
            label="Contrato"
            width={70}
        />
        <Column
            headerRenderer={({label})=>(<div>{label}</div>)}
            dataKey="cliente"
            label="cliente"
            width={180}
        />
        <Column
            headerRenderer={({label})=>(<div>{label}</div>)}
            dataKey="ciVendedor"
            label="CI Vendedor"
            width={90}
        />
        <Column
            headerRenderer={({label})=>(<div>{label}</div>)}
            dataKey="vendedor"
            label="Vendedor"
            width={240}
        />
        <Column
            headerRenderer={({label})=>(<div>{label}</div>)}
            dataKey="punto"
            label="Punto"
            width={50}
        />
        <Column
            dataKey="producto"
            label="Producto"
            width={90}
        />
        <Column
            headerRenderer={({label})=>(<div>{label}</div>)}
            dataKey="estado"
            label="Estado"
            width={75}
        />
        <Column
            headerRenderer={({label})=>(<div>{label}</div>)}
            dataKey="fecha"
            label="Fecha"
            width={110}
        />
    </Table>

    </Container>
}

export default ReporteComisionVendedor;