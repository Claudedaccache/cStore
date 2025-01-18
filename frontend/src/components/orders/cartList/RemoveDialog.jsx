/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export function RemoveDialog(props) {
  const { onClose, open, onRemove } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Are you sure you want to remove this product? </DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem disablePadding>
          <ListItemButton autoFocus onClick={onRemove}>
            <ListItemAvatar></ListItemAvatar>
            <ListItemText primary="yes, remove it !" />
          </ListItemButton>
          <ListItemButton autoFocus onClick={onClose}>
            <ListItemAvatar></ListItemAvatar>
            <ListItemText primary="cancel" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}
