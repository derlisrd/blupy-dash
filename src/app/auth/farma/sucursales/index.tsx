import { useAuth } from "@/hooks/useAuth";
import API from "@/services";
import { Container, Grid2, LinearProgress, TextField, Button, Box, Typography } from "@mui/material"; // Added Box and Typography for better display
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useVirtualizer } from '@tanstack/react-virtual'

function InfoSucursales() {

    const { userData } = useAuth()

    const [punto, setPunto] = useState('')

    const { data, isPending, mutateAsync } = useMutation({
        mutationKey: ["infoSucursales"],
        mutationFn: () => API.consultas.infoSucursales(punto, userData && userData.token),

    });

    const parentRef = useRef(null)

    // Ensure data.results is available before setting count
    const rowVirtualizer = useVirtualizer({
        count: data?.results?.length || 0, // Use optional chaining and default to 0
        getScrollElement: () => parentRef.current,
        estimateSize: () => 70, // Increased estimateSize for more content
        overscan: 5,
    })

    const virtualItems = rowVirtualizer.getVirtualItems();

    const itemHeight = 70; // La altura estimada de tus items (o un valor conocido)
    const maxVisibleItems = 6;
    const calculatedHeight = data && data?.results?.length > 0
        ? Math.min(data.results.length, maxVisibleItems) * itemHeight
        : itemHeight;

    return (
        <Container>
            <Grid2 container spacing={2} alignItems="center">
                <Grid2 size={12}> {/* Changed size to xs for responsiveness */}
                    <h1>Info Sucursales</h1>
                </Grid2>
                <Grid2 size={12}>{isPending && <LinearProgress />}</Grid2>

                <Grid2 size={8}>
                    <TextField fullWidth placeholder="Punto" label="Ingrese número de sucursal" onChange={(e) => setPunto(e.target.value)} />
                </Grid2>
                <Grid2 size={4}>
                    <Button onClick={() => mutateAsync()}>Consultar</Button>
                </Grid2>
                <Grid2 size={12}>
                    <div
                        ref={parentRef}
                        className="List"
                        style={{
                            height: `${calculatedHeight}px`, // Increased height for better visibility
                            width: `100%`,
                            overflow: 'auto',
                            borderRadius: '8px', // Added some border radius
                            backgroundColor: '#f9f9f9' // Added background color
                        }}
                    >
                        <div
                            style={{
                                height: `${rowVirtualizer.getTotalSize()}px`,
                                width: '100%',
                                position: 'relative',
                            }}
                        >
                            {virtualItems.map((virtualRow) => {
                                const sucursal = data?.results?.[virtualRow.index]; // Access the specific sucursal data
                                return (
                                    <div
                                        key={virtualRow.key} // Use virtualRow.key for better key management
                                        className={virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: `${virtualRow.size}px`,
                                            transform: `translateY(${virtualRow.start}px)`,
                                            padding: '10px 15px', // Added padding
                                            borderBottom: '1px solid #eee', // Separator between items
                                            boxSizing: 'border-box', // Include padding in element's total width and height
                                            backgroundColor: virtualRow.index % 2 ? '#e0e0e0' : '#ffffff', // Alternating row colors
                                        }}
                                    >
                                        {sucursal ? (
                                            <Box>
                                                <Typography variant="body1" fontWeight="bold">Sucursal: {sucursal.descripcion}</Typography>
                                                <Typography variant="body2">Encargado: {sucursal.encargado} (CI: {sucursal.encargadoCi})</Typography>
                                                <Typography variant="body2">Contacto: {sucursal.contacto}</Typography>
                                                <Typography variant="body2">Dirección: {sucursal.direccion}</Typography>
                                            </Box>
                                        ) : (
                                            <Typography>Cargando información...</Typography>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Grid2>
            </Grid2>
        </Container>
    );
}

export default InfoSucursales;