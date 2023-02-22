import { forwardRef, useImperativeHandle, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export const Search = forwardRef(({ handleSearch }: { handleSearch: () => void }, ref) => {
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
   <TextField id="filled-basic" label="Username" variant="filled" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value.trim())} />
   <IconButton onClick={handleSearch}>
    <SearchIcon />
   </IconButton>
  </Box>
 );
});
