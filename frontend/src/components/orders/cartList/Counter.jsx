/* eslint-disable react/prop-types */
import { Button, Box, Typography, styled, useTheme } from "@mui/material";
import { useState } from "react";
import { RemoveDialog } from "./removeDialog";

const Counter = ({ count, onRemove, onCountChange }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const SmallButton = styled(Button)({
    minWidth: "30px",
    padding: "2px",
    fontSize: "0.80rem",
    borderRadius: "50px",
    background: theme.palette.gray[10],
    color: theme.palette.secondary.main,
  });

  const handleIncrement = () => {
    onCountChange(count + 1);
  };

  const handleDecrement = () => {
    if (count - 1 <= 0) setOpen(true);
    else onCountChange(count - 1);
  };

  const confirmRemove = () => {
    onRemove();
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      bgcolor={theme.palette.gray[10]}
      borderRadius="40%"
      width="min-content"
    >
      <SmallButton variant="contained" onClick={handleDecrement}>
        -
      </SmallButton>
      <Typography fontSize="14px" mx={1}>
        {count}
      </Typography>
      <SmallButton variant="contained" size="small" onClick={handleIncrement}>
        +
      </SmallButton>
      <RemoveDialog
        open={open}
        onRemove={confirmRemove}
        onClose={handleClose}
      />
    </Box>
  );
};

export default Counter;
