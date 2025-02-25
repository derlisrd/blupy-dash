import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./public";
import AutenticatedPages from "./auth";

import { useAuth } from "@/hooks/useAuth";
import { customTheme } from "@/theme/customTheme";
import { BrowserRouter } from "react-router-dom";

function Pages() {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {!isAuth ? <PublicPages /> : <AutenticatedPages />}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Pages;
