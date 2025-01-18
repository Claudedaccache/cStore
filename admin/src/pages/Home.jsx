/* eslint-disable react/prop-types */

import TabProvider from "../context/tabContext";
import HomeContainer from "../containers/HomeContainer";

export default function Home({ token, setToken }) {
  return (
    <TabProvider token={token} setToken={setToken}>
      <HomeContainer />
    </TabProvider>
  );
}
