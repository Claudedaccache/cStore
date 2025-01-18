/* eslint-disable react/prop-types */
import { textUnderline } from "../mui/customCss";
import Section from "../container/Section";
import { Stack, Typography, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const TitleContent = ({ title, children, idRef, titlePosition = "center" }) => {
  const theme = useTheme();
  const textRef = useRef(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      setUnderlineWidth(textWidth * 0.7);
    }
  }, []);

  return (
    <Section idRef={idRef}>
      <Stack alignItems={titlePosition} justifyContent="center" pb="2rem">
        <Typography
          ref={textRef}
          variant="h4"
          color={theme.palette.secondary.main}
          fontWeight="700"
          sx={textUnderline(underlineWidth)}
        >
          {title}
        </Typography>
      </Stack>
      {children}
    </Section>
  );
};

export default TitleContent;
