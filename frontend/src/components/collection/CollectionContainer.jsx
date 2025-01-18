import { Stack } from "@mui/material";
import CollectionProductList from "./CollectionProductList";
import Section from "../../container/Section";
import CollectionRightSide from "../collectionRightSide/CollectionRightSide";

const CollectionContainer = () => {
  return (
    <Section marginTop="1rem">
      <Stack direction={{ sx: "column", md: "row" }} minHeight="100vh">
        <CollectionRightSide />
        <Stack flex={2}>
          <CollectionProductList />
        </Stack>
      </Stack>
    </Section>
  );
};

export default CollectionContainer;
