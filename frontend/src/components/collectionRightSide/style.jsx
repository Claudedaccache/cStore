import { FormControl, InputBase, styled } from "@mui/material";

export const SearchStyle = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: theme.palette.gray[10],
  transition: "width 0.5s ease-in-out",
  overflow: "hidden",

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  overflow: "hidden",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1.5em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const CustomSortFormControl = styled(FormControl)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: theme.palette.text.primary,
  },
  "& .MuiNativeSelect-root": {
    borderBottom: `1px solid ${theme.palette.text.primary}`,
  },
  "& .MuiNativeSelect-root:focus": {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  "& .MuiNativeSelect-root:hover:not(.Mui-disabled):before": {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
  },
  "& .MuiNativeSelect-select": {
    padding: theme.spacing(1),
  },
  "& option": {
    padding: theme.spacing(1),
  },
}));
