import { Button,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from "@chakra-ui/react";
import {useState} from 'react'

//import userDataHook from "../../../store/user_data_store";

import { useSolicitudes } from "./usesolicitudes";
import { useSolicitudStore } from "./store";

function ModalWa() {
  const {modals,setModals} = useSolicitudStore()
    const {form} = useSolicitudes()
    //const {dataUser} = userDataHook()
    //const [loading,setLoading] = useState<boolean>(false)
    const [texto,setTexto] = useState('')
    const onClose = ()=> {
      setModals('wa',false)
      setTexto('')
    }

    const enviar = async()=>{
      
      //swal({title:'Correcto',icon:'success',text:form.celular})
      onClose()

    }

    return (<Modal isOpen={modals.wa} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enviar whatspapp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize='md'>{form.name} </Text>
            <Text fontSize='md'>{form.celular}</Text>
            <Textarea my={4}  value={texto} onChange={e=>setTexto(e.target.value)} placeholder='Ingresar el texto a enviar...' />
          </ModalBody>
          <ModalFooter>
            <Button variant='outline' colorScheme='green' onClick={enviar} >
            <a href={`https://api.whatsapp.com/send/?phone=595${form.celular}&text=${texto}&type=phone_number&app_absent=0`} target="_blank" >ENVIAR</a>
            </Button>

            <Button colorScheme='blue' ml={3} onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  );
}

export default ModalWa;