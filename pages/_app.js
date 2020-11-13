import "../styles/globals.css";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";
import AuthProvider from "../lib/auth";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CSSReset />
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
