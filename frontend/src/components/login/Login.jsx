import Grid from "@mui/material/Grid2";
import Login from "../../assets/Login.png";
import {
  FormContainer,
  RegisterMessage,
  StyledTextField,
} from "../../mui/customCss";
import Section from "../../container/Section";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { loginSchema } from "../../joy/validationSchema";
import { useEffect, useState } from "react";
import { ResetDialog } from "./ResetDialog";
import CustomButton from "../../container/Button";
import { useShopContext } from "../../context/shopContext";
import axios from "axios";
import { backend_url } from "../../App";
import toast from "react-hot-toast";
import LazyImage from "../../helpers/LazyImage";

const LoginContent = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { token, setToken } = useShopContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResetPassword = () => {
    toast.success(
      "Handling the password reset is still under construction, thank you for your patience!"
    );
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = loginSchema.validate(formData, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(errorMessages);
    } else {
      setErrors({});
      const response = await axios.post(
        `${backend_url}/api/user/login`,
        formData
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        localStorage.setItem(
          "userProfile",
          JSON.stringify(response.data.userProfile)
        );
        navigate("/");
        toast.success(
          `Welcome back, ${response.data.userProfile.name}! 🎉 You’ve successfully logged in.`
        );
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      navigate("/logIn");
    }
  }, [navigate, token]);

  return (
    <Section>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormContainer>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <StyledTextField
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <StyledTextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <CustomButton
              variant="contained"
              color="primary"
              fullWidth
              handleClick={handleSubmit}
            >
              Login
            </CustomButton>
            <RegisterMessage
              variant="body2"
              sx={{ color: "lightblue", pb: "1rem", alignSelf: "center" }}
            >
              <CustomButton
                variant="text"
                color="secondary"
                handleClick={handleOpen}
              >
                Forgot password? Click me to reset your password
              </CustomButton>
              <ResetDialog
                open={open}
                handleClose={handleClose}
                handleResetPassword={handleResetPassword}
              />
            </RegisterMessage>
            <RegisterMessage variant="body2">
              Don&apos;t have an account?
              <Link to="/register">Register here</Link>
            </RegisterMessage>
          </FormContainer>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LazyImage
            src={Login}
            alt={""}
            imgStyle={{
              borderRadius: "0 16px 16px 0",
              objectFit: "fill",
              height: "100%",
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </Section>
  );
};

export default LoginContent;
