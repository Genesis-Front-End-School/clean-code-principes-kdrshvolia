import React from "react";
import { styled, Switch } from "@mui/material";

const MaterialUISwitch = styled(Switch)(({ theme }) => {
  return {
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          content: '"🌚"',
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "light" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "light" ? "#f5fd9a" : "#003892",
      width: 32,
      height: 32,
      "&:before": {
        content: '"🌞"',
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "8px",
        top: "6px",
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "light" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  };
});

interface SwitchThemeButtonProps {
  onClick: () => void;
}

export const SwitchThemeButton = ({ onClick }: SwitchThemeButtonProps) => {
  return <MaterialUISwitch onClick={onClick} />;
};
