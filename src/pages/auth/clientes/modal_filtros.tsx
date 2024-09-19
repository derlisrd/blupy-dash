import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Stack, Switch } from "@chakra-ui/react";
import { useClienteProvider } from "./useclienteprovider";




function ModalFiltros() {

    const {modals,setModals,loading,filtros,setFiltros,filtrarClientes} = useClienteProvider()


    const onClose = ()=> {
        setModals({...modals,filtros:false})
      }
    const enviar = async()=>{
      filtrarClientes()
      onClose()
    }

    return (
    <Modal isOpen={modals.filtros} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filtros</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction='column'>
            {loading && <Progress size='xs' isIndeterminate />}
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='todos' mb='0'>
                Traer por fecha
              </FormLabel>
              <Switch id='todos'  isChecked={!filtros.todos} onChange={()=>{ setFiltros({...filtros,todos: !filtros.todos})} } />
            </FormControl>
            {
              !filtros.todos && 
              <>
                <InputGroup>
                <InputLeftAddon children='Desde:' />
                <Input type="date" name="desde" value={filtros.desde} onChange={e=>{ setFiltros({...filtros, desde: e.target.value}) }} placeholder="Desde" />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='Hasta:' />
                <Input type="date" name="hasta" value={filtros.hasta} onChange={e=>{ setFiltros({...filtros, hasta: e.target.value}) }}  placeholder="Hasta" />
              </InputGroup>
              </>
            }
            
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='asofarma' mb='0'>
                Aso de Farma
              </FormLabel>
              <Switch id='asofarma' isChecked={filtros.asofarma ==='1'} onChange={()=>{ setFiltros({...filtros,asofarma: filtros.asofarma === '1' ? '0':'1'})} } />
            </FormControl>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='funcionario' mb='0'>
                Funcionario
              </FormLabel>
              <Switch id='funcionario' isChecked={filtros.funcionario === '1'} onChange={()=>{ setFiltros({...filtros,funcionario: filtros.funcionario === '1' ? '0':'1'})} } />
            </FormControl>

            
            </Stack>
         </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue'  mr={3} onClick={enviar}>
              Filtrar
            </Button>
            <Button variant='outline' onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> );
}

export default ModalFiltros;