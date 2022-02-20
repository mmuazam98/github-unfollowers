import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Theme, useAppContext } from "./context/AppContext";

const dark = createTheme({
  palette: {
    mode: "dark",
  },
  status: {
    danger: "green",
  },
});
const light = createTheme({
  palette: {
    mode: "light",
  },
  status: {
    danger: "green",
  },
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useAppContext();
  return (
    <MuiThemeProvider theme={theme === Theme.dark ? dark : light}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
