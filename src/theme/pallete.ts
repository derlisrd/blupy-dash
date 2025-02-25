import { PaletteOptions } from "@mui/material";
import { colors } from "./colors";

export const pallete = {
  mode: "light",
  primary: colors.primary,
  secondary: {
    main: "#E0C2FF",
    light: "#F5EBFF",
    // dark: will be calculated from palette.secondary.main,
    contrastText: "#47008F"
  },
  background: {
    default: "#fff",
    paper: "#f1f1f1",
    negroFoco: "#383838"
  },
  text:{
    primary: "#000",
    secondary: "#bbb"
  }
} as PaletteOptions;
