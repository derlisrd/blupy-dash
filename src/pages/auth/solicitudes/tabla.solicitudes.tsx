import { Badge, IconButton, Text, Button, Stack, Tooltip, Checkbox } from "@chakra-ui/react";
import { solicitudesData } from "../../../models/solicitudes_data_model";
import { useSolicitudes } from "./usesolicitudes";
import { CSVLink } from "react-csv";
import { Column, Table } from "react-virtualized";
import { BellIcon, CalendarIcon, ChatIcon, EmailIcon, RepeatIcon } from "@chakra-ui/icons";
import { useSolicitudStore } from "./store";
import { estados, retornaColor, solicitado, tipos } from "./tabla.helpers";
import useTablaSolicitudes from "./usetabla.solicitudes";
import moment from "moment";

function TablaSolicitudes() {
  const { setModals } = useSolicitudStore();
  const { setForm, lista, actualizarSolicitud, filtros, conteo, setFiltros } = useSolicitudes();
  const { ancho, cabeceras } = useTablaSolicitudes();

  const openModal = (f: solicitudesData, modal: string) => {
    if (f) {
      setForm(f);
      setModals(modal, true);
    }
  };

  const filteredList = lista
    .filter((e: solicitudesData) => {
      if (filtros.externos === 1) {
        return e.asofarma === 0 && e.funcionario === 0;
      }

      if (filtros.funcionario === "1") {
        return e.funcionario === 1;
      }
      if (filtros.asofarma === "1") {
        return e.asofarma === 1;
      }
      // If not active, show all records
      return true;
    })
    .map((e: solicitudesData) => ({
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

  return (
    <>
      <Stack direction="row" justifyContent="center" alignItems="center" gap={12} paddingBottom={3}>
        <Checkbox size="sm" onChange={() => setFiltros({ ...filtros, externos: filtros.externos === 1 ? 0 : 1 })} checked={filtros.externos === 1}>
          Externos
        </Checkbox>
        <Checkbox size="sm" onChange={() => setFiltros({ ...filtros, funcionario: filtros.funcionario === "1" ? "0" : "1" })} checked={filtros.funcionario === "1"}>
          Funcionario
        </Checkbox>
        <Checkbox size="sm" onChange={() => setFiltros({ ...filtros, asofarma: filtros.asofarma === "1" ? "0" : "1" })} checked={filtros.asofarma === "1"}>
          Aso
        </Checkbox>
        <Text fontSize="small" as="b" color="tomato">
          Total: {conteo}{" "}
        </Text>
        <Text fontSize="small" as="b">
          Desde: {filtros.desde} Hasta: {filtros.hasta} | Producto: {tipos[parseInt(filtros.tipo)]} | Estado: {estados[filtros.estado_id]}
        </Text>
        <Button size="sm">
          <CSVLink headers={cabeceras} data={filteredList} filename={"dashboard"}>
            EXCEL
          </CSVLink>
        </Button>
      </Stack>
      <Table
        width={ancho}
        autoWidth
        height={window.innerHeight - 255}
        headerHeight={20}
        rowHeight={30}
        rowCount={filteredList.length}
        rowGetter={({ index }) => filteredList[index]}
      >
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
