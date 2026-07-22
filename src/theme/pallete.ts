import { PaletteOptions } from "@mui/material";


export const pallete = {
  mode: "dark",
  primary: {
      lighter: '#585858',
      light: '#4a4a4a',
      main: '#000',
      dark: '#272727',
      darker: '#181818',
      contrastText: '#fff',
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
