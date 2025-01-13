import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Stack,
} from "@chakra-ui/react";
import { useSucursales } from "./Provider";

function ModalFiltros() {
  const { modal, setModal, desde, setDesde, hasta, setHasta, loading, punto, setPunto, getVentas } = useSucursales();

  const onClose = () => setModal({ ...modal, filtros: false });

  const validar = () => {
    if (punto !== "" && isNaN(Number(punto))) {
      return;
    }
    onClose();
    getVentas();
  };

  return (
    <Modal isOpen={modal.filtros} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filtrar por sucursal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column" spacing="4">
            {loading && <Progress size="xs" isIndeterminate />}
            <InputGroup>
              <InputLeftAddon children="Desde:" />
              <Input type="date" name="desde" value={desde ?? ""} onChange={(e) => setDesde(e.target.value)} placeholder="Desde" />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Hasta:" />
              <Input type="date" name="hasta" value={hasta ?? ""} onChange={(e) => setHasta(e.target.value)} placeholder="Hasta" />
            </InputGroup>
            <Input placeholder="Numero de sucursal" value={punto} onChange={(e) => setPunto(e.target.value)} />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={validar}>
            Filtrar
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalFiltros;
