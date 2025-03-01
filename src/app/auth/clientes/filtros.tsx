import Icon from "@/components/ui/icon";
import { Grid2 as Grid, TextField, InputAdornment } from "@mui/material";

interface FiltrosProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  buscar: (q: string) => void;
  search: string;
}

function Filtros({ setSearch, buscar, search }: FiltrosProps) {
  return (
    <Grid container p={1.5} spacing={0}>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>user-search</Icon>
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
      <Grid size={{ xs: 12, md: 4 }}></Grid>
    </Grid>
  );
}

export default Filtros;
