/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import defaultPic from "../assets/default.jfif";

const LazyImage = ({
  src = defaultPic,
  alt,
  width = "100%",
  height = "100%",
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  return (
    <Box>
      {!loaded && (
        <Skeleton variant="rectangular" width={width} height={height} />
      )}
      {loaded && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={props.imgStyle}
        />
      )}
    </Box>
  );
};

export default LazyImage;
