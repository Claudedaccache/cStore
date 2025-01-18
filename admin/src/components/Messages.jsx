import { useTabContext } from "../context/tabContext";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const Messages = () => {
  const { messages } = useTabContext();

  return (
    <>
      <Box>
        <Typography variant="h4">Contact Us Messages</Typography>
        <List>
          {messages.map((message) => (
            <ListItem key={message._id}>
              <ListItemText
                primary={`Message from ${message.name}`}
                secondary={
                  <>
                    Email: {message.email} <br />
                    Message: {message.message}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Messages;
