import { forwardRef, useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Tooltip from "@mui/material/Tooltip";

import axios from "axios";
import { UserSkeleton } from "./UserSkeleton";
import { Search } from "./Search";
import { Loader } from "./Loader";
import { User } from "./User";
import { User as UserType } from "../types";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
 return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface TabPanelProps {
 children?: React.ReactNode;
 index: number;
 value: number;
}

const TabPanel = (props: TabPanelProps) => {
 const { children, value, index, ...other } = props;

 return (
  <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
   {value === index && (
    <Box sx={{ p: 3 }}>
     <div>{children}</div>
    </Box>
   )}
  </div>
 );
};

const a11yProps = (index: number) => {
 return {
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
 };
};

const LoadingContent = () => (
 <>
  <UserSkeleton />
  <UserSkeleton />
  <UserSkeleton />
  <UserSkeleton />
  <UserSkeleton />
  <UserSkeleton />
 </>
);

export const Main = () => {
 const { setMainLoading, setContentLoading, info, setInfo } = useAppContext();
 const [value, setValue] = useState(0);
 const InputRef = useRef<HTMLInputElement>(null);

 const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  setValue(newValue);
 };
 const FetchData = async (username: string, query: string) => {
  let i = 1,
   response: any,
   data: any[] = [];
  do {
   response = await axios.get(`https://api.github.com/users/${username}/${query}?per_page=20&page=${i}`);
   data = [...data, ...response.data];
   i++;
  } while (response.data.length > 0);

  return data;
 };
 useEffect(() => {
  setMainLoading(true);
  setTimeout(() => {
   setMainLoading(false);
  }, 2000);
 }, []);

 useEffect(() => {
  if (info?.followers?.length && info?.following?.length) {
   const notMutual: UserType[] = info?.followers?.filter(({ login: id1 }) => !info?.following?.some(({ login: id2 }) => id2 === id1));
   const unfollowers: UserType[] = info?.following?.filter(({ login: id1 }) => !info?.followers?.some(({ login: id2 }) => id2 === id1));
   setInfo((prev: any) => ({ ...prev, notMutual, unfollowers }));
  }
 }, [info?.followers, info?.following]);

 const handleSearch = async () => {
  try {
   setContentLoading(true);
   setInfo({
    user: {} as UserType,
    followers: [],
    following: [],
    notMutual: [],
    unfollowers: [],
   });
   if (InputRef.current && InputRef.current.value) {
    const response = await axios.get(`https://api.github.com/users/${InputRef?.current?.value}`);
    const user: UserType = response.data;
    setInfo((prev: any) => ({ ...prev, user }));
    const followers = await FetchData(InputRef?.current?.value, "followers");
    setInfo((prev: any) => ({ ...prev, followers }));
    const following = await FetchData(InputRef?.current?.value, "following");
    setInfo((prev: any) => ({ ...prev, following }));
   }
   setContentLoading(false);
  } catch (err) {
   console.log(err);
   setContentLoading(false);
   setOpen(true);
  }
 };
 const [open, setOpen] = useState(false);

 const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === "clickaway") {
   return;
  }

  setOpen(false);
 };
 return (
  <>
   <Loader />
   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
     No match found!
    </Alert>
   </Snackbar>
   <Search handleSearch={handleSearch} ref={InputRef} />
   {info?.user?.name && (
    <Box sx={{ width: "75%", m: "20px auto", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
     <Avatar src={info?.user?.avatar_url} sx={{ width: 70, height: 70 }} />
     <Typography variant="h5">{info?.user?.name}</Typography>
    </Box>
   )}
   <Box className="tabs">
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
     <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
      <Tab
       label={
        <Typography
         sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
         }}
        >
         <Tooltip title="Followers are the people who follow you on Github">
          <HelpOutlineIcon fontSize="small" />
         </Tooltip>
         {`Followers ${info?.user?.followers ? `(${info?.user?.followers})` : "(0)"}`}
        </Typography>
       }
       {...a11yProps(0)}
      />
      <Tab
       label={
        <Typography
         sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
         }}
        >
         <Tooltip title="Following are the people you follow on Github">
          <HelpOutlineIcon fontSize="small" />
         </Tooltip>
         {`Following ${info?.user?.following ? `(${info?.user?.following})` : "(0)"}`}
        </Typography>
       }
       {...a11yProps(1)}
      />
      <Tab
       label={
        <Typography
         sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
         }}
        >
         <Tooltip title="Unfollowers are the people who you follow but they don't follow you back">
          <HelpOutlineIcon fontSize="small" />
         </Tooltip>
         {`Unfollowers ${info?.unfollowers?.length ? `(${info?.unfollowers?.length})` : "(0)"}`}
        </Typography>
       }
       {...a11yProps(2)}
      />
      <Tab
       label={
        <Typography
         sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
         }}
        >
         <Tooltip title="Not Mutual are the people who follow you but you don't follow them back">
          <HelpOutlineIcon fontSize="small" />
         </Tooltip>
         {`Not Mutual ${info?.notMutual?.length ? `(${info?.notMutual?.length})` : "(0)"}`}
        </Typography>
       }
       {...a11yProps(3)}
      />
     </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
     {!info?.followers?.length ? <LoadingContent /> : info?.followers.map((user: any, idx: number) => <User user={user} key={user.node_id + idx} />)}
    </TabPanel>
    <TabPanel value={value} index={1}>
     {!info?.following?.length ? <LoadingContent /> : info?.following.map((user: any) => <User user={user} key={user.node_id} />)}
    </TabPanel>
    <TabPanel value={value} index={2}>
     {!info?.unfollowers?.length ? <LoadingContent /> : info?.unfollowers?.map((user: any) => <User user={user} key={user.node_id} />)}
    </TabPanel>
    <TabPanel value={value} index={3}>
     {!info?.notMutual?.length ? <LoadingContent /> : info?.notMutual?.map((user: any) => <User user={user} key={user.node_id} />)}
    </TabPanel>
   </Box>
  </>
 );
};
