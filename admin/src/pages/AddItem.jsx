/* eslint-disable react/prop-types */
import { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
  Input,
  IconButton,
  Stack,
  FormHelperText,
} from "@mui/material";
import { StyledTextField } from "../mui/customCss";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "../containers/Button";
import { addItemSchema } from "../joi/schema";
import defaultImg from "../assets/default.jfif";
import axios from "axios";
import { backend_url } from "../App";
import { useTabContext } from "../context/tabContext";

const AddItem = () => {
  const initialState = {
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: 15,
    sizes: [],
    popular: false,
    onSolde: false,
    soldedPrice: 15,
    image: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const { fetchList, token } = useTabContext();

  const validateForm = () => {
    const { error } = addItemSchema.validate(formData, { abortEarly: false });
    if (error) {
      const formErrors = error.details.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});
      setErrors(formErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "sizes") {
        setFormData((prevState) => {
          const updatedSizes = checked
            ? [...prevState.sizes, value]
            : prevState.sizes.filter((size) => size !== value);

          return { ...prevState, sizes: updatedSizes };
        });
      } else {
        setFormData((prevState) => ({
          ...prevState,
          [name]: checked,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (index === 0) {
        setImage1(file);
      } else if (index === 1) {
        setImage2(file);
      } else if (index === 2) {
        setImage3(file);
      } else if (index === 3) {
        setImage4(file);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed:", errors);
      return;
    }

    if (isNaN(formData.soldedPrice) || formData.soldedPrice < 15) {
      formData.soldedPrice = 15;
    }

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("category", formData.category);
      formDataToSubmit.append("subCategory", formData.subCategory);
      formDataToSubmit.append("price", formData.price);
      formDataToSubmit.append("sizes", JSON.stringify(formData.sizes));
      formDataToSubmit.append("popular", formData.popular ? "true" : "false");
      formDataToSubmit.append("onSolde", formData.onSolde ? "true" : "false");
      if (formData.onSolde) {
        formDataToSubmit.append("soldedPrice", formData.soldedPrice);
      } else {
        console.log("Invalid soldedPrice value:", formData.soldedPrice);
      }
      image1 && formDataToSubmit.append(`image1`, image1);
      image2 && formDataToSubmit.append(`image2`, image2);
      image3 && formDataToSubmit.append(`image3`, image3);
      image4 && formDataToSubmit.append(`image4`, image4);

      const response = await axios.post(
        `${backend_url}/api/product/add`,
        formDataToSubmit,
        { headers: { token, "Content-Type": "multipart/form-data" } }
      );

      if (response.data) {
        setSentMessage(
          "Product created and added to the dataBase, well done !"
        );
        setFormData(initialState);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSentMessage("");
        await fetchList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      maxWidth="50%"
      sx={{
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Stack alignItems="center">
        <Typography
          variant="h2"
          gutterBottom
          pb={3}
          color="lightblue"
          fontWeight="700"
        >
          Add New Item
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Typography gutterBottom>Photos</Typography>
          <Stack direction="row" justifyContent="space-around" gap={2}>
            <Box position="relative" height={60} width={60}>
              <label htmlFor="image1">
                <img
                  src={image1 ? URL.createObjectURL(image1) : defaultImg}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
                {image1 && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -15,
                      right: -15,
                      zIndex: 15,
                    }}
                    onClick={() => setImage1(null)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
                <input
                  onChange={(e) => handleFileChange(e, 0)}
                  name="image1"
                  id="image1"
                  type="file"
                  hidden
                />
              </label>
            </Box>

            {/* Image 2 */}
            <Box position="relative" height={60} width={60}>
              <label htmlFor="image2">
                <img
                  src={image2 ? URL.createObjectURL(image2) : defaultImg}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
                {image2 && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -15,
                      right: -15,
                      zIndex: 15,
                    }}
                    onClick={() => setImage2(null)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
                <input
                  onChange={(e) => handleFileChange(e, 1)}
                  name="image2"
                  id="image2"
                  type="file"
                  hidden
                />
              </label>
            </Box>

            {/* Image 3 */}
            <Box position="relative" height={60} width={60}>
              <label htmlFor="image3">
                <img
                  src={image3 ? URL.createObjectURL(image3) : defaultImg}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
                {image3 && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -15,
                      right: -15,
                      zIndex: 15,
                    }}
                    onClick={() => setImage3(null)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
                <input
                  onChange={(e) => handleFileChange(e, 2)}
                  name="image3"
                  id="image3"
                  type="file"
                  hidden
                />
              </label>
            </Box>

            {/* Image 4 */}
            <Box position="relative" height={60} width={60}>
              <label htmlFor="image4">
                <img
                  src={image4 ? URL.createObjectURL(image4) : defaultImg}
                  alt=""
                  style={{ width: "100%", height: "100%" }}
                />
                {image4 && (
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -15,
                      right: -15,
                      zIndex: 15,
                    }}
                    onClick={() => setImage4(null)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
                <input
                  onChange={(e) => handleFileChange(e, 3)}
                  name="image4"
                  id="image4"
                  type="file"
                  hidden
                />
              </label>
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <StyledTextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <StyledTextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography gutterBottom>Category</Typography>
          <Select
            fullWidth
            name="category"
            value={formData.category}
            onChange={handleChange}
            error={Boolean(errors.category)}
          >
            <MenuItem value="Men">Men</MenuItem>
            <MenuItem value="Women">Women</MenuItem>
            <MenuItem value="Kids">Kids</MenuItem>
          </Select>
          {errors.category && (
            <FormHelperText error>{errors.category}</FormHelperText>
          )}
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography gutterBottom>SubCategory</Typography>
          <Select
            fullWidth
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            error={Boolean(errors.subCategory)}
          >
            <MenuItem value="Bottomwear">Bottomwear</MenuItem>
            <MenuItem value="Topwear">Topwear</MenuItem>
            <MenuItem value="Winterwear">Winterwear</MenuItem>
          </Select>
          {errors.subCategory && (
            <FormHelperText error>{errors.subCategory}</FormHelperText>
          )}
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography gutterBottom>Price</Typography>
          <Stack>
            <Slider
              value={formData.price}
              name="price"
              onChange={handleChange}
              aria-labelledby="input-slider"
              valueLabelDisplay="auto"
              sx={{ color: "lightblue" }}
              step={1}
              min={15}
              max={1000}
            />
            <Input
              value={formData.price}
              name="price"
              onChange={handleChange}
              sx={{ width: "max-content", color: "lightblue" }}
              inputProps={{
                step: 1,
                min: 15,
                max: 1000,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Stack direction="row" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  name="onSolde"
                  checked={formData.onSolde}
                  onChange={handleChange}
                  sx={{
                    color: "gray",
                    "&.Mui-checked": {
                      color: "lightBlue",
                    },
                  }}
                />
              }
              label="On Sale"
            />
            {formData.onSolde && (
              <>
                <Slider
                  value={formData.soldedPrice}
                  name="soldedPrice"
                  onChange={handleChange}
                  aria-labelledby="input-slider"
                  valueLabelDisplay="auto"
                  sx={{ color: "green", flex: 1 }}
                  step={1}
                  min={15}
                  max={1000}
                />
                <Input
                  value={formData.soldedPrice}
                  name="soldedPrice"
                  onChange={handleChange}
                  sx={{ width: "max-content", color: "green", ml: "1rem" }}
                  inputProps={{
                    step: 1,
                    min: 15,
                    max: 1000,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </>
            )}
          </Stack>
          {errors.soldedPrice && (
            <FormHelperText error>{errors.soldedPrice}</FormHelperText>
          )}
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Typography gutterBottom>Sizes</Typography>
          <Stack direction="row" spacing={2}>
            {["S", "M", "L", "XL"].map((size) => (
              <FormControlLabel
                key={size}
                control={
                  <Checkbox
                    name="sizes"
                    value={size}
                    checked={formData.sizes.includes(size)}
                    onChange={handleChange}
                    sx={{
                      color: "gray",
                      "&.Mui-checked": {
                        color: "lightBlue",
                      },
                    }}
                  />
                }
                label={size}
              />
            ))}
          </Stack>
          {errors.sizes && (
            <FormHelperText error>{errors.sizes}</FormHelperText>
          )}
        </Grid>

        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Checkbox
                name="popular"
                checked={formData.popular}
                onChange={handleChange}
                sx={{
                  color: "gray",
                  "&.Mui-checked": {
                    color: "lightBlue",
                  },
                }}
              />
            }
            label="Popular"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <CustomButton
            type="submit"
            fullWidth
            sx={{
              bgcolor: "#76c7c0",
              color: "white",
              "&:hover": { bgcolor: "#5fa59e" },
            }}
          >
            Submit
          </CustomButton>
          <Typography color="green" variant="h6" pt={2}>
            {sentMessage}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddItem;
