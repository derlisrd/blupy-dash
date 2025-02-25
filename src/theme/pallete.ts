import { PaletteOptions } from "@mui/material";

export const pallete = {
  mode: "light",
  primary: {
    main: "#373737"
    // light: will be calculated from palette.primary.main,
    // dark: will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main
  },
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
