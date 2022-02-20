import ThemeProvider from "./ThemeProvider";
import { AppContextProvider } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Main } from "./components/Main";

const App = () => {
  return (
    <AppContextProvider>
      <ThemeProvider>
        <Navbar />
        <Main />
      </ThemeProvider>
    </AppContextProvider>
  );
};

export default App;
