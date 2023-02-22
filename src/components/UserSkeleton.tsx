import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export const UserSkeleton = () => {
 return (
  <Box sx={{ display: "flex", alignItems: "center" }}>
   <Box sx={{ margin: 1 }}>
    <Skeleton variant="circular">
     <Avatar />
    </Skeleton>
   </Box>
   <Box sx={{ width: "100%" }}>
    <Skeleton width="100%">
     <Typography>.</Typography>
    </Skeleton>
   </Box>
  </Box>
 );
};
