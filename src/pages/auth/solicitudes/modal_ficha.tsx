import { Button, Image, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

import moment from "moment";
import { useSolicitudes } from "./usesolicitudes";
import { env } from "../../../config/env";
import { useSolicitudStore } from "./store";

function ModalFicha() {
    const {modals,setModals} = useSolicitudStore()
    const {form} = useSolicitudes() 

    const onClose = ()=>{ setModals('ficha',false)}

    return ( <Modal isOpen={modals.ficha} onClose={onClose} closeOnEsc size='xl' >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ficha de cliente</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List>
              <ListItem>
                <u>Nombre:</u> {form.name} {form.cedula}
              </ListItem>
              <ListItem>
                <u>Fecha de registro:</u> {moment.utc(form.created_at).format('HH:mm DD-MMM-YYYY')} 
              </ListItem>

            </List>
            <a href={env.PUBLIC_PATH+`/${form?.foto_ci_frente}`} target="_blank">
              <Image
                    boxSize='480px'
                    width='500px'
                    objectFit='cover'
                    src={env.PUBLIC_PATH+`/${form?.foto_ci_frente}`}
                    alt='Frontal'
                    />
              </a>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant='outline'>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  );
}

export default ModalFicha;