import * as React from "react";
import { AppContextType, Theme, User } from "../types";

export const AppContext = React.createContext<AppContextType>({
 theme: Theme.dark,
 themeToggler: () => console.warn("no theme provider"),
 info: { user: {} as User, followers: [] as User[], following: [] as User[], notMutual: [] as User[], unfollowers: [] as User[] },
 setInfo: (info) => console.warn("no info provider"),
 mainLoading: false,
 setMainLoading: (loading) => console.warn("no main loading provider"),
 contentLoading: false,
 setContentLoading: (loading) => console.warn("no content loading provider"),
});

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
 const [theme, setTheme] = React.useState(Theme.dark);
 const [mainLoading, setMainLoading] = React.useState(false);
 const [contentLoading, setContentLoading] = React.useState(false);
 const [info, setInfo] = React.useState<any>();

 const themeToggler = React.useCallback(() => {
  setTheme((prev) => (prev === Theme.dark ? Theme.light : Theme.dark));
 }, []);

 const memoizedContext = React.useMemo(() => {
  return {
   theme,
   themeToggler,
   mainLoading,
   setMainLoading,
   contentLoading,
   setContentLoading,
   info,
   setInfo,
  };
 }, [theme, themeToggler, mainLoading, setMainLoading, contentLoading, setContentLoading, info, setInfo]);

 return <AppContext.Provider value={{ ...memoizedContext }}>{children}</AppContext.Provider>;
};
