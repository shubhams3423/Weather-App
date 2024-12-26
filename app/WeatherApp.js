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
import * as NavigationBar from "expo-navigation-bar";
import WeatherTabs from "../components/WeatherTabs";
import AppHeader from "../components/AppHeader";
import backgroundImg from "../assets/images/backgroundImg.jpeg";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../StoreProvider";

const WeatherApp = () => {
  const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;
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
    getRandomCityName,
  } = useStore();

  const timestamp = Date.now();
  const { longitude, latitude } = location?.coords ?? {
    longitude: "",
    latitude: "",
  };
  const coordsURL = `${baseUrl}&q=${latitude},${longitude}&days=1&aqi=yes&alerts=no&timestamp=${timestamp}`;
  const searchURL = `${baseUrl}&q=${searchText}&days=1&aqi=yes&alerts=no`;
  const [fetchURL, setFetchURL] = useState(coordsURL);
  const timeToRecallAPI = 5 * 60 * 1000;
  const [intervalId, setIntervalId] = useState(0);
  const cityNameRef = useRef(""); // saved the city name to call api after 10 min.
  const intervalCallback = () => {
    const updateWeatherDataURL = `${baseUrl}&q=${cityNameRef.current}&days=1&aqi=yes&alerts=no&timestamp=${timestamp}`;
    setFetchURL(updateWeatherDataURL);
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
    handleAPITimer();
    try {
      const res = await fetch(fetchURL);
      const data = await res.json();
      if (res.ok) {
        setWeatherDetails(data);
        setSearchText("");
      } else {
        Alert.alert(data?.error?.message);
        if (cityNameRef.current == "") {
          setSearchText(getRandomCityName()); // only when there is not any previous location.
        }
      }
    } catch (error) {
      Alert.alert(error);
    }
    setIsLoading(false);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  useEffect(() => {
    if (Object?.keys(location).length > 0) {
      setFetchURL(coordsURL);
    } else {
      getUserLocation();
    }
  }, [location]);

  useEffect(() => {
    if (searchText.trim() !== "") {
      setFetchURL(searchURL);
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

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
          {isLoading ? (
            <ActivityIndicator style={styles.loader} size={50} color="white" />
          ) : (
            <View style={{ flex: 1 }}>
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
});
