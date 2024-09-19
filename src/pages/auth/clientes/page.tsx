
import {Box, Button, Input, Skeleton, Stack, Text} from '@chakra-ui/react'
import { useClienteProvider } from "./useclienteprovider";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { KeyboardEvent } from "react";
import TablaClientes from './tablaclientes';
import { CSVLink } from 'react-csv';
import { APICALLER } from '../../../services/api';
import userDataHook from '../../../store/user_data_store';

function ClientesPage() {
    const {lista,loading,setModals,modals,setLista} = useClienteProvider()
    const {dataUser} = userDataHook()
    
    const cabeceras : Array<{label:string, key:string}> = [
      { label: "id", key: "id" },
      { label: "cedula", key: "cedula" },
      { label: "Nombre", key: "name" },
      { label: "Celular", key: "celular" },
      { label: "Asofarma", key: "asofarma" },
      { label: "Funcionario", key: "funcionario" },
    ]

    const buscarEnter = async(e: KeyboardEvent<HTMLInputElement>)=>{
      if(e.key==='Enter'){
       const inputElement = document.getElementById('_buscar') as HTMLInputElement | null;
        if(inputElement){
          const buscar = inputElement.value
          const res = await APICALLER.buscarCliente({token:dataUser.token, buscar: buscar})
          if(res.success){
            setLista(res.results);
          }
        } 
      }  
   } 



    return (<Box>
      <Stack gap={2} spacing={2} mb={4} direction='column'>
          <Text fontSize='2xl'>Clientes: </Text>
          <Stack direction={['column', 'row']} alignItems='center'>
          <Button variant='outline' size='sm' rightIcon={<ChevronDownIcon />} onClick={()=>{setModals({...modals, filtros:true})}}>
            Filtros
          </Button>
            <Input disabled={loading} id="_buscar" placeholder="Buscar por c.i. o nombre y presiona ENTER..."  onKeyUp={buscarEnter} />
            <Stack direction='row'>
              <Button variant='outline' size='sm'>
                <CSVLink 
                    headers={cabeceras}
                    data={lista}
                    filename={'clientes'}
                  >EXCEL</CSVLink></Button>
            </Stack>
          </Stack>
        </Stack>
      {loading ? 
      <Stack marginY={8} >
          <Skeleton height='20px' /><Skeleton height='20px' /><Skeleton height='20px' />
      </Stack>:
            <Box minW='max-content'>
              <TablaClientes />
            </Box>
          }
      </Box>);
}

export default ClientesPage;