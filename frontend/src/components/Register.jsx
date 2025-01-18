import Grid from "@mui/material/Grid2";
import Login from "../assets/Login.png";
import {
  FormContainer,
  RegisterMessage,
  StyledTextField,
} from "../mui/customCss";
import Section from "../container/Section";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { registerSchema } from "../joy/validationSchema";
import axios from "axios";
import { backend_url } from "../App";
import toast from "react-hot-toast";
import LazyImage from "../helpers/LazyImage";

const RegisterContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = registerSchema.validate(formData, { abortEarly: false });
    if (error) {
      const errorMessages = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(errorMessages);
    } else {
      setErrors({});
      const response = await axios.post(
        `${backend_url}/api/user/register`,
        formData
      );

      if (response.data.success) {
        navigate("/logIn");
        toast.success("well done , you re now registered! 🎉");
      } else {
        toast.error(
          "Registration failed. Please check your credentials, or try again later."
        );
      }
    }
  };

  return (
    <Section>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <FormContainer>
            <Typography variant="h4" gutterBottom>
              Register
            </Typography>
            <StyledTextField
              label="Name"
              name="name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <StyledTextField
              label="Lastname"
              name="lastname"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.lastname}
              onChange={handleChange}
              error={!!errors.lastname}
              helperText={errors.lastname}
            />
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
            <StyledTextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Register
            </Button>
            <RegisterMessage variant="body2">
              Already have an account? <Link to="/login">Login here</Link>
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

export default RegisterContent;
