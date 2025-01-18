import {
  Typography,
  Divider,
  Button,
  Box,
  Modal,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import contactUsImg from "../assets/contactUsImg.jfif";
import axios from "axios";
import { useState } from "react";
import Section from "../container/Section";
import { socialMedia } from "../data/StaticData";
import { StyledTextField } from "../mui/customCss";
import { contactusFormSchema } from "../joy/validationSchema";
import { backend_url } from "../App";
import toast from "react-hot-toast";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [openResponseModal, setOpenResponseModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    familyName: "",
    email: "",
    number: "",
    message: "",
  });

  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleResponseModalClose = () => setOpenResponseModal((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = contactusFormSchema.validate(formData);
      if (error) {
        alert(`Validation Error: ${error.details[0].message}`);
        return;
      }

      const response = await axios.post(
        `${backend_url}/api/contactUs/addMessage`,

        formData
      );

      if (response.data.success) {
        setFormData({
          name: "",
          familyName: "",
          email: "",
          number: "",
          message: "",
        });
        handleClose();
        setOpenResponseModal(true);
      } else {
        toast.error("There was an error submitting your message.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("There was an error submitting your message.");
    }
  };

  return (
    <>
      <Box height="60vh">
        <img src={contactUsImg} alt="" width="100%" height="100%" />
      </Box>

      <Section>
        <Stack
          direction="column"
          alignItems="center"
          bgcolor={theme.palette.gray[10]}
          p="1rem 1.5rem"
          borderRadius="16px"
          spacing={4}
        >
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Divider variant="middle" flexItem />
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="space-between"
            spacing={4}
            width="100%"
          >
            <Stack spacing={2} alignItems="center" flex={1}>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Send Us a Message
              </Button>
              <Typography variant="h6">
                We&apos;d love to hear from you!
              </Typography>
              <Modal open={open} onClose={handleClose}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    p: 4,
                    boxShadow: 24,
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Send Us a Message
                  </Typography>
                  <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <StyledTextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                    <StyledTextField
                      label="Family Name"
                      variant="outlined"
                      fullWidth
                      name="familyName"
                      value={formData.familyName}
                      onChange={handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                    <StyledTextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                    <StyledTextField
                      label="Phone Number (Optional)"
                      variant="outlined"
                      fullWidth
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                    <StyledTextField
                      label="Message"
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      sx={{ width: "100%" }}
                    >
                      Submit
                    </Button>
                  </form>
                </Box>
              </Modal>
              <Modal
                open={openResponseModal}
                onClose={handleResponseModalClose}
              >
                <Box
                  sx={{
                    padding: 2,
                    backgroundColor: "white",
                    margin: "auto",
                    marginTop: "20%",
                    maxWidth: 400,
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Thank You for Your Message!
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    We will get back to you soon.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleResponseModalClose}
                    fullWidth
                  >
                    Close
                  </Button>
                </Box>
              </Modal>
            </Stack>

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />
            <Stack spacing={2} alignItems="center" flex={1}>
              <Typography variant="body1">
                123 Cstore, suite 100, New York, NY
              </Typography>
              <Typography>support@Cstore.com</Typography>
              <Typography>+1 (123) 456-7890</Typography>
            </Stack>
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{ display: { xs: "none", md: "block" } }}
            />
            <Stack alignItems="center" flex={1}>
              <Typography gutterBottom>Follow Us</Typography>
              <Stack direction="row" spacing={2}>
                {socialMedia.map(({ icon, to }) => {
                  return (
                    <IconButton color="terciary" href={to} key={to}>
                      {icon}
                    </IconButton>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Section>
    </>
  );
};

export default Contact;
