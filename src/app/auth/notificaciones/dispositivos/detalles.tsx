import { useLocation, useNavigate } from "react-router-dom"; // Importamos useNavigate
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    Chip,
    Divider,
    Button,
    Grid2 as Grid
} from '@mui/material';
import Icon from "@/components/ui/icon";
import { DevicesResults } from "@/services/dto/notificaciones/devices";
import { useMutation } from "@tanstack/react-query";
import API from "@/services";
import swal from 'sweetalert'; // Importamos sweetalert

export default function DetalleDispositivo() {
    const location = useLocation();

    if (!location.state) return null;

    return <UserReviewCard data={location.state.device} />
}

const UserReviewCard = ({ data }: { data: DevicesResults }) => {
    const navigate = useNavigate(); // Hook para volver atrás

    const { mutate, isPending } = useMutation({
        mutationKey: ['aprobar', data.id],
        mutationFn: () => API.devices.aprobar(data.id),
        onSuccess: () => {
            // 1. Alerta de éxito
            swal("¡Aprobado!", "El dispositivo ha sido validado correctamente.", "success")
                .then(() => {
                    // 2. Volver atrás después de cerrar el alert
                    navigate(-1);
                });
        },
        onError: (error: any) => {
            // Alerta de error
            swal("Error", "No se pudo aprobar el dispositivo: " + (error.message || "Error desconocido"), "error");
        }
    });

    const validar = () => {
        // Usamos swal para confirmar ANTES de ejecutar la mutación (opcional pero recomendado)
        swal({
            title: "¿Estás seguro?",
            text: `Vas a aprobar al usuario ${data.name}`,
            icon: "warning",
            buttons: ["Cancelar", "Sí, aprobar"],
            dangerMode: false,
        }).then((willApprove) => {
            if (willApprove) {
                mutate();
            }
        });
    };

    return (
        <Card sx={{ maxWidth: 800, margin: '20px auto', borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                {/* Cabecera */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight="bold">
                        Revisión de Usuario {data.cedula} {data.name}
                    </Typography>
                    <Chip
                        icon={data.aprobado ? <Icon size={24}>square-rounded-check</Icon> : <Icon size={24}>alert-circle</Icon>}
                        label={data.aprobado ? "Aprobado" : "Pendiente"}
                        color={data.aprobado ? "success" : "warning"}
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Información del Dispositivo */}
                <Box mb={3}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        DATOS DEL DISPOSITIVO
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Icon size={48}>device-mobile</Icon>
                        <Typography variant="body1">
                            {data.model} ({data.os}) - Build {data.build_version}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        IP: {data.ip} | Celular: {data.celular}
                    </Typography>
                </Box>

                {/* Galería de Documentos */}
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                    DOCUMENTOS CARGADOS
                </Typography>
                <Grid container spacing={2}>
                    {[
                        { label: 'Selfie', url: data.cedula_selfie_url },
                        { label: 'Cédula Frente', url: data.cedula_frente_url },
                        { label: 'Cédula Dorso', url: data.cedula_dorso_url }
                    ].map((img, index) => (
                        <Grid size={{ xs: 12, sm: 4 }} key={index}>
                            <Box textAlign="center">
                                <Typography variant="caption">{img.label}</Typography>
                                <Avatar
                                    src={img.url}
                                    variant="rounded"
                                    sx={{ width: '100%', height: 150, mt: 1, border: '1px solid #eee', objectFit: 'cover' }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Acciones */}
                <Box mt={4} display="flex" gap={2}>
                    <Button
                        variant="contained"
                        color="success" // Cambiado a success para diferenciar
                        onClick={validar}
                        fullWidth
                        disabled={isPending || data.aprobado}
                    >
                        {isPending ? "Aprobando..." : "Aprobar Usuario"}
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        onClick={() => navigate(-1)} // Acción para cancelar
                    >
                        Cancelar
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};