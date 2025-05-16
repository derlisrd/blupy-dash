import Icon from "@/components/ui/icon";
import { UserDevice } from "@/services/dto/notificaciones/ficha";
import { IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { useNotificationHook } from "./provider";

interface DevicesTableProps {
  items: UserDevice[];
  //onSelected: (device: UserDevice) => void;
}

function DevicesTable({ items }: DevicesTableProps) {
  const { handleModal, setSelectedDevice } = useNotificationHook();
  return (
    <TableContainer sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Dispositivo</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Os</TableCell>
            <TableCell>Versión</TableCell>
            <TableCell>Ultima sesion</TableCell>
            <TableCell>Accion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow hover key={index}>
              <TableCell>{item.dispositivo}</TableCell>
              <TableCell>{item.modelo}</TableCell>
              <TableCell>{item.os}</TableCell>
              <TableCell>{item.version}</TableCell>
              <TableCell>{item.fechaUltimaSesion}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={0}>
                  <Tooltip title="Enviar Notificación" arrow>
                    <IconButton
                      onClick={() => {
                        setSelectedDevice(item);
                        handleModal("push");
                      }}
                    >
                      <Icon>brand-telegram</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Enviar whatsapp" arrow>
                    <IconButton
                      onClick={() => {
                        setSelectedDevice(item);
                        handleModal("wa");
                      }}
                    >
                      <Icon>brand-whatsapp</Icon>
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DevicesTable;
