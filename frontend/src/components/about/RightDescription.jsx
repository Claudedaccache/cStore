import { Stack, Typography, useTheme } from "@mui/material";

const RightDescription = () => {
  const theme = useTheme();
  return (
    <Stack>
      <Typography variant="h3" pb="15px" color={theme.palette.secondary.main}>
        Unveiling Our Journey
      </Typography>
      <Typography pb="15px" fontWeight="700" variant="h2">
        Our Commitment to Crafting Individualized Fashion Experiences
      </Typography>
      <Typography pb="15px">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum illo quo
        consectetur qui modi dolorum eius, recusandae minus voluptatibus omnis!
      </Typography>
      <Stack direction="row" gap="1rem" flexWrap="wrap">
        <Stack
          flex={1}
          bgcolor={theme.palette.gray[10]}
          p="15px"
          borderRadius="16px"
        >
          <Typography
            fontSize="1.1rem"
            pb="5px"
            color={theme.palette.secondary.main}
          >
            99k+
          </Typography>
          <Typography fontSize="12px">Satisfied Customers</Typography>
        </Stack>
        <Stack
          flex={1}
          bgcolor={theme.palette.gray[10]}
          p="15px"
          borderRadius="16px"
        >
          <Typography
            fontSize="1.1rem"
            pb="5px"
            color={theme.palette.secondary.main}
          >
            12k+
          </Typography>
          <Typography fontSize="12px">Exclusive Products</Typography>
        </Stack>
        <Stack
          flex={1}
          bgcolor={theme.palette.gray[10]}
          p="15px"
          borderRadius="16px"
        >
          <Typography
            fontSize="1.1rem"
            pb="5px"
            color={theme.palette.secondary.main}
          >
            5k+
          </Typography>
          <Typography fontSize="12px">New Products</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RightDescription;
