import { useLocation } from "react-router-dom";
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
export default function DetalleDispositivo() {

    const location = useLocation();

    if (!location.state) return (<></>)

    return <UserReviewCard data={location.state.device} />
}




const UserReviewCard = ({ data }: { data: DevicesResults }) => {

    const { mutateAsync } = useMutation({
        mutationKey: ['aprobar', data.id],
        mutationFn: () => API.devices.aprobar(data.id)
    })

    const validar = async () => {
        await mutateAsync()
    }


    return (
        <Card sx={{ maxWidth: 800, margin: '20px auto', borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                {/* Cabecera: Estado y Título */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" fontWeight="bold">
                        Revisión de Usuario ID: {data.user_id}
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
                                    sx={{ width: '100%', height: 150, mt: 1, border: '1px solid #eee' }}
                                />
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Acciones */}
                <Box mt={4} display="flex" gap={2}>
                    <Button variant="contained" color="primary" onClick={validar} fullWidth>
                        Aprobar Usuario
                    </Button>
                    <Button variant="outlined" color="error" fullWidth>
                        Rechazar
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

