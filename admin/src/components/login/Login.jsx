/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid2";
import Login from "../../assets/Login.png";
import { FormContainer, StyledTextField } from "../../mui/customCss";
import { Typography } from "@mui/material";
import { useState } from "react";
import { loginSchema } from "../../joi/schema";
import CustomButton from "../../containers/Button";
import axios from "axios";
import { backend_url } from "../../App";

const LoginContent = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        `${backend_url}/api/user/admin`,
        formData
      );

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        console.log("Invalid credentials");
      }
    }
  };
  return (
    <>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormContainer>
            <Typography variant="h4" gutterBottom fontWeight="700">
              Admin Login
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
          </FormContainer>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <img
            src={Login}
            srcSet={Login}
            alt=""
            loading="lazy"
            style={{
              borderRadius: "0 16px 16px 0",
              objectFit: "fill",
              height: "100vh",
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginContent;
