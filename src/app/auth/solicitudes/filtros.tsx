import Icon from "@/components/ui/icon";
import { Grid2 as Grid, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface FiltrosProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  estadoFiltro: number | "";
  setEstadoFiltro: React.Dispatch<React.SetStateAction<number | "">>;
  buscar: (q: string) => void;
  search: string;
}

function Filtros({ setSearch, estadoFiltro, setEstadoFiltro, buscar, search }: FiltrosProps) {
  return (
    <Grid container p={1.5} spacing={1}>
      <Grid size={{ xs: 6, md: 4 }}>
        <TextField
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon size={18}>search</Icon>
                </InputAdornment>
              ),
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              buscar(search);
            }
          }}
          value={search}
          placeholder="Buscar..."
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
          <InputLabel>Filtrar por estado</InputLabel>
          <Select value={estadoFiltro} onChange={(event) => setEstadoFiltro(event.target.value as number | "")}>
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value={7}>Vigente</MenuItem>
            <MenuItem value={5}>Contrato Pendiente</MenuItem>
            <MenuItem value={11}>Rechazado</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Filtros;
