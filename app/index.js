import React from "react";
import WeatherApp from "./WeatherApp";
import { StoreProvider } from "../StoreProvider";
const index = () => {
  return (
    <StoreProvider>
      <WeatherApp />
    </StoreProvider>
  );
};

export default index;
