import { Button, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import { useSolicitudes } from "./usesolicitudes";
import { useSolicitudStore } from "./store";

function ModalFiltros() {
    const {modals,setModals} = useSolicitudStore()
    const {setLista,filtros,setFiltros,setConteo,listaOriginal} = useSolicitudes()
    const {dataUser} = userDataHook()
    const [loading,setLoading]= useState(false)
    const initialFiltros = {
      desde:'',
      hasta:'',
      estado_id:'',
      tipo:'',
      asofarma:'',
      funcionario:''
    }
    
    const onClose = ()=> {
        setModals('filtros',false)    
    }
    const limpiarFiltros = ()=>{ setFiltros(initialFiltros); setModals('filtros',false)  }
    
    const enviar = async()=>{
      setLoading(true)
      
      const res = await APICALLER.solicitudesPorFiltros({token: dataUser.token, filtros })
      setLoading(false)
      if(res.success){
        setLista(res.results)
        listaOriginal.current = res.results
        setConteo(res.results.length)
      }
      
      onClose()
    }

    return (
    <Modal isOpen={modals.filtros} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtros</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction='column' spacing='4'>
            {loading && <Progress size='xs' isIndeterminate />}
            <InputGroup>
              <InputLeftAddon children='Desde:' />
              <Input type="date" name="desde" value={filtros.desde} onChange={e=>{ setFiltros({...filtros, desde: e.target.value}) }} placeholder="Desde" />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children='Hasta:' />
              <Input type="date" name="hasta" value={filtros.hasta} onChange={e=>{ setFiltros({...filtros, hasta: e.target.value}) }}  placeholder="Hasta" />
            </InputGroup>
              <Select value={filtros.estado_id} onChange={(e)=>{ setFiltros({...filtros,estado_id:e.target.value});}} placeholder='Seleccionar estado' icon={<ChevronDownIcon />}  size='md'>
                <option value=''>Todos</option>
                <option value='7'>Vigente</option>
                <option value='11'>Rechazada</option>
                <option value='5'>Contrato Pendiente</option>
                <option value='3'>Pend. Aprobación</option>
              </Select>
              <Select onChange={(e)=>{ setFiltros({...filtros,tipo:e.target.value});
              }} placeholder='Seleccionar producto' icon={<ChevronDownIcon />} value={filtros.tipo}  size='md'>
                <option value=''>Todos</option>
                <option value='0'>Solo registro</option>
                <option value='1'>Solicitud línea de crédito</option>
                <option value='2'>Adicionales</option>
                <option value='3'>Ampliación</option>
              </Select>
              <RadioGroup onChange={(e)=>{ setFiltros({...filtros,asofarma: e}) }} value={filtros.asofarma}>
                <Stack direction='row'>
                  <Radio value=''>Todos</Radio>
                  <Radio value='0'>Externos</Radio>
                  <Radio value='1'>Farma</Radio>
                </Stack>
              </RadioGroup>
              <RadioGroup onChange={(e)=>{ setFiltros({...filtros,funcionario: e}) }} value={filtros.funcionario}>
                <Stack direction='row'>
                  <Radio value=''>Todos</Radio>
                  <Radio value='1'>Funcionarios</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
         </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue'  mr={3} onClick={enviar}>
              Filtrar
            </Button>
            <Button variant='outline' onClick={limpiarFiltros}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> );
}

export default ModalFiltros;