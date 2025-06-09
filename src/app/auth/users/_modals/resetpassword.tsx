import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, TextField } from "@mui/material"
import { useUsersContext } from "../provider";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import API from "@/services";

function ResetPasswordModal() {
    const { modals, handleModal, selectedAdmin, setSelectedAdmin } = useUsersContext();
    const { userData } = useAuth()

    const [form, setForm] = useState({
        password: '',
        password_confirmation: "",
    })

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: () =>
            API.admin.resetPassword(userData && userData.token, {
                ...form,
                id: selectedAdmin ? selectedAdmin?.id : 0,
            }),
        onSettled: (data) => {
            if (data && !data.success) {
                swal({
                    icon: "error",
                    title: "Error",
                    text: data.message,
                });
                return;
            }
            if (data && data.success) {
                handleModal("resetPassword");
                swal({
                    icon: "success",
                    title: "Contraseña restablecida",
                    text: "La contraseña se ha restablecido correctamente",
                });
                setForm({
                    password: "",
                    password_confirmation: "",
                });
                setSelectedAdmin(null);
                return;
            }
        },
    });


    const handleSubmit = async () => {
        if (form.password !== form.password_confirmation) {
            swal({
                icon: "error",
                title: "Error",
                text: "Las contraseñas no coinciden",
            });
            return;
        }
        await mutateAsync();
    }
    const close = () => {
        handleModal("resetPassword");
        setForm({
            password: "",
            password_confirmation: "",
        });
        setSelectedAdmin(null);
    }


    return <Dialog open={modals.resetPassword} onClose={() => { }} maxWidth="sm" fullWidth>
        <DialogTitle>Restablecer contraseña</DialogTitle>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid size={12}>
                    {isPending && <LinearProgress />}
                </Grid>
                <Grid size={12}>
                    <TextField disabled={isPending} fullWidth autoFocus
                        label="Contraseña" type="password" value={form.password} onChange={({ target }) => setForm({ ...form, password: target.value })} />

                </Grid>
                <Grid size={12}>
                    <TextField disabled={isPending} fullWidth label="Confirmar contraseña" type="password" value={form.password_confirmation} onChange={({ target }) => setForm({ ...form, password_confirmation: target.value })} />
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
}

export default ResetPasswordModal