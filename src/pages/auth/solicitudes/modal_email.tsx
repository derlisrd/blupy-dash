import { Button, Input, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Text, Textarea } from "@chakra-ui/react";
import { useSolicitudes } from "./usesolicitudes";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import { useState } from "react";
import swal from "sweetalert";
import { useSolicitudStore } from "./store";


function ModalEmail() {
    const {modals,setModals} = useSolicitudStore()
    const {form} = useSolicitudes() 
    const [loading,setLoading] = useState<boolean>(false)
    const {dataUser} = userDataHook()
    const [titulo,setTitulo] = useState('')
    const [texto,setTexto] = useState('')
    const onClose = ()=>{ setModals('email',false)}
    
    const enviar = async()=>{
      setLoading(true)
      const res = await APICALLER.enviarEmail({token:dataUser.token,body:{ id: form.user_id, descripcion: texto, titulo: titulo}})
      setLoading(false)
      if(!res.success){
        swal({icon:'error',text:'Ha ocurrido un error intente más tarde'})
        return
      }
      swal({title:'Correcto',icon:'success',text:'Email enviado correctamente'})
      onClose()
    }
    return ( <Modal isOpen={modals.email} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enviar Email</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List>
            <ListItem>
              <u>Nombre:</u> {form.name} 
            </ListItem>
            <ListItem><u>Email:</u> {form.email}</ListItem>
          </List>
          {loading && <Progress size='xs' isIndeterminate />}
          <Text fontSize='md'>Para: {form.cedula} {form.name} </Text>
          <Input mt={4} disabled={loading} value={titulo} onChange={e=> setTitulo(e.target.value)} placeholder="Ingresa el título" />
          <Textarea my={4} disabled={loading} value={texto} onChange={e=>setTexto(e.target.value)} placeholder='Ingresar el texto a enviar...' />

        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' disabled={loading} mr={3} onClick={enviar}>
            ENVIAR EMAIL
          </Button>
          <Button onClick={onClose} variant='outline'>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal> );
}

export default ModalEmail;