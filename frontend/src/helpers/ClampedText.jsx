/* eslint-disable react/prop-types */

import { Typography } from "@mui/material";

const ClampedText = ({ text, lines = 3, lineHeight, textSx, textAttr }) => {
  const clampStyle = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: lines,
    lineHeight: `${lineHeight}px`,
    maxHeight: `${lines * lineHeight}px`,
    ...textSx,
  };

  return (
    <Typography style={clampStyle} {...textAttr}>
      {text}
    </Typography>
  );
};

export default ClampedText;
