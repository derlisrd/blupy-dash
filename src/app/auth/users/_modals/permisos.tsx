import { Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";
import { useUsersContext } from "../provider";
import Icon from "@/components/ui/icon";
import { useMutation, useQuery } from "@tanstack/react-query";
import API from "@/services";
import { useAuth } from "@/hooks/useAuth";
import { useMemo, useState, useEffect } from "react";
import swal from 'sweetalert'

type PermisosMapeados = {
    id: number;
    permiso_id: number;
    modulo: string;
    accion: string;
    checked: boolean;
}

function PermisosModal() {
    const { modals, handleModal, permisos, selectedAdmin } = useUsersContext()
    const { userData } = useAuth()
    const [permisosSelect, setPermisosSelect] = useState<PermisosMapeados[]>([]);

    const { data: permisosData, isLoading } = useQuery({
        queryKey: ["permisosByAdmin", selectedAdmin ? selectedAdmin.id : 0],
        queryFn: () => API.permisos.byAdmin(userData && userData.token, selectedAdmin ? selectedAdmin.id : 0),
        enabled: !!selectedAdmin,
        refetchOnWindowFocus: false
    });



    // Calcular permisos iniciales solo cuando cambian los datos de la API
    const permisosIniciales = useMemo(() => {
        if (!permisosData?.results || !permisos) return [];

        return permisos.map((i) => ({
            id: i.id,
            permiso_id: i.id,
            modulo: i.modulo,
            accion: i.accion,
            admin_id: selectedAdmin ? selectedAdmin.id : 0,
            checked: permisosData.results.some((j) => j.permiso_id === i.id),
        }));
    }, [permisosData?.results, permisos, selectedAdmin]);

    // Actualizar el estado solo cuando cambien los permisos iniciales
    useEffect(() => {
        if (permisosIniciales.length > 0) {
            setPermisosSelect(permisosIniciales);
        }
    }, [permisosIniciales]);

    // Función para manejar el cambio de checkbox
    const handleCheckboxChange = (permisoId: number) => {
        setPermisosSelect(prev =>
            prev.map(permiso =>
                permiso.id === permisoId
                    ? { ...permiso, checked: !permiso.checked }
                    : permiso
            )
        );
    };
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["revocar", "asignar"],
        mutationFn: async ({ id, asignados, revocados }: { id: number; asignados: number[]; revocados: number[] }) => {
            if (revocados.length > 0) {
                return API.permisos.revocar(userData && userData.token, id, revocados);
            }
            if (asignados.length > 0) {
                return API.permisos.asignar(userData && userData.token, id, asignados);
            }
        },
        onSuccess: (data) => {
            if (data && data.success) {
                swal({
                    title: "Permisos actualizados",
                    icon: "success",
                    timer: 2000,
                });
                handleModal("permisos");
            }
        }
    })
    // Función para guardar los permisos
    const handleSave = async () => {
        const permisosParaEnviar: number[] = [];
        const permisosRevocados: number[] = [];

        permisosSelect.forEach(permisoActual => {
            // Encontrar el estado inicial de este permiso
            const permisoInicial = permisosIniciales.find(p => p.id === permisoActual.id);

            if (permisoInicial) {
                // Si inicialmente era false y ahora es true = NUEVO PERMISO
                if (!permisoInicial.checked && permisoActual.checked) {
                    permisosParaEnviar.push(permisoActual.permiso_id);
                }
                // Si inicialmente era true y ahora es false = PERMISO REVOCADO
                else if (permisoInicial.checked && !permisoActual.checked) {
                    permisosRevocados.push(permisoActual.permiso_id);
                }
                // Si no cambió el estado, no se envía nada
            }
        });
        if (!selectedAdmin) return;
        await mutateAsync({ id: selectedAdmin?.id, asignados: permisosParaEnviar, revocados: permisosRevocados });
    };

    return (
        <Dialog open={modals.permisos} maxWidth="xs" onClose={() => handleModal("permisos")}>
            <DialogTitle>Permisos</DialogTitle>
            <DialogContent>
                {(isLoading || isPending) ? <LinearProgress /> :
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                        {permisosSelect.map((i, index) => (
                            <ListItem key={index}>
                                <ListItemIcon>
                                    <Icon>user</Icon>
                                </ListItemIcon>
                                <ListItemText
                                    primary={`Accion: ${i.accion}`}
                                    secondary={<Typography variant="caption">Modulo: {i.modulo}</Typography>}
                                />
                                <Switch
                                    checked={i.checked}
                                    size="small"
                                    onChange={() => handleCheckboxChange(i.id)}
                                />
                            </ListItem>
                        ))}
                    </List>
                }
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    startIcon={<Icon>arrow-narrow-left-dashed</Icon>}
                    onClick={() => handleModal("permisos")}
                >
                    Regresar
                </Button>
                <Button onClick={handleSave} endIcon={<Icon>device-floppy</Icon>}>
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PermisosModal;