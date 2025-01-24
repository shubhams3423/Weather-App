import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useStore } from "../StoreProvider";

const Temperature = ({ forecast, history, searchedCityWeather }) => {
  const { weatherDetails } = useStore();
  return (
    <View style={styles.wrapper}>
      <View style={styles.temperatureWrapper}>
        <Text
          style={[
            forecast && styles.forecastTemperatureText,
            history && styles.historyTemperatureText,
          ]}
        >
          {forecast && weatherDetails?.current?.temp_c}
          {history && searchedCityWeather?.current?.temp_c}
        </Text>
        <Text
          style={[
            forecast && styles.forecastDegreeIcon,
            history && styles.historyDegreeIcon,
          ]}
        >
          &#x2da;
        </Text>
      </View>
      <Text
        style={[
          forecast && styles.forecastTempSubtitle,
          history && styles.historyTempSubtitle,
        ]}
        numberOfLines={2}
      >
        {history && searchedCityWeather?.current?.condition?.text}
        {forecast && weatherDetails?.current?.condition?.text}
      </Text>
    </View>
  );
};

export default Temperature;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  temperatureWrapper: {
    display: "flex",
    flexDirection: "row",
  },

  forecastTemperatureText: {
    fontSize: 79.96,
    fontWeight: 800,
    lineHeight: 109.22,
    color: "#FFFFFF",
    fontFamily: "NunitoExtraBold",
  },
  historyTemperatureText: {
    fontSize: 20,
    fontWeight: 800,
    lineHeight: 50.22,
    color: "#FFFFFF",
    fontFamily: "NunitoExtraBold",
  },
  forecastDegreeIcon: {
    color: "white",
    fontSize: 80,
    fontWeight: 800,
  },
  historyDegreeIcon: {
    color: "white",
    fontSize: 35,
    fontWeight: 800,
    opacity: 0.8,
  },
  historyTempSubtitle: {
    color: "#B9B9B9",
    fontSize: 15.99,
    fontWeight: 500,
    lineHeight: 15.3,
    marginRight: 10,
    opacity: 0.7,
    
  },
  forecastTempSubtitle: {
    color: "#B9B9B9",
    fontSize: 19.99,
    fontWeight: 500,
    lineHeight: 27.3,
    marginRight: 10,
    textAlign: "center",
  },
});
