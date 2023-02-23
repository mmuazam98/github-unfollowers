import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, IconButton } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import { useAppContext } from "../context/AppContext";
import { Theme } from "../types";

export const Navbar = () => {
 const { theme, themeToggler, contentLoading } = useAppContext();
 return (
  <>
   {contentLoading && <LinearProgress sx={{ position: "fixed", width: "100%" }} />}
   <Box sx={{ textAlign: "right", padding: 1, cursor: "pointer" }}>
    <IconButton aria-label="delete" onClick={themeToggler}>
     {theme === "dark" ? <NightlightRoundIcon /> : <WbSunnyIcon />}
    </IconButton>
    <IconButton aria-label="delete" onClick={() => window.open("https://github.com/mmuazam98/github-unfollowers", "_blank")}>
     <GitHubIcon />
    </IconButton>
   </Box>
  </>
 );
};
