import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Progress, Text } from "@chakra-ui/react";
import { useClienteProvider } from "./useclienteprovider";
import { useState } from "react";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import swal from "sweetalert";


function ModalPassword() {
    const {dataUser} = userDataHook()
    const {modals,setModals,form} = useClienteProvider()
    const [loading,setLoading] = useState<boolean>(false)
    const [pass,setPass] = useState('')
    const onClose = ()=> setModals({...modals,password:false})

    const enviar = async()=>{
        setLoading(true)
        const res = await APICALLER.reiniciarContrasena({password: pass, id: form.user_id, token: dataUser.token })
        setLoading(false)
        if(!res.success){
          swal({text: res.message, title:"Error", icon:'warning'})
          console.log(res)
          return
        }
        swal({text: res.message, title:"Exito", icon:'success'})
        onClose() 
        setPass('')
    }


    return <Modal isOpen={modals.password} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Reestablecer contraseña</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {loading && <Progress size='xs' isIndeterminate />}
        <Text fontSize='md' color='red'>TENGA EN CUENTA QUE ESTE MODULO SOLO ES PARA REESTABLECER LA CLAVE</Text>
        <Text fontSize='md'>Usuario: {form.cedula} {form.name}</Text>
        <Input mt={4} disabled={loading} value={pass} onChange={e=> setPass(e.target.value)} placeholder="Ingresa la contraseña" />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme='blue' disabled={loading} mr={3} onClick={enviar}>
          REESTABLECER
        </Button>
        <Button variant='outline' onClick={onClose}>Cancelar</Button>
      </ModalFooter>
    </ModalContent>
  </Modal> 
}

export default ModalPassword;