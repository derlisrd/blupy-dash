import { Table, TableCaption, TableContainer,Thead,Tr, Th,Td, Tbody } from "@chakra-ui/react";
import { clienteData } from "../../../models/clientes_data_model";
import moment from "moment";

type Props = {
  lista: clienteData[]
}

function TablaHome({lista}:Props) {
    return ( <TableContainer>
        <Table variant='striped' size='sm'>
          <TableCaption>Ultimos registros</TableCaption>
          <Thead>
            <Tr>
              <Th>Cedula</Th>
              <Th>Nombre</Th>
              <Th>Farma</Th>
              <Th>Solicitud Personal</Th>
              <Th>Fecha</Th>
            </Tr>
          </Thead>
          <Tbody>
              {lista.map((e : clienteData)=>(
              <Tr key={e.id}>
                <Td>{e.cedula}</Td>
                <Td>{e.name}</Td>
                <Td>{e.asofarma===0 ? 'NO' : 'SI'}</Td>
                <Td>{e.solicitud_credito===0 ? 'NO' : 'SI'}</Td>
                <Td>{moment(e.created_at).format('DD-MM-YYYY HH:mm')}</Td>
            </Tr>))
            }
           
          </Tbody>

        </Table>
      </TableContainer> );
}

export default TablaHome;