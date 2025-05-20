import Icon from "@/components/ui/icon";
import useAddAdjunto from "@/core/hooks/adjuntos/useAddAdjunto";
import { Box, Button, Card, CardMedia, Container, Grid2 as Grid, IconButton, LinearProgress, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

function AgregarAdjunto() {

    const { id } = useParams<{ id: string }>();
    const { imagePreview, isDragActive, getInputProps, getRootProps, removeImage, subir, isPending, nombre, setNombre } = useAddAdjunto(id);

    const handleSubmit = async () => {
        if (nombre === "0") return swal({
            title: 'Error',
            icon: "error",
            text: "Debe seleccionar un tipo"
        })
        await subir();
    };

    return <Container>
        <Grid container mt={2} spacing={2}>
            <Grid size={12}>
                {isPending && <LinearProgress />}
            </Grid>
            <Grid size={12}>
                <Typography variant="h6">Agregar adjunto</Typography>
            </Grid>
            {imagePreview ? (
                <Fragment>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Card sx={{ position: "relative" }}>
                            <CardMedia component="img" height="280" image={imagePreview} alt="Imagen cédula" />
                            <Tooltip title="Eliminar" arrow placement="top">
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        top: 5,
                                        right: 5,
                                        background: "rgba(0,0,0,0.5)",
                                        color: "white",
                                    }}
                                    onClick={removeImage}
                                >
                                    <Icon>camera-x</Icon>
                                </IconButton>
                            </Tooltip>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Select sx={{ width: "100%" }} value={nombre} onChange={(e) => setNombre(e.target.value)}>
                            <MenuItem value="0" disabled >Seleccionar tipo</MenuItem>
                            <MenuItem value="cedula1">Cedula frente</MenuItem>
                            <MenuItem value="cedula2">Cedula dorso</MenuItem>
                            <MenuItem value="selfie">Selfie</MenuItem>
                            <MenuItem value="contrato">Contrato</MenuItem>
                            <MenuItem value="ande">Factura de Ande</MenuItem>
                            <MenuItem value="ingreso">Comprobante de ingreso</MenuItem>
                        </Select>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>

                    </Grid>
                    <Grid size={12}>
                        <Button size="large" startIcon={<Icon>upload</Icon>} onClick={() => handleSubmit()}>
                            Subir
                        </Button>
                    </Grid>
                </Fragment>
            ) : (
                <Grid size={{ xs: 12 }}>
                    <Box
                        {...getRootProps()}
                        borderRadius={2}
                        border={2}
                        padding={3}
                        sx={{ borderStyle: "dashed", cursor: "pointer", flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <input {...getInputProps()} />
                        <Icon size={48}>upload</Icon>
                        <Typography variant="h6" color="textSecondary">
                            {isDragActive ? "Suelta las imágenes aquí..." : "Arrastra y suelta imágenes aquí o haz clic para seleccionar"}
                        </Typography>
                    </Box>
                </Grid>
            )}
        </Grid>
    </Container>
}

export default AgregarAdjunto;