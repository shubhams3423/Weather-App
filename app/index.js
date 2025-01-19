import React, { useState } from "react";
import WeatherApp from "./WeatherApp";
import { StoreProvider } from "../StoreProvider";
import SplashScreen from "../components/AppSplash";

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  return (
    <StoreProvider>
      {isSplashVisible ? (
        <SplashScreen onFinish={() => setIsSplashVisible(false)} />
      ) : (
        <WeatherApp />
      )}
    </StoreProvider>
  );
};

export default App;
