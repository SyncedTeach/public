import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import settings from "@/utils/settings";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  
  useEffect(() => {
    // Check if API is up
    if (router.pathname === "/error" || router.pathname === "/404" || router.pathname ==="/setup") return;



    const runCheck = async () => {
      fetch('/api/checkconfig');
      // console.log(settings)
      if (settings !== undefined && settings.setup === true) {
        return router.push("/error?cause=not-setup");
      }
      try {
        const response = await fetch(`${settings.config.api_route}`, {
          method: "GET",
        });
        const data = await response.json();
        
        if (data.success === true) {
          // console.log("API is up");
        } else if (data.success === false && data.error === "Database not available") {
          // console.log("Database is down");
          router.push("/error?cause=database");
        }
      } catch (error) {
        console.log("API is down");
        router.push("/error?cause=api");
      }
    };

    runCheck();
    
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
