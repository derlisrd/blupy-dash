import { createTheme } from "@mui/material";
import { pallete } from "./pallete";
import { components } from "./components";
import { typography } from "./typography";
import { /* shadowsDark, */ shadowsLight } from "./shadows";

export const customTheme = createTheme({
    palette: pallete,
    components: components,
    typography: typography,
    shadows: shadowsLight,
  })