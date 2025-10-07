import { Button, Container, Grid2 as Grid, LinearProgress, Stack, Typography, TextField } from "@mui/material";
import { useState } from "react";

export default function Cobranzas() {

    const [text, setText] = useState('')

    return <Container>
        <h3>Notificaciones de cobranza</h3>
        <p>Gestionar las notificaciones de cobranzas por sms masivo difusión para clientes de BLUPY DIGITAL.</p>
        <Grid container spacing={2}>
            <Grid size={12}>
                <LinearProgress />
            </Grid>
            <Grid size={12}>
                <TextField fullWidth label="Ingrese el mensaje" value={text} helperText="Máximo 100 caracteres" multiline rows={4} onChange={e => setText(e.target.value)} />
            </Grid>
            <Grid size={12}>
                <Typography>Presiona para mensajes predefinidos:</Typography>
                <Stack direction="row" spacing={4}>
                    <Button variant="outlined" onClick={() => setText('')}>Plantilla de: Reclamar deuda de blupy digital</Button>
                    <Button variant="outlined" onClick={() => setText('')} >Plantilla de: Deuda vencida</Button>
                </Stack>
            </Grid>
            <Grid size={12}>
                <Button>
                    Enviar
                </Button>
            </Grid>
        </Grid>
    </Container>
}