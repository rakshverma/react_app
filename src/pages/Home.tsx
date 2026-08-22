import React, { useEffect } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import HomeView from "../components/Home/HomeView";
function Home() {
  //const { location, address, error } = useGeoLocation();

  return (
    <>
      <HomeView />
    </>
  );
}

export default Home;
