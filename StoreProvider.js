import { createContext, useContext, useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
const WeatherContext = createContext();

const StoreProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [weatherDetails, setWeatherDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const randomCityNamesArr = [
    "New Mumbai",
    "New York City",
    "Pune",
    "Paris",
    "Sydney ",
    "London",
  ];
  const getRandomCityName = () => {
    const randomNum = Math.floor(Math.random() * 6);
    return randomCityNamesArr[randomNum];
  };

  const getUserLocation = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setSearchText(getRandomCityName());
        return;
      }
      try {
        const userLocation = await Location.getCurrentPositionAsync({});
        if (userLocation) {
          setLocation(userLocation);
        }
      } catch (error) {
        Alert.alert("Turn on the location to get the current weather.");
        setSearchText(getRandomCityName());
      }
    } catch (error) {
      if (error.includes("Network Error")) {
        Alert.alert("Please check your internet connection");
        return;
      }
      setSearchText(getRandomCityName());
    }
  };

  return (
    <WeatherContext.Provider
      value={{
        searchText,
        setSearchText,
        location,
        setLocation,
        showModal,
        setShowModal,
        getUserLocation,
        weatherDetails,
        setWeatherDetails,
        isLoading,
        setIsLoading,
        isAnimating,
        setIsAnimating,
        getRandomCityName,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useStore = () => useContext(WeatherContext);

export { StoreProvider, useStore };
