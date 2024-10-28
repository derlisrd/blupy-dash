import { Badge, IconButton, Text, Button, Stack, Tooltip, Checkbox } from "@chakra-ui/react";
import { solicitudesData } from "../../../models/solicitudes_data_model";
import { useSolicitudes } from "./usesolicitudes";
import moment from "moment";
import { APICALLER } from "../../../services/api";
import userDataHook from "../../../store/user_data_store";
import swal from "sweetalert";
import { CSVLink } from "react-csv";
import { Column, Table } from "react-virtualized";
import { BellIcon, CalendarIcon, ChatIcon, EmailIcon, RepeatIcon } from "@chakra-ui/icons";
import { useSolicitudStore } from "./store";
import { estados, retornaColor, solicitado, tipos } from "./tabla.helpers";

function TablaSolicitudes() {
  const { setModals } = useSolicitudStore();
  const { setForm, lista, setLista, filtros, conteo, setFiltros } = useSolicitudes();
  const { dataUser } = userDataHook();

  const cabeceras: { label: string; key: string }[] = [
    { label: "id", key: "id" },
    { label: "cedula", key: "cedula" },
    { label: "Nombre", key: "name" },
    { label: "Celular", key: "celular" },
    { label: "Solicitado", key: "solicitado" },
    { label: "Fecha", key: "fecha" },
  ];

  const actualizarSolicitud = async (e: solicitudesData) => {
    const res = await APICALLER.actualizarSolicitud(dataUser.token, e.codigo);
    if (res.success) {
      const copia: solicitudesData[] = [...lista];
      const index = copia.findIndex((e) => e.id === res.results.id);
      copia[index].estado = res.results.estado;
      setLista(copia);
      swal({ title: "Actualizado", text: "Estado de solicitud actualizada" });
    }
  };
  const openModal = (f: solicitudesData, modal: string) => {
    if (f) {
      setForm(f);
      setModals(modal, true);
    }
  };

  const list = lista.map((e: solicitudesData) => ({
    id: e.id,
    name: e.name,
    cedula: e.cedula,
    celular: e.celular,
    codigo: e.codigo,
    fecha: moment(e.created_at).format("DD-MMM-YYYY HH:mm"),
    aso: e.asofarma,
    estado: e.estado,
    solicito: { solicito: solicitado[e.solicitud_credito]["label"], tipo: e.tipo, credito: e.solicitud_credito },
    farma: e.funcionario,
    tipo: tipos[e.tipo],
    accion: e,
  }));

  const ancho = window.innerWidth > 1380 ? 1380 : window.innerWidth - 60;

  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center" gap={12} paddingBottom={3}>
        <Checkbox size="sm" checked={filtros.funcionario === "1"}>
          Funcionario
        </Checkbox>
        <Text fontSize="small" as="b" color="tomato">
          Total: {conteo}{" "}
        </Text>
        <Text fontSize="small" as="b">
          Desde: {filtros.desde} Hasta: {filtros.hasta} | Producto: {tipos[parseInt(filtros.tipo)]} | Estado: {estados[filtros.estado_id]}
        </Text>
        <Button size="sm">
          <CSVLink headers={cabeceras} data={list} filename={"dashboard"}>
            EXCEL
          </CSVLink>
        </Button>
      </Stack>
      <Table width={ancho} autoWidth height={window.innerHeight - 255} headerHeight={20} rowHeight={30} rowCount={lista.length} rowGetter={({ index }) => list[index]}>
        <Column headerRenderer={({ dataKey }) => <div>{dataKey}</div>} dataKey="codigo" label="Contrato" width={80} />
        <Column dataKey="cedula" label="CI" width={90} />
        <Column dataKey="name" label="Nombre" width={250} />
        <Column
          dataKey="estado"
          label="Estado"
          width={140}
          cellRenderer={({ cellData: e }) => (
            <Badge colorScheme={retornaColor(e)}>
              <small>{e}</small>
            </Badge>
          )}
        />
        <Column
          dataKey="solicito"
          label="S"
          width={78}
          cellRenderer={({ cellData: e }) =>
            e.tipo == 0 ? (
              <Badge>
                <small>{e.solicito}</small>
              </Badge>
            ) : (
              ""
            )
          }
        />
        <Column dataKey="farma" label="Farma" width={78} cellRenderer={({ cellData: e }) => (e == 1 ? <p className="FarmaFuncionario">Funcionario</p> : <p>Externo</p>)} />
        <Column dataKey="aso" label="Aso" width={50} cellRenderer={({ cellData: e }) => (e == 1 ? <p className="AsoBlupy">Aso</p> : <p>No aso</p>)} />
        <Column dataKey="tipo" label="Producto" width={120} />
        <Column dataKey="fecha" label="Fecha" width={130} />
        <Column
          dataKey="accion"
          label="O"
          width={160}
          cellRenderer={({ cellData: e }) => (
            <Stack direction="row" gap={0.5}>
              <Tooltip placement="top" hasArrow label="Ficha">
                <IconButton
                  onClick={() => {
                    openModal(e, "ficha");
                  }}
                  aria-label="Ficha"
                  variant="outline"
                  size="xs"
                  icon={<CalendarIcon color="blue.500" />}
                />
              </Tooltip>
              <Tooltip placement="top" hasArrow label="Actualizar">
                <IconButton
                  onClick={() => {
                    actualizarSolicitud(e);
                  }}
                  aria-label="Ficha"
                  variant="outline"
                  size="xs"
                  icon={<RepeatIcon color="green.500" />}
                />
              </Tooltip>
              <Tooltip placement="top" hasArrow label="Enviar sms">
                <IconButton
                  onClick={() => {
                    openModal(e, "sms");
                  }}
                  aria-label="Ficha"
                  variant="outline"
                  size="xs"
                  icon={<ChatIcon color="blue.300" />}
                />
              </Tooltip>
              <Tooltip placement="top" hasArrow label="Enviar notificacion">
                <IconButton
                  onClick={() => {
                    openModal(e, "noti");
                  }}
                  aria-label="Ficha"
                  variant="outline"
                  size="xs"
                  icon={<BellIcon color="red.500" />}
                />
              </Tooltip>
              <Tooltip placement="top" hasArrow label="Enviar email">
                <IconButton
                  onClick={() => {
                    openModal(e, "email");
                  }}
                  aria-label="Ficha"
                  variant="outline"
                  size="xs"
                  icon={<EmailIcon color="gray.500" />}
                />
              </Tooltip>
            </Stack>
          )}
        />
      </Table>
    </>
  );
}

export default TablaSolicitudes;

{
  /* <Menu>
              <MenuButton as={IconButton} size='xs' color='white' backgroundColor='blue.500' icon={<ChevronDownIcon />} />
              <MenuList>
                <MenuItem onClick={()=>{openModal(e,'ficha')}}>Ver ficha</MenuItem>
                <MenuItem onClick={()=>{openModal(e,'wa')}}>Enviar whatsapp</MenuItem>
                <MenuItem onClick={()=>{openModal(e,'sms')}}>Enviar sms</MenuItem>
                <MenuItem onClick={()=>{openModal(e,'noti')}}>Enviar notificación</MenuItem>
                <MenuItem onClick={()=>{openModal(e,'email')}}>Enviar email</MenuItem>
                <MenuItem onClick={()=>{actualizarSolicitud(e)}}>Actualizar solicitud</MenuItem>
              </MenuList>
                </Menu> */
}
