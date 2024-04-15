import { AppContextProvider } from "@/context/AppContext";
import "@/styles/globals.css";
import "simplebar-react/dist/simplebar.min.css";

export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />{" "}
    </AppContextProvider>
  );
}
