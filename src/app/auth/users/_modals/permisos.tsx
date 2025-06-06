import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";
import { useUsersContext } from "../provider";
import Icon from "@/components/ui/icon";

function PermisosModal() {
    const { modals, handleModal, permisos } = useUsersContext()

    return (
        <Dialog open={modals.permisos} maxWidth="xs" onClose={() => handleModal("permisos")}>
            <DialogTitle>Permisos</DialogTitle>
            <DialogContent>
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    {permisos.map((i, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <Icon>user</Icon>
                            </ListItemIcon>
                            <ListItemText primary={`Accion: ${i.accion}`} secondary={<Typography variant="caption">Modulo: {i.modulo}</Typography>} />
                            <Switch checked size="small" />
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" startIcon={<Icon>arrow-narrow-left-dashed</Icon>} onClick={() => handleModal("permisos")}>
                    Regresar
                </Button>
                <Button onClick={() => { }} endIcon={<Icon>device-floppy</Icon>}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PermisosModal;