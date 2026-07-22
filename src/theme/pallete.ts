import { PaletteOptions } from "@mui/material";


export const pallete = {
  mode: "dark",
  primary: {
    lighter: "#BDBDBD",
    light: "#757575",
    main: "#4D4D4D",
    dark: "#303030",
    darker: "#1F1F1F",
    contrastText: "#fff"
  },
  secondary: {
    main: "#E0C2FF",
    light: "#F5EBFF",
    // dark: will be calculated from palette.secondary.main,
    contrastText: "#47008F"
  },
  background: {
    default: "#2f2f2f",
    paper: "#000",
    negroFoco: "#acacacff"
  },
  text: {
    primary: "#FFF",
    secondary: "#e4e4e4ff"
  }
} as PaletteOptions;
