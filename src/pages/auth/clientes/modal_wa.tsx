import { Button, Input, List, ListIcon, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress,  Textarea } from "@chakra-ui/react";
import { useClienteProvider } from "./useclienteprovider";
import {useState} from 'react'
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import swal from "sweetalert";
import { CheckCircleIcon } from "@chakra-ui/icons";

function ModalWa() {
    const {modals,setModals,form} = useClienteProvider()
    const {dataUser} = userDataHook()
    const [loading,setLoading] = useState<boolean>(false)
    const [titulo,setTitulo] = useState('')
    const [texto,setTexto] = useState('')
    const onClose = ()=> {
      setModals({...modals,wa:false})
      setTexto('')
      setTitulo('')
    }

    const enviar = async()=>{
      if(texto==='' || titulo===''){
        return false
      }
      setLoading(true)
      const res = await APICALLER.enviarWa({token: dataUser.token, body: { id: form.id, descripcion: texto, titulo: titulo} })
      setLoading(false)
      if(!res.success){
        swal({icon:'error',text:'Ha ocurrido un error intente más tarde'})
        return
      }
      swal({title:'Correcto',icon:'success',text:'Mensaje de whatsapp enviado correctamente'})
      onClose()

    }

    return (<Modal isOpen={modals.wa} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enviar whatsapp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading && <Progress size='xs' isIndeterminate />}
            <List>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                 CI: {form.cedula}
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                 {form.name}
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color='green.500' />
                {form.celular}
              </ListItem>
            </List>
            <Input mt={4} disabled={loading} value={titulo} onChange={e=> setTitulo(e.target.value)} placeholder="Ingresa el título" />
            <Textarea my={4} disabled={loading} value={texto} onChange={e=>setTexto(e.target.value)} placeholder='Ingresar el texto a enviar...' />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='green' disabled={loading} mr={3} onClick={enviar}>
              ENVIAR WA
            </Button>
            <Button variant='outline' onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  );
}

export default ModalWa;