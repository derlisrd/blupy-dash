import Icon from "@/components/ui/icon";
import { UserDevice } from "@/services/dto/notificaciones/ficha";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";

interface DevicesTableProps {
  items: UserDevice[];
  onSelected: (device: UserDevice) => void;
}

function DevicesTable({ items, onSelected }: DevicesTableProps) {
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
                <Tooltip title="Enviar Notificación" arrow>
                  <IconButton
                    onClick={() => {
                      onSelected(item);
                    }}
                  >
                    <Icon>brand-telegram</Icon>
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DevicesTable;
