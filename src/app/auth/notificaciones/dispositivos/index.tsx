import API from "@/services";
import {
  Box,
  Container,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  Avatar,
  Tooltip,
  IconButton
} from "@mui/material";
import swal from 'sweetalert'; // Importamos sweetalert
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon"; // Asumiendo que tienes este componente

export default function Dispositivos() {
  const parentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: () => API.devices.solicitudes(),
    select: (data) => data?.results || []
  });

  // 2. Mutación para eliminar
  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: number) => API.devices.eliminar(id),
    onSuccess: () => {
      swal("Eliminado", "La solicitud ha sido borrada con éxito.", "success");
      queryClient.invalidateQueries({ queryKey: ["devices"] }); // Refresca la lista
    },
    onError: () => {
      swal("Error", "No se pudo eliminar la solicitud.", "error");
    }
  });

  const handleEliminar = (id: number, name: string) => {
    swal({
      title: "¿Eliminar solicitud?",
      text: `Estás a punto de borrar la solicitud de ${name}. Esta acción no se puede deshacer.`,
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteMutate(id);
      }
    });
  };

  const lista = data || [];

  const virtualizer = useVirtualizer({
    count: lista.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70, // Tamaño aumentado para filas más espaciosas
    overscan: 10,
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Solicitudes de Dispositivos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gestión y aprobación de nuevos accesos
          </Typography>
        </Box>
        <Chip
          label={`${lista.length} Pendientes`}
          color="info"
          variant="outlined"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>

      {isLoading ? (
        <Box sx={{ width: '100%', mt: 4 }}>
          <LinearProgress sx={{ borderRadius: 2, height: 8 }} />
        </Box>
      ) : (
        <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
          <TableContainer
            ref={parentRef}
            sx={{
              height: 'calc(100vh - 250px)',
              overflow: 'auto',
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '4px' }
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold' }}>Usuario</TableCell>
                  <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold' }}>Identificación</TableCell>
                  <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold' }}>Dispositivo</TableCell>
                  <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold' }}>Sistema Operativo</TableCell>
                  <TableCell sx={{ bgcolor: '#f8f9fa', fontWeight: 'bold', textAlign: 'center' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {virtualizer.getVirtualItems().length > 0 ? (
                  virtualizer.getVirtualItems().map((virtualRow) => {
                    const row = lista[virtualRow.index];
                    return (
                      <TableRow
                        key={row.id}
                        hover
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar sx={{ bgcolor: 'primary.light', fontSize: '1rem' }}>
                              {row.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="bold">{row.name}</Typography>
                              <Typography variant="caption" color="text.secondary">ID: {row.user_id}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{row.cedula}</Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Icon size={20}>device-mobile</Icon>
                            <Typography variant="body2">{row.model}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={row.os}
                            size="small"
                            color={row.os.toLowerCase().includes('android') ? 'success' : 'info'}
                            sx={{ fontWeight: '500', borderRadius: '6px' }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="Eliminar">
                            <IconButton
                              color="error"
                              onClick={() => handleEliminar(row.id, row.name)}
                            >
                              <Icon size={20}>trash</Icon>
                            </IconButton>
                          </Tooltip>
                          <Button
                            variant="contained"
                            size="small"
                            disableElevation
                            onClick={() => navigate(`/notificaciones/dispositivos/${row.id}`, { state: { device: row } })}
                            startIcon={<Icon size={18}>eye</Icon>}
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                          >
                            Revisar
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                      <Typography color="text.secondary">No hay solicitudes pendientes</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
}