/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { StyledTextField } from "../../mui/customCss";

export function ResetDialog(props) {
  const { handleClose, open, handleResetPassword } = props;

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Forgot Password</DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <ListItemText primary="Please enter your email address to reset your password." />
        </ListItem>
        <ListItem>
          <StyledTextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton autoFocus onClick={handleResetPassword}>
            <ListItemText primary="Reset My Password" />
          </ListItemButton>
          <ListItemButton autoFocus onClick={handleClose}>
            <ListItemText primary="Cancel" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}
