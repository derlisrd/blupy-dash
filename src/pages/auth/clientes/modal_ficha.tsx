import { Button, Image, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Stack } from "@chakra-ui/react";
import { useClienteProvider } from "./useclienteprovider";
import moment from "moment";
import { useState, useEffect, useCallback } from "react";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import { env } from "../../../config/env";

function ModalFicha() {
  const { dataUser } = userDataHook();
  const [loading, setLoading] = useState(true);
  const { modals, setModals, form } = useClienteProvider();
  const initialDatos = { foto_ci_frente: "" };
  const [datos, setDatos] = useState(initialDatos);
  const onClose = () => {
    setModals({ ...modals, ficha: false });
    setDatos(initialDatos);
  };

  const getInfo = useCallback(async () => {
    if (modals.ficha) {
      const res = await APICALLER.fichaCliente({ token: dataUser.token, id: form.id });
      if (res.success) {
        const f = res.results;
        setDatos({
          foto_ci_frente: f.foto_ci_frente,
        });
      }
    }
    setLoading(false);
  }, [dataUser, form, modals.ficha]);

  useEffect(() => {
    const ca = new AbortController();
    let isA = true;
    isA && getInfo();
    return () => {
      isA = false;
      ca.abort();
    };
  }, [getInfo]);

  return (
    <Modal isOpen={modals.ficha} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ficha de cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {loading ? (
            <Stack direction="column">
              <Skeleton h="10px" />
              <Skeleton h="10px" />
              <Skeleton h="10px" />
            </Stack>
          ) : (
            <Stack direction="column">
              <List>
                <ListItem>
                  <u>Nombre:</u> {form.name}
                </ListItem>
                <ListItem>
                  <u>Cedula:</u> {form.cedula}
                </ListItem>
                <ListItem>
                  <u>Email:</u> {form.email}
                </ListItem>
                <ListItem>
                  <u>Telef:</u> {form.celular}
                </ListItem>
                <ListItem>
                  <u>Fecha de registro:</u> {moment.utc(form.created_at).format("HH:mm DD-MMM-YYYY")}
                </ListItem>
              </List>
              <Image boxSize="360px" objectFit="cover" src={env.PUBLIC_PATH + `${datos?.foto_ci_frente}`} alt="Frontal" />
            </Stack>
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

export default ModalFicha;
