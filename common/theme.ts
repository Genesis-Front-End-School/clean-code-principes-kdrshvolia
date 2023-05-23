import { PaletteMode } from "@mui/material";
import { amber, deepOrange, grey } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: "#282c35",
            paper: "#282c35",
          },
          text: {
            primary: "#fff",
          },
        }),
  },
});
