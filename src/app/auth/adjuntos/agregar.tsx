import Icon from "@/components/ui/icon";
import useAddAdjunto from "@/core/hooks/adjuntos/useAddAdjunto";
import { Box, Button, Card, CardMedia, Container, Grid2 as Grid, IconButton, LinearProgress, TextField, Tooltip, Typography } from "@mui/material";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

function AgregarAdjunto() {

    const { id } = useParams<{ id: string }>();



    const { imagePreview, isDragActive, getInputProps, getRootProps, removeImage, subir, isPending, nombre, setNombre } = useAddAdjunto(id);

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
                    <Grid size={{ xs: 12, sm: 8 }}>
                        <TextField label="Nombre o tipo de adjunto" value={nombre} onChange={({ target }) => setNombre(target.value)} placeholder="Nombre o tipo de adjunto..." fullWidth />
                    </Grid>
                    <Grid size={12}>
                        <Button size="large" startIcon={<Icon>upload</Icon>} onClick={() => subir()}>
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