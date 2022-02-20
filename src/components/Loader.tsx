import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppContext } from "../context/AppContext";

export const Loader = () => {
  const { mainLoading, setMainLoading } = useAppContext();
  const handleClose = () => setMainLoading(false);

  return (
    <div>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={mainLoading} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
