import { Box, Button, Input, Skeleton,Stack, Text } from "@chakra-ui/react";
import { useSolicitudes } from "./usesolicitudes";
import TablaSolicitudes from "./tabla.solicitudes";
import {KeyboardEvent, useState} from 'react'
import userDataHook from "../../../store/user_data_store";
import { APICALLER } from "../../../services/api";
import { ChevronDownIcon, RepeatIcon } from "@chakra-ui/icons";
import { useSolicitudStore } from "./store";
import "./styles.table.css";

function SolicitudesPage() {
    const {setModals} = useSolicitudStore()
    const {loading,setLoading,setLista,getListaCB} = useSolicitudes()
    const {dataUser} = userDataHook()
    const [loadingActualizar,setLoadingActualizar] = useState(false);
    const buscarEnter = async(e: KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter'){
          const inputElement = document.getElementById('_buscar') as HTMLInputElement | null;
          if(inputElement){
            const buscar = inputElement.value
            setLoading(true)
            const res = await APICALLER.buscarSolicitud({token: dataUser.token, buscar})   
            setLoading(false)
            if(res.success){
                setLista(res.results)
                document.getElementById('_buscar')?.focus
            }
          } 
        }  
     }

     const actualizar = async()=>{
        setLoadingActualizar(true)
         const res = await APICALLER.actualizarSolicitudes(dataUser.token);
        setLoadingActualizar(false)
         console.log(res);
         if(res.success){
          getListaCB()
        }
     }







     
    return (<Box >
        <Stack gap={2} spacing={2} mb={4} direction='column' justifyContent='center'>
            <Text fontSize='2xl'>Solicitudes: </Text>
            <Stack direction={['column', 'row']} alignItems='center'>
            <Button rightIcon={<ChevronDownIcon />} variant='outline' size='sm' onClick={()=>{setModals('filtros',true)}}>
              Filtros
            </Button>
              <Input disabled={loading} id="_buscar" placeholder="Buscar por c.i. y presiona ENTER..."  onKeyUp={buscarEnter} />
              <Stack direction='row' alignItems='center'>
              <Button onClick={actualizar}  leftIcon={<RepeatIcon />} colorScheme='teal' variant='outline' size='xs' isDisabled={loadingActualizar} >
                {
                  loadingActualizar ? 'Actualizando...' : 'Actualizar'
                }
              </Button>
              </Stack>
            </Stack>
          </Stack>
        {loading ? 
        <Stack marginY={8} >
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
        </Stack>:
              <Box minW='max-content'>
                <TablaSolicitudes />
              </Box>
            }
        </Box>
    );
}

export default SolicitudesPage;