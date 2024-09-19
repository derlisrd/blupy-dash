import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from "@chakra-ui/react";
import {useState} from 'react'
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import swal from "sweetalert";
import { useSolicitudes } from "./usesolicitudes";
import { useSolicitudStore } from "./store";

function ModalSms() {
    const {modals,setModals} = useSolicitudStore()
    const {form} = useSolicitudes()
    const {dataUser} = userDataHook()
    const [loading,setLoading] = useState<boolean>(false)
    const [texto,setTexto] = useState('')
    const onClose = ()=> {
      setModals('sms',false)
      setTexto('')
    }

    const enviar = async()=>{
      if(texto===''){
        return false
      }
      setLoading(true)
      const res = await APICALLER.enviarSms({token: dataUser.token, body: { id: form.user_id, message: texto} })
      setLoading(false)
      if(!res.success){
        swal({icon:'error',text:'Ha ocurrido un error intente más tarde'})
        return
      }
      swal({title:'Correcto',icon:'success',text:'Mensaje enviado correctamente'})
      onClose()

    }

    return (<Modal isOpen={modals.sms} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enviar sms</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize='md'>{form.name} </Text>
            <Text fontSize='md'>{form.celular}</Text>
            <Textarea my={4} disabled={loading} value={texto} onChange={e=>setTexto(e.target.value)} placeholder='Ingresar el texto a enviar...' />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' disabled={loading} mr={3} onClick={enviar}>
              ENVIAR SMS
            </Button>
            <Button variant='outline' onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  );
}

export default ModalSms;