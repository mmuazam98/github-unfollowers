import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { User as UserType } from "../types";

export const User = ({ user }: { user: UserType }) => {
 return (
  <Box
   sx={{
    display: "flex",
    alignItems: "center",
    borderRadius: 3,
    "&:hover": {
     cursor: "pointer",
     background: "rgba(0, 0, 0, 0.05)",
    },
   }}
   onClick={() => window.open(user.html_url, "_blank")}
  >
   <Box sx={{ margin: 1 }}>
    <Avatar src={user.avatar_url} alt={user.login} />
   </Box>
   <Box sx={{ width: "100%" }}>
    <Typography>{user.name}</Typography>
    <Typography>{user.login}</Typography>
   </Box>
  </Box>
 );
};
