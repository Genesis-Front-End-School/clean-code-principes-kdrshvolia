import type { AppProps } from "next/app";
import { Box, GlobalStyles, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { notificationObservable } from "../utils/NotificationObservable";
import { SwitchThemeButton } from "../components/SwitchThemeButton";
import { useTheme } from "../hooks/useTheme";

import "react-toastify/dist/ReactToastify.css";

const toastify = (data: string) => {
  toast(data, {
    position: toast.POSITION.TOP_RIGHT,
    closeButton: true,
    autoClose: 2000,
  });
};

notificationObservable.subscribe(toastify);

export default function App({ Component, pageProps }: AppProps) {
  const { colorMode, theme } = useTheme();
  return (
    <>
      <GlobalStyles
        styles={{
          body: { margin: "0" },
        }}
      />
      <ThemeProvider theme={theme}>
        <Box
          padding="20px"
          sx={{
            backgroundColor: "background.default",
            color: "text.primary",
            height: "100%",
            minHeight: "100vh",
          }}
        >
          <SwitchThemeButton onClick={() => colorMode.toggleColorMode()} />
          <Component {...pageProps} />
          <ToastContainer />
        </Box>
      </ThemeProvider>
    </>
  );
}
