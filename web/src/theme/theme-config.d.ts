import "@material-ui/core/styles";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    green: {
      main: string;
      light: string;
      dark?: string;
    };
    red: {
      main: string;
      light: string;
      dark?: string;
    };
  }
  interface PaletteOptions {
    green: {
      main: string;
      light: string;
      dark?: string;
    };
    red: {
      main: string;
      light: string;
      dark?: string;
    };
  }
}
