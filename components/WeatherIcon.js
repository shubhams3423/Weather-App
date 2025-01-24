import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { getWeatherIcon } from "../weatherIcons";
import { useStore } from "../StoreProvider";
const WeatherIcon = ({ forecast, history, searchedCityWeather }) => {
  const { weatherDetails } = useStore();
  const handleInputData = () => {
    if (forecast) {
      return weatherDetails;
    }
    if (history) {
      return searchedCityWeather;
    }
  };
  const handleWeatherIcon = () => {
    const currentData = handleInputData();
    const isDay = currentData.current?.is_day ? "day" : "night";
    const code = currentData.current?.condition?.code;
    if (getWeatherIcon(isDay, code)) {
      return getWeatherIcon(isDay, code);
    } else {
      return {
        uri: `https:${currentData?.current?.condition?.icon}`,
      };
    }
  };
  return (
    <View
      style={[
        forecast && styles.foreCastIconWrapper,
        history && styles.historyIconWrapper,
      ]}
    >
      <Image
        resizeMode="contain"
        source={handleWeatherIcon()}
        style={styles.cloudIcon}
      />
    </View>
  );
};

export default WeatherIcon;

const styles = StyleSheet.create({
  foreCastIconWrapper: {
    width: 237,
    height: 247,
    overflow: "hidden",
    marginBottom: 25.98,
  },
  historyIconWrapper: {
    marginTop: "auto",
    width: 50,
    height: 50,
    overflow: "hidden",
  },
  cloudIcon: {
    height: "100%",
    width: "100%",
  },
});
