import { useState, useMemo, useEffect } from "react";
import { PaletteMode, createTheme } from "@mui/material";
import { getDesignTokens } from "../common/theme";

export const useTheme = () => {
  const [mode, setMode] = useState<PaletteMode>("light");
  useEffect(() => {
    setMode((localStorage.getItem("theme") as PaletteMode) || "light");
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === "light" ? "dark" : "light";
        localStorage.setItem("theme", newMode);
        setMode(newMode);
      },
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  return { colorMode, theme };
};
