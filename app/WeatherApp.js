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
import * as Sentry from "@sentry/react-native";
Sentry.init({
  dsn: "https://782e1373219678e96182b4cbb3858727@o4508705222033408.ingest.us.sentry.io/4508705226817536",
  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
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
  } = useStore();
  const defaultAPIKey = process.env.EXPO_PUBLIC_API_KEY;
  const [userAPIKey, setUserAPIKey] = useState("");
  const [userDefaultAPIKey, setUserDefaultAPIKey] = useState("");
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
      return `https://api.weatherapi.com/v1/forecast.json?key=${userDefaultAPIKey}`;
    }
    return `https://api.weatherapi.com/v1/forecast.json?key=${defaultAPIKey}`;
  };

  const handleAPIURLs = (url) => {
    const baseURL = handleBaseURL();
    switch (url) {
      case "coordsURL":
        setFetchURL(
          `${baseURL}&q=${latitude},${longitude}&days=1&aqi=yes&alerts=no&timestamp=${timestamp}`
        );
        break;
      case "searchURL":
        setFetchURL(`${baseURL}&q=${searchText}&days=1&aqi=yes&alerts=no`);
        break;
      case "updatedURL":
        setFetchURL(
          `${baseURL}&q=${cityNameRef.current}&days=1&aqi=yes&alerts=no&timestamp=${timestamp}`
        );
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

  const handleSetSentryExceptionMessage = (res) => {
    Sentry.captureException(
      new Error(`API Error: ${res.status} - ${res.statusText}`),
      (scope) => {
        scope.setExtras({
          url: res?.url,
          status: res.status,
          statusText: res.statusText,
          api_key_last_four: defaultAPIKey
            ? defaultAPIKey.slice(-10)
            : "Not provided",
        });
        return scope;
      }
    );
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
          if (userAPIKey !== "") {
            storeUserAPIKey();
          }
          setSearchText("");
        } else {
          setUserAPIKey("");
          setUserDefaultAPIKey("");
          switch (res.status) {
            case 400:
              setIsLocationFound(false);
              handleSetSentryExceptionMessage(res);
              break;
            case 401:
              setAPIError("API key is invalid or expired");
              handleSetSentryExceptionMessage(res);
              setShowAPIModal(true);
              break;
            case 429:
              setAPIError("Rate limit exceeded. Try again later");
              handleSetSentryExceptionMessage(res);
              setShowAPIModal(true);
              break;
            case 403:
              setAPIError("Access forbidden. Check your API key permissions");
              handleSetSentryExceptionMessage(res);
              setShowAPIModal(true);
              break;
            default:
              throw new Error(`Unexpected error: ${response.status}`);
          }
        }
      } catch (error) {
        Sentry.captureException(error, (scope) => {
          scope.setExtras({
            url: fetchURL,
          });
          return scope;
        });
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
