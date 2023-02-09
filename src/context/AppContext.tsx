import * as React from "react";

export enum Theme {
 dark = "dark",
 light = "light",
}

export type AppContextType = {
 theme: string;
 setTheme: (Theme: Theme) => void;
 info: { user: any; followers: any[]; following: any[]; notMutual: any[]; unfollowers: any[] };
 setInfo: (info: any) => void;
 mainLoading: boolean;
 setMainLoading: (loading: boolean) => void;
 contentLoading: boolean;
 setContentLoading: (loading: boolean) => void;
};

export const AppContext = React.createContext<AppContextType>({
 theme: Theme.dark,
 setTheme: (theme) => console.warn("no theme provider"),
 info: { user: null, followers: [], following: [], notMutual: [], unfollowers: [] },
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

 return <AppContext.Provider value={{ theme, setTheme, mainLoading, setMainLoading, setContentLoading, contentLoading, info, setInfo }}>{children}</AppContext.Provider>;
};
