import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import WeatherTabs from "../components/WeatherTabs";
import AppHeader from "../components/AppHeader";
import backgroundImg from "../assets/images/background_img.png";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../StoreProvider";
import UserOffline from "../components/UserOffline";
import APIModal from "../components/APIModal";
import LocationNotFound from "../components/LocationNotFound";
const WeatherApp = () => {
  const {
    getUserLocation,
    location,
    searchText,
    weatherDetails,
    setWeatherDetails,
    setSearchText,
    isLoading,
    setIsLoading,
    isAnimating,
    setIsAnimating,
    isUserOffline,
    setIsUserOffline,
    handleInternetConnection,
    baseURL,
    defaultAPIKey,
    searchedHistory,
    setSearchedHistory,
    storeSearchedHistoryData,
  } = useStore();

  const [userAPIKey, setUserAPIKey] = useState("");
  const [userDefaultAPIKey, setUserDefaultAPIKey] = useState("");
  const clearStorage = async () => {
    console.log("cleared");
    try {
      await AsyncStorage.removeItem("searchedHistory");
    } catch (error) {
      console.log(error);
    }
  };
  // clearStorage();

  const [fetchURL, setFetchURL] = useState("");
  const [isLocationFound, setIsLocationFound] = useState(true);
  const { longitude, latitude } = location?.coords ?? {
    longitude: "",
    latitude: "",
  };
  const getUserAPIKey = async () => {
    try {
      const userKey = await AsyncStorage.getItem("user-key");
      if (userKey !== null) {
        setUserDefaultAPIKey(userKey);
      }
    } catch (error) {
      Alert.alert(error);
    }
  };
  const handleBaseURL = () => {
    if (userDefaultAPIKey !== "") {
      return `${baseURL}?key=${userDefaultAPIKey}&days=1&aqi=yes&alerts=no`;
    }
    return `${baseURL}?key=${defaultAPIKey}&days=1&aqi=yes&alerts=no`;
  };

  const handleAPIURLs = (url) => {
    const getDataURL = handleBaseURL();
    switch (url) {
      case "coordsURL":
        setFetchURL(
          `${getDataURL}&q=${latitude},${longitude}&timestamp=${timestamp}`
        );
        break;
      case "searchURL":
        setFetchURL(`${getDataURL}&q=${searchText}`);
        break;
      case "updatedURL":
        setFetchURL(
          `${getDataURL}&q=${cityNameRef.current}&timestamp=${timestamp}`
        );
    }
  };

  const handleSearchedHistory = (weatherData) => {
    const city = weatherData?.location?.name;
    const isSearched = Object.keys(searchedHistory).includes(city);
    if (isSearched) {
      const copySearchedObj = { ...searchedHistory };
      copySearchedObj[city]["data"] = weatherData;
      setSearchedHistory(copySearchedObj);
      storeSearchedHistoryData(copySearchedObj); // store data in storage
    } else {
      const copySearchedObj = { ...searchedHistory };
      const updatedSearchedObj = {
        ...copySearchedObj,
        [city]: { isPinned: false, data: weatherData },
      };
      setSearchedHistory(updatedSearchedObj);
      storeSearchedHistoryData(updatedSearchedObj); // store data in storage
    }
  };
  const getSearchedLocationWeather = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  const handleExecuteAPIs = async (searchULRs, storedData, searchedCities) => {
    const res = await Promise.allSettled(
      searchULRs.map((url) => getSearchedLocationWeather(url))
    );
    const resultArr = res.map((data) => data.value);
    const copyObj = { ...storedData };
    searchedCities.forEach(
      (city, key) => (copyObj[city]["data"] = resultArr[key])
    );
    setSearchedHistory(copyObj);
    setIsLoading(false);
  };

  const handleFetchedSearchedCityWeather = (data) => {
    const searchedCities = Object.keys(data);
    const searchULRs = searchedCities.map(
      (city) =>
        `${baseURL}?key=${defaultAPIKey}&q=${city}&days=1&aqi=yes&alerts=no`
    );
    handleExecuteAPIs(searchULRs, data, searchedCities);
  };

  const getSearchedHistoryData = async () => {
    try {
      const res = await AsyncStorage.getItem("searchedHistory");
      const data = JSON.parse(res);
      if (data) {
        setSearchedHistory(data);
        handleFetchedSearchedCityWeather(data);
      } else {
        console.log("empty");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [APIError, setAPIError] = useState("");
  const [showAPIModal, setShowAPIModal] = useState(false);
  const timeToRecallAPI = 5 * 60 * 1000;
  const [intervalId, setIntervalId] = useState(0);
  const cityNameRef = useRef(""); // saved the city name to call api after 5 mins.
  const timestamp = Date.now();

  const storeUserAPIKey = async () => {
    try {
      await AsyncStorage.setItem("user-key", userAPIKey);
    } catch (error) {
      Alert.alert(error);
    }
  };

  const intervalCallback = () => {
    handleAPIURLs("updatedURL");
    setIsAnimating(true);
  };

  const handleAPITimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const id = setInterval(intervalCallback, timeToRecallAPI);
    setIntervalId(id);
  };

  const getWeatherDetails = async () => {
    if (!isAnimating) {
      setIsLoading(true);
    }
    const networkStatus = await handleInternetConnection();
    setIsUserOffline(!networkStatus);
    if (networkStatus) {
      handleAPITimer();
      try {
        const res = await fetch(fetchURL);
        const data = await res.json();
        if (res.status === 200) {
          setWeatherDetails(data);
          if (searchText !== "") {
            handleSearchedHistory(data);
          }
          if (userAPIKey !== "") {
            storeUserAPIKey();
          }
          setSearchText("");
        } else {
          setUserAPIKey("");
          setUserDefaultAPIKey("");
          switch (res.status) {
            case 400:
              // Alert.alert(
              //   "Location Not Found",
              //   "Please enter a valid location."
              // );
              setIsLocationFound(false);
              break;
            case 401:
              setAPIError("API key is invalid or expired");
              setShowAPIModal(true);
              break;
            case 429:
              setAPIError("Rate limit exceeded. Try again later");
              setShowAPIModal(true);
              break;
            case 403:
              setAPIError("Access forbidden. Check your API key permissions");
              setShowAPIModal(true);
              break;
            default:
              throw new Error(`Unexpected error: ${response.status}`);
          }
        }
      } catch (error) {
        Alert.alert(error);
      }
      setIsLoading(false);
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (Object?.keys(location).length > 0) {
      handleAPIURLs("coordsURL");
      getSearchedHistoryData();
    } else {
      getUserLocation();
      getUserAPIKey(); // "Check if the user already has a stored API key or not.
    }
  }, [location]);

  useEffect(() => {
    if (searchText.trim() !== "") {
      handleAPIURLs("searchURL");
    }
  }, [searchText]);

  useEffect(() => {
    if (Object?.keys(location).length > 0 || searchText !== "") {
      getWeatherDetails();
    }
  }, [fetchURL]);

  useEffect(() => {
    if (Object.keys(weatherDetails).length > 0) {
      cityNameRef.current = weatherDetails?.location?.name;
    }
  }, [weatherDetails]);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#000000");
  }, []);

  useEffect(() => {
    if (userAPIKey.length > 0) {
      setUserDefaultAPIKey(userAPIKey);
    }
  }, [userAPIKey]);

  useEffect(() => {
    handleAPIURLs("coordsURL");
  }, [userDefaultAPIKey]);

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.scrollWrapper}>
        <ImageBackground
          resizeMode="cover"
          style={[styles.backgroundWrapper, isLoading && styles.loaderOpacity]}
          source={backgroundImg}
        >
          <LinearGradient
            style={styles.linearGradient}
            start={{ x: 1, y: 0 }}
            end={{ x: 0.5, y: 0.5 }}
            colors={[
              "rgba(8, 200, 253, 0.5)",
              "rgba(8, 200, 253, 0.38)",
              "rgba(8, 200, 253, 0.19)",
              "transparent",
            ]}
            locations={[0.22, 0.3, 0.5, 0.9]}
          />
          {showAPIModal ? (
            <APIModal
              setShowAPIModal={setShowAPIModal}
              APIError={APIError}
              getWeatherDetails={getWeatherDetails}
              setUserAPIKey={setUserAPIKey}
            />
          ) : isUserOffline ? (
            <UserOffline
              getWeatherDetails={getWeatherDetails}
              handleAPIURLs={handleAPIURLs}
            />
          ) : isLoading ? (
            <ActivityIndicator style={styles.loader} size={50} color="white" />
          ) : !isLocationFound ? (
            <LocationNotFound setIsLocationFound={setIsLocationFound} />
          ) : (
            <View style={styles.wrapper}>
              <AppHeader weatherDetails={weatherDetails} />
              <WeatherTabs weatherDetails={weatherDetails} />
            </View>
          )}
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherApp;
const styles = StyleSheet.create({
  backgroundWrapper: {
    flex: 1,
    paddingTop: 25,
    paddingRight: 25,
    paddingLeft: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080A2F",
  },
  scrollWrapper: { flexGrow: 1 },
  loaderOpacity: {
    opacity: 0.8,
  },
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  safeView: {
    flex: 1,
  },
  linearGradient: {
    position: "absolute",
    width: "130%",
    height: "70%",
    top: -10,
    right: -10,
  },
  wrapper: {
    flex: 1,
  },
});
