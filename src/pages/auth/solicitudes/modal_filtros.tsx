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
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import { useSolicitudes } from "./usesolicitudes";
import { useSolicitudStore } from "./store";

function ModalFiltros() {
  const { modals, setModals } = useSolicitudStore();
  const { setLista, setConteo, listaOriginal } = useSolicitudes();
  const { dataUser } = userDataHook();
  const [loading, setLoading] = useState(false);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [estadoId, setEstadoId] = useState("");

  const onClose = () => {
    setModals("filtros", false);
  };
  const limpiarFiltros = () => {
    setModals("filtros", false);
  };

  const enviar = async () => {
    setLoading(true);

    const res = await APICALLER.solicitudesPorFiltros({ token: dataUser.token, desde, hasta, estado_id: estadoId });
    setLoading(false);
    if (res.success) {
      setLista(res.results);
      listaOriginal.current = res.results;
      setConteo(res.results.length);
    }

    onClose();
  };

  return (
    <Modal isOpen={modals.filtros} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filtros de solicitudes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column" spacing="4">
            {loading && <Progress size="xs" isIndeterminate />}
            <InputGroup>
              <InputLeftAddon children="Desde:" />
              <Input type="date" name="desde" value={desde} onChange={(e) => setDesde(e.target.value)} placeholder="Desde" />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Hasta:" />
              <Input type="date" name="hasta" value={hasta} onChange={(e) => setHasta(e.target.value)} placeholder="Hasta" />
            </InputGroup>
            <Select
              value={estadoId}
              onChange={(e) => {
                setEstadoId(e.target.value);
              }}
              placeholder="Seleccionar estado"
              icon={<ChevronDownIcon />}
              size="md"
            >
              <option value="">Todos</option>
              <option value="7">Vigente</option>
              <option value="11">Rechazada</option>
              <option value="5">Contrato Pendiente</option>
              <option value="3">Pend. Aprobación</option>
            </Select>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={enviar}>
            Filtrar
          </Button>
          <Button variant="outline" onClick={limpiarFiltros}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalFiltros;
