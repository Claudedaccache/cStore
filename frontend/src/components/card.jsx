/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Box, Stack, useTheme } from "@mui/material";
import CustomButton from "../container/Button";
import { useNavigate } from "react-router-dom";
import ClampedText from "../helpers/ClampedText";
import defaultPic from "../assets/default.jfif";
import LazyImage from "../helpers/LazyImage";

export default function Product({
  _id,
  name,
  category,
  description,
  price,
  soldedPrice,
  onSolde,
  image,
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  const currency = import.meta.env.VITE_CURRENCY || "€";

  return (
    <Card
      id={_id}
      onClick={() => {
        navigate(`/products/${_id}`);
      }}
      sx={{ borderRadius: " 12px 12px 0 0" }}
    >
      <CardActionArea>
        <LazyImage
          src={image ? image[0] : defaultPic}
          alt={name}
          height={250}
          imgStyle={{ objectFit: "fill", borderRadius: " 12px 12px 0 0" }}
        />
        <CardContent sx={{ pb: 0 }}>
          <ClampedText
            text={name}
            lines={1}
            textAttr={{
              variant: "h5",
              component: "div",
            }}
          />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            padding="0.5rem 0 "
          >
            <Typography>{category}</Typography>
            <Stack direction="row" gap="0.5rem">
              {onSolde && (
                <Typography
                  color={theme.palette.secondary.main}
                  fontWeight="700"
                >
                  {currency}
                  {soldedPrice}
                </Typography>
              )}
              <Typography
                sx={{ ...(onSolde && { textDecoration: "line-through" }) }}
              >
                {currency}
                {price}
              </Typography>
            </Stack>
          </Stack>
          <ClampedText
            text={description}
            lines={3}
            textSx={{ minHeight: "72px" }}
          />
        </CardContent>
        <Box p={1}>
          <CustomButton variant="text" color="alert" size="small">
            Show More
          </CustomButton>
        </Box>
      </CardActionArea>
    </Card>
  );
}
