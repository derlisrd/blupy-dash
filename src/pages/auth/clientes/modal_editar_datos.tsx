import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack } from "@chakra-ui/react";
import { useClienteProvider } from "./useclienteprovider";
import { useState } from "react";
//import userDataHook from "../../../store/user_data_store";

function ModalEditarDatos() {
  //const { dataUser } = userDataHook();
  const [loading] = useState(true);
  const { modals, setModals } = useClienteProvider();

  const onClose = () => {
    setModals({ ...modals, editar: false });
  };

  return (
    <Modal isOpen={modals.editar} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar datos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Stack direction="column">
              <Skeleton h="10px" />
              <Skeleton h="10px" />
              <Skeleton h="10px" />
            </Stack>
          ) : (
            <Stack direction="column"></Stack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} variant="outline">
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalEditarDatos;
