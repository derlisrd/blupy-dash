import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, MenuItem, Select, TextField } from "@mui/material";
import { useUsersContext } from "../provider";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormAddUserType } from "@/core/types/formadduser";
import API from "@/services";
import { useAuth } from "@/hooks/useAuth";
import { AdminResults } from "@/services/dto/auth/admin";



function AddModal() {
    const queryClient = useQueryClient();

    const { modals, handleModal } = useUsersContext();
    const { userData } = useAuth()
    const [form, setForm] = useState<FormAddUserType>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
    });

    const close = () => {
        handleModal("add");
        setForm({
            name: "",
            email: "",
            password: "",
            role: "",
            password_confirmation: "",
        });
    }

    const { isPending, mutateAsync } = useMutation({
        mutationKey: ["addUser"],
        mutationFn: () => API.admin.add(userData && userData.token, form),
        onSettled: (data) => {
            if (data && !data.success) {
                swal({
                    icon: "error",
                    title: "Error",
                    text: data.message,
                });
                return
            }
            if (data && data.results) {
                // Actualizar la cache agregando el nuevo usuario
                queryClient.invalidateQueries({ queryKey: ["users"] });
            }
            setForm({ name: "", email: "", password: "", role: "", password_confirmation: "" });
            handleModal("add");


        },
    })

    const handleSubmit = async () => {
        let error = {
            name: false,
            email: false,
            password: false,
            role: false,
        }
        if (form.name.length < 3) {
            error.name = true;
        }
        if (form.email.length < 3) {
            error.email = true;
        }
        if (form.password.length < 3) {
            error.password = true;
        }
        if (form.role === "") {
            error.role = true;
        }
        if (form.password !== form.password_confirmation) {
            error.password = true;
        }
        if (Object.values(error).some((value) => value)) {
            return;
        }
        await mutateAsync();
    }

    return (
        <Dialog open={modals.add} maxWidth="xs" onClose={close}>
            <DialogTitle>Agregar usuario</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        {isPending && <LinearProgress />}
                    </Grid>
                    <Grid size={12}>
                        <TextField disabled={isPending} fullWidth autoFocus label="Nombre" value={form.name} onChange={({ target }) => setForm({ ...form, name: target.value })} />
                    </Grid>
                    <Grid size={12}>
                        <TextField disabled={isPending} fullWidth label="Correo" type="email" value={form.email} onChange={({ target }) => setForm({ ...form, email: target.value })} />
                    </Grid>
                    <Grid size={12}>
                        <TextField disabled={isPending} fullWidth label="Contraseña" type="password" value={form.password} onChange={({ target }) => setForm({ ...form, password: target.value })} />
                    </Grid>
                    <Grid size={12}>
                        <TextField disabled={isPending} fullWidth label="Repertir contraseña" type="password" value={form.password_confirmation} onChange={({ target }) => setForm({ ...form, password_confirmation: target.value })} />
                    </Grid>
                    <Grid size={12}>
                        <Select disabled={isPending} fullWidth label="Rol" onChange={({ target }) => setForm({ ...form, role: target.value as "admin" | "moderator" })} value={form.role}>
                            <MenuItem value="" disabled>
                                Seleccionar rol
                            </MenuItem>
                            <MenuItem value="admin">Administrador</MenuItem>
                            <MenuItem value="moderator">Moderador</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={close} startIcon={<Icon>arrow-narrow-left-dashed</Icon>}>
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} endIcon={<Icon>device-floppy</Icon>}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddModal;