import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { Container, Grid2, LinearProgress, TextField, Button, Table, TableHead, TableCell } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

function InfoSucursales() {

    const { userData } = useAuth()

    const [punto, setPunto] = useState('')

    const { data, isPending, mutateAsync } = useMutation({
        mutationKey: ["infoSucursales"],
        mutationFn: () => API.consultas.infoSucursales(punto, userData && userData.token),

    });

    return (
        <Container>
            <Grid2 container spacing={2} alignItems="center">
                <Grid2 size={12}>
                    <h1>Info Sucursales</h1>
                </Grid2>
                <Grid2 size={12}>
                    {isPending && <LinearProgress />}
                </Grid2>

                <Grid2 size={8}>
                    <TextField fullWidth placeholder="Punto" onChange={(e) => setPunto(e.target.value)} />
                </Grid2>
                <Grid2 size={4}>
                    <Button onClick={() => mutateAsync()}>Consultar</Button>
                </Grid2>
                <Grid2 size={12}>
                    <Table>
                        <TableHead>
                            <TableCell>CODIGO</TableCell>
                            <TableCell>DESCRIPCION</TableCell>
                            <TableCell>ENCARGADO</TableCell>
                            <TableCell>CONTACTO</TableCell>
                            <TableCell>CEDULA</TableCell>
                        </TableHead>
                    </Table>
                </Grid2>
            </Grid2>
        </Container>
    );
}

export default InfoSucursales;