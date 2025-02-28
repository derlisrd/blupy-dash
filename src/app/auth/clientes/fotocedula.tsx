import useFotoCedula from "@/core/hooks/clientes/useFotoCedula";
import { Box, Button, Card, CardMedia, Container, Grid2 as Grid, Icon, IconButton, Typography } from "@mui/material";
import { Fragment } from "react";

import { useLocation } from "react-router-dom";

const FotoCedula = () => {
  const location = useLocation();
  const cliente = location.state?.cliente;

  const { imagePreview, isDragActive, getInputProps, getRootProps, removeImage } = useFotoCedula({ id: String(cliente.id), foto_cedula: null });

  if (!cliente) return <p>No hay datos de cliente.</p>;

  return (
    <Container>
      <h2>Actualizar foto de cédula</h2>
      <Grid container spacing={1}>
        {imagePreview ? (
          <Fragment>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card sx={{ position: "relative" }}>
                <CardMedia component="img" height="280" image={imagePreview} alt="Imagen cédula" />
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
                  <Icon>delete</Icon>
                </IconButton>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Button variant="contained" color="primary" onClick={() => {}}>
                Subir
              </Button>
            </Grid>
          </Fragment>
        ) : (
          <Grid size={{ xs: 12 }}>
            <Box {...getRootProps()} borderRadius={2} border={2} padding={3} sx={{ borderStyle: "dashed", cursor: "pointer" }}>
              <input {...getInputProps()} />
              <Icon>cloud</Icon>
              <Typography variant="h6" color="textSecondary">
                {isDragActive ? "Suelta las imágenes aquí..." : "Arrastra y suelta imágenes aquí o haz clic para seleccionar"}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default FotoCedula;
