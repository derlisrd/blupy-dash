import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Text, Textarea } from "@chakra-ui/react";
import {useState} from 'react'
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import swal from "sweetalert";
import { useSolicitudes } from "./usesolicitudes";
import { useSolicitudStore } from "./store";

function ModalNoti() {
    const {modals,setModals} = useSolicitudStore()
    const {form} = useSolicitudes()
    const {dataUser} = userDataHook()
    const [loading,setLoading] = useState<boolean>(false)
    const [titulo,setTitulo] = useState('')
    const [texto,setTexto] = useState('')

    const onClose = ()=> {
      setModals('noti',false)
      setTexto('')
      setTitulo('')
    }

    const enviar = async()=>{
      if(texto==='' || titulo===''){
        return false
      }
      setLoading(true)
      const res = await APICALLER.enviarNoti({token: dataUser.token, body: { id: form.user_id, descripcion: texto, titulo: titulo} })
      setLoading(false)
      if(!res.success){
        swal({icon:'error',text:'Ha ocurrido un error intente más tarde'})
        return
      }
      swal({title:'Correcto',icon:'success',text:'Notificación enviada correctamente'})
      onClose()

    }

    return (<Modal isOpen={modals.noti} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enviar notificación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading && <Progress size='xs' isIndeterminate />}
            <Text fontSize='md'>Para: {form.cedula} {form.name}</Text>
            <Input mt={4} disabled={loading} value={titulo} name="titulo" onChange={e=> setTitulo(e.target.value)} placeholder="Ingresa el título" />
            <Textarea my={4} disabled={loading} value={texto} name="descripcion" onChange={e=>setTexto(e.target.value)} placeholder='Ingresar el texto a enviar...' />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' disabled={loading} mr={3} onClick={enviar}>
              ENVIAR NOTIFICACION
            </Button>
            <Button variant='outline' onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  );
}

export default ModalNoti;