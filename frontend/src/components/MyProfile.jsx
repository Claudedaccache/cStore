import Section from "../container/Section";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Avatar,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { Box, Stack, styled } from "@mui/system";
import { StyledTextField } from "../mui/customCss";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CustomButton from "../container/Button";
import { useShopContext } from "../context/shopContext";
import { backend_url } from "../App";
import defaultImg from "../assets/default.jfif";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfilePaper = styled(Paper)({
  padding: "20px",
  marginTop: "20px",
});

const MyProfile = () => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { token, setToken } = useShopContext();
  const nagivate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    aboutMe: "",
    profilePicFile: null,
    profilePicPreview: null,
    profileImage: defaultImg,
  });
  const [initialFormData, setInitialFormData] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        const userProfile = JSON.parse(storedProfile);
        updateFormData(userProfile);
      }
    };

    fetchUserProfile();
  }, [token]);

  const updateFormData = (userProfile) => {
    const updatedData = {
      name: userProfile.name || "",
      lastname: userProfile.lastname || "",
      email: userProfile.email || "",
      aboutMe: userProfile.aboutMe || "",
      profileImage: userProfile.profileImage || defaultImg,
      profilePicPreview: null,
      profilePicFile: null,
    };
    setFormData(updatedData);
    setInitialFormData(updatedData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePicFile: file,
        profilePicPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleEditProfile = () => setOpen(true);
  const handleClose = () => {
    setFormData(initialFormData);
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("lastname", formData.lastname);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("aboutMe", formData.aboutMe);

      if (formData.profilePicFile) {
        formDataToSubmit.append("profileImage", formData.profilePicFile);
      }

      const { data } = await axios.put(
        `${backend_url}/api/user/updateProfile`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        const updatedProfile = data.userProfile;
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
        updateFormData(updatedProfile);
        setOpen(false);
      } else {
        console.error("Failed to update profile:", data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDeleteProfile = async () => {
    const user = localStorage.getItem("userProfile");

    try {
      const response = await axios.delete(`${backend_url}/api/user/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(
          `${user.name} your profile has been deleted successfully, hope to see you soon!`
        );

        localStorage.removeItem("token");
        localStorage.removeItem("userProfile");
        localStorage.removeItem("shopCartCount");
        setToken("");
        nagivate("/");
      } else {
        toast.success("Failed to delete profile, please try again later ");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const confirmProfileRemove = () => {
    handleDeleteProfile();
    setOpen(false);
  };
  return (
    <Section>
      <Box position="relative" display="inline-block">
        <Avatar
          alt="User image"
          src={formData.profilePicPreview || formData.profileImage}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
      </Box>
      <Stack direction="row" gap={1} mt={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          {formData.name}
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom>
          {formData.lastname}
        </Typography>
      </Stack>

      <Typography variant="body1" color="textSecondary">
        {formData.email}
      </Typography>
      <ProfilePaper elevation={3}>
        <Typography variant="h6" component="h2" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1">{formData.aboutMe}</Typography>
      </ProfilePaper>
      <Stack direction="row" gap={3}>
        <CustomButton
          variant="contained"
          color="primary"
          handleClick={handleEditProfile}
          sx={{ mt: "1rem", width: "fit-content" }}
        >
          Edit Profile
        </CustomButton>
        <CustomButton
          variant="contained"
          color="error"
          handleClick={() => {
            setDeleteOpen(true);
          }}
          sx={{ mt: "1rem", ml: 2, width: "fit-content" }}
        >
          Delete Profile
        </CustomButton>
      </Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>

        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Box
              display="inline-flex"
              mb={2}
              width="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Box position="relative" width="fit-content">
                <Avatar
                  alt="User image"
                  src={formData.profilePicPreview || formData.profileImage}
                  sx={{ width: 100, height: 100, margin: "auto" }}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: "-10px",
                    color: "lightblue",
                  }}
                >
                  <input
                    hidden
                    name="profileImage"
                    id="profileImage"
                    type="file"
                    onChange={handleProfilePicChange}
                  />
                  <PhotoCamera />
                </IconButton>
              </Box>
            </Box>
            <StyledTextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
            <StyledTextField
              autoFocus
              margin="dense"
              label="Lastname"
              type="text"
              fullWidth
              value={formData.lastname}
              name="lastname"
              onChange={handleChange}
            />
            <StyledTextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              name="email"
              onChange={handleChange}
            />
            <StyledTextField
              margin="dense"
              label="About Me"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={formData.aboutMe}
              name="aboutMe"
              onChange={handleChange}
            />

            <DialogActions>
              <CustomButton handleClick={handleClose} color="secondary">
                Cancel
              </CustomButton>
              <CustomButton type="submit" color="primary">
                Save
              </CustomButton>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={() => {
          setDeleteOpen(false);
        }}
        open={deleteOpen}
      >
        <DialogTitle>
          Are you sure you want to definitly delete your account?
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem disablePadding>
            <ListItemButton autoFocus onClick={confirmProfileRemove}>
              <ListItemAvatar></ListItemAvatar>
              <ListItemText primary="yes, delete it !" />
            </ListItemButton>
            <ListItemButton
              autoFocus
              onClick={() => {
                setDeleteOpen(false);
              }}
            >
              <ListItemAvatar></ListItemAvatar>
              <ListItemText primary="cancel" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </Section>
  );
};

export default MyProfile;
