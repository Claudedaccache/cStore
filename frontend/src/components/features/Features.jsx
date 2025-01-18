import { Stack, Typography, useTheme } from "@mui/material";
import TitleContent from "../../container/titleContent";
import Grid from "@mui/material/Grid2";
import { featureData } from "../../data/StaticData";

const Features = () => {
  const theme = useTheme();
  return (
    <TitleContent title={"Our features"}>
      <Grid
        container
        spacing={3}
        sx={{
          p: "1.5rem",
          backgroundColor: theme.palette.gray[10],
          borderRadius: "20px",
        }}
      >
        {featureData.map(({ icon, title, description }) => {
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={title}>
              <Stack>
                {icon}
                <Typography sx={{ fontWeight: "700", p: "5px 0 " }}>
                  {title}
                </Typography>
                <Typography sx={{ color: theme.palette.gray[20] }}>
                  {description}
                </Typography>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </TitleContent>
  );
};

export default Features;
