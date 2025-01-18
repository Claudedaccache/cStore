/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

const CustomButton = ({
  color = "primary",
  variant = "contained",
  size = "medium",
  handleClick,
  startIcon,
  endIcon,
  children,
  ...props
}) => {
  return (
    <Button
      color={color}
      variant={variant}
      size={size}
      {...props}
      onClick={handleClick}
      sx={{ ...props.sx }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="0.5rem"
      >
        {startIcon && <Box component="span">{startIcon}</Box>}
        {children}
        {endIcon && <Box component="span">{endIcon}</Box>}
      </Box>
    </Button>
  );
};

export default CustomButton;
