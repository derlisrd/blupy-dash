import { Button, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useClienteProvider } from "./useclienteprovider";
import {useState,useEffect,useCallback} from 'react'
import userDataHook from "../../../store/user_data_store";
import { APICALLER } from "../../../services/api";
import moment from "moment";

const tipos = [ 
    'Registro en Blupy',
    'Solicitud línea de crédito',
    'Adicionales',
    'Ampliación'
]
type solicitudType = {
    tipo: number
    updated_at: string
    estado: string
}

function ModalSolicitud() {
    const {modals,setModals,form} = useClienteProvider()
    const {dataUser} = userDataHook()
    const [solicitudes,setSolicitudes] = useState([])
    const [loading,setLoading] = useState(true)
    const onClose = ()=> {
        setModals({...modals,solicitud:false})
      }
    const getInfo = useCallback(async()=>{
        setLoading(true)
        if(modals.solicitud){
          const res = await APICALLER.solicitudPorCliente({token:dataUser.token,cliente_id:form.id})
          if(res.success){
            setSolicitudes(res.results)
          }
        }
        setLoading(false)
      },[dataUser,form,modals.solicitud])
  
      useEffect(() => {
        const ca = new AbortController(); let isA = true;
        isA && getInfo();
        return () => {isA = false;ca.abort();};
    }, [getInfo]);
    
    return ( <Modal size='xl' isOpen={modals.solicitud} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Solicitudes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {
              loading ?
              <Stack direction='column'>
                <Skeleton h='10px' />
                <Skeleton h='10px' />
                <Skeleton h='10px' />
              </Stack>
              :
              <Stack direction='column'>
                <List>
                    <ListItem>{form.name} - CI: {form.cedula}</ListItem>
                </List>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>TIPO</Th>
                            <Th>ESTADO</Th>
                            <Th>FECHA</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                        solicitudes.map((e : solicitudType,i)=>(
                            <Tr key={i}>
                                <Td>{tipos[e.tipo]}</Td>
                                <Td>{e.estado}</Td>
                                <Td>{moment(e.updated_at).format('DD-MM-YYYY')}</Td>
                            </Tr>
                        ))
                    }
                    </Tbody>
                </Table>
              </Stack>
            }
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant='outline'>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  );
}

export default ModalSolicitud;