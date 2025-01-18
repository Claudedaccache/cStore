import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const useBreakpoint = (breakpoint, direction = "up") => {
  const theme = useTheme();
  const query =
    direction === "up"
      ? theme.breakpoints.up(breakpoint)
      : theme.breakpoints.down(breakpoint);
  return useMediaQuery(query);
};

export default useBreakpoint;
