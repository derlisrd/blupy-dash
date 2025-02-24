import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { customTheme } from "@/theme/customTheme";

function Pages() {
  const { isAuthenticated } = useAuth();

  const queryClient = new QueryClient();
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>{!isAuthenticated ? <PublicPages /> : <AutenticatedPages />}</QueryClientProvider>
    </ThemeProvider>
  );
}

export default Pages;
