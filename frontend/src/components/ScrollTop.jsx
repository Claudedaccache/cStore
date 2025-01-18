import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const BackToTop = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="small"
        onClick={handleScrollToTop}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <ArrowUpwardIcon />
      </Fab>
    </Zoom>
  );
};

export default BackToTop;
