import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Loader } from "./Loader";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import axios from "axios";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Search = forwardRef(({ handleSearch }: { handleSearch: () => void }, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  useImperativeHandle(ref, () => ({
    value: searchTerm,
  }));
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mb: 3,
      }}
      noValidate
      autoComplete="off"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <TextField id="filled-basic" label="Username" variant="filled" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.trim())} data-testid="search-input" />
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
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

const UserSkeleton = () => {
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

const User = ({ user }: { user: any }) => {
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
      onClick={() => window.open(`https://github.com/${user.login}`)}
    >
      <Box sx={{ margin: 1 }}>
        <Avatar src={user.avatar_url} alt={user.login} />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography>{user.login}</Typography>
      </Box>
    </Box>
  );
};

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
      data = data.concat(response.data);
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
      const notMutual: any[] = info?.followers?.filter(({ login: id1 }) => !info?.following?.some(({ login: id2 }) => id2 === id1));
      const unfollowers: any[] = info?.following?.filter(({ login: id1 }) => !info?.followers?.some(({ login: id2 }) => id2 === id1));
      setInfo((prev: any) => ({ ...prev, notMutual, unfollowers }));
    }
  }, [info?.followers, info?.following]);

  const handleSearch = async () => {
    try {
      setContentLoading(true);
      setInfo({
        user: null,
        followers: [],
        following: [],
        notMutual: [],
        unfollowers: [],
      });
      if (InputRef.current && InputRef.current.value) {
        const user = await axios.get(`https://api.github.com/users/${InputRef?.current?.value}`);
        setInfo((prev: any) => ({ ...prev, user: user.data }));
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
            <Tab label={`Followers ${info?.user?.followers ? `(${info?.user?.followers})` : "(0)"}`} {...a11yProps(0)} />
            <Tab label={`Following ${info?.user?.following ? `(${info?.user?.following})` : "(0)"}`} {...a11yProps(1)} />
            <Tab label={`Unfollowers ${info?.unfollowers?.length ? `(${info?.unfollowers?.length})` : "(0)"}`} {...a11yProps(2)} />
            <Tab label={`Not Mutual ${info?.notMutual?.length ? `(${info?.notMutual?.length})` : "(0)"}`} {...a11yProps(3)} />
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
