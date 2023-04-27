import type { AppProps } from "next/app";
import { Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { notificationObservable } from "../utils/NotificationObservable";

import "react-toastify/dist/ReactToastify.css";

const toastify = (data: string) => {
  toast(data, {
    position: toast.POSITION.TOP_RIGHT,
    closeButton: true,
    autoClose: 2000
  });
}

notificationObservable.subscribe(toastify);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box padding="20px">
      <Component {...pageProps} />
      <ToastContainer />
    </Box>
  );
}
