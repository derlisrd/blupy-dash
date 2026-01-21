import API from "@/services";
import { Box, Container, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Dispositivos() {

  const parentRef = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["devices"],
    queryFn: () => API.devices.solicitudes(),
    select: (data) => {
      if (data && data.results) {
        return data.results
      }
      return []
    }
  });

  const lista = data || [];

  const virtualizer = useVirtualizer({
    count: lista.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 20,
  })




  return <Container  >
    <h3>Dispositivos:</h3>
    {
      isLoading ? <LinearProgress />
        :
        <Box boxShadow={6} borderRadius={4} component={Paper}>
          <TableContainer ref={parentRef} component={Paper} sx={{ borderRadius: 0, border: 0, boxShadow: 0, minHeight: `calc(100% - 90px)` }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Modelo</TableCell>
                  <TableCell>OS</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {virtualizer.getVirtualItems().map((elem) => {
                  const row = lista[elem.index]
                  return (
                    <TableRow
                      key={row.id}
                    >
                      <TableCell>{row.user_id}</TableCell>
                      <TableCell>{row.model}</TableCell>
                      <TableCell>{row.os}</TableCell>
                      <TableCell>
                        <Link to={`/notificaciones/dispositivos/${row.id}`} state={{ device: row }}>Ver</Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
    }
  </Container>
}
