import LeftImage from "../components/about/LeftImage";
import RightDescription from "../components/about/RightDescription";
import { Stack } from "@mui/material";
import Section from "../container/Section";

const About = () => {
  return (
    <Section>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        gap="5rem"
      >
        <LeftImage />
        <RightDescription />
      </Stack>
    </Section>
  );
};

export default About;
