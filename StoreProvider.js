import { createContext, useContext, useState } from "react";
import * as Location from "expo-location";
import * as Network from "expo-network";
import { Alert } from "react-native";
const WeatherContext = createContext();

const StoreProvider = ({ children }) => {
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [weatherDetails, setWeatherDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isUserOffline, setIsUserOffline] = useState(false);
  const [netWorkError, setNetworkError] = useState("");
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
  const handleInternetConnection = async () => {
    try {
      const networkStatus = await Network.getNetworkStateAsync();
      if (!networkStatus.isConnected) {
        setNetworkError("No network connection available.");
        return false;
      }
      try {
        const response = await fetch("https://www.google.com", {
          method: "HEAD",
          cache: "no-cache",
        }); // Able to make any api call or not using available network.
        if (response.ok) {
          return true;
        } else {
          setNetworkError(
            "Internet is not reachable. Please check your connection."
          );
          return false;
        }
      } catch (error) {
        setNetworkError(
          "Internet is not reachable. Please check your connection."
        );
        return false;
      }
    } catch (error) {
      setNetworkError(
        "An error occurred while checking the network. Try Again"
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getUserLocation = async () => {
    const networkStatus = await handleInternetConnection();
    setIsUserOffline(!networkStatus);
    if (networkStatus) {
      try {
        setIsLoading(true);
        const { status } = await Location.requestForegroundPermissionsAsync();
        switch (status) {
          case "granted":
            try {
              const userLocation = await Location.getCurrentPositionAsync({});
              if (userLocation) {
                setLocation(userLocation);
              }
            } catch (error) {
              Alert.alert(
                "Enable Location",
                "Turn on the location to get the current weather."
              );
              setSearchText(getRandomCityName());
            }
            break;
          case "restricted":
            Alert.alert(
              "Location Services Restricted",
              "Access to location is restricted. Please check your device settings ."
            );
            setSearchText(getRandomCityName());
            break;
          case "denied":
            Alert.alert(
              "Location Permission Denied",
              "Please allow the app to access your location in your device settings."
            );
            setSearchText(getRandomCityName());
            break;
          case "disabled":
            Alert.alert(
              "Location Services Disabled",
              "Location services are turned off. Please enable them in your device settings to continue."
            );
            setSearchText(getRandomCityName());
            break;
          default:
            setSearchText(getRandomCityName());
        }
      } catch (error) {
        if (error.includes("Network Error")) {
          Alert.alert("Network Error", "Please check your internet connection");
          return;
        }
        setSearchText(getRandomCityName());
      }
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
        isUserOffline,
        setIsUserOffline,
        handleInternetConnection,
        netWorkError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

const useStore = () => useContext(WeatherContext);

export { StoreProvider, useStore };
