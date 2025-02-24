import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { customTheme } from "@/theme/customTheme";
import { BrowserRouter } from "react-router-dom";

function Pages() {
  const { isAuth } = useAuth();

  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>{!isAuth ? <PublicPages /> : <AutenticatedPages />}</QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Pages;
