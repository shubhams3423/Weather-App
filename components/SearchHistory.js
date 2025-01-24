import { View, StyleSheet, Text } from "react-native";
import React from "react";
import Temperature from "./Temperature";
import WeatherIcon from "./WeatherIcon";
import { useStore } from "../StoreProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const SearchHistory = ({ id, searchedCityWeather }) => {
  const { setSearchedHistory, searchedHistory, storeSearchedHistoryData } =
    useStore();
  const city = searchedCityWeather?.data?.location?.name;
  const handleLocationPin = (isPinned, cityName) => {
    const copySearchedObj = { ...searchedHistory };
    copySearchedObj[cityName]["isPinned"] = isPinned;
    setSearchedHistory(copySearchedObj);
    storeSearchedHistoryData(copySearchedObj);
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.wrapper,
          id % 2 !== 0 ? styles.marginTop : styles.marginBottom,
        ]}
      >
        <View style={styles.weatherInfo}>
          <Temperature
            history
            searchedCityWeather={searchedCityWeather?.data}
          />
          <View style={{ flexDirection: "column" }}>
            {!searchedCityWeather?.isPinned ? (
              <MaterialCommunityIcons
                name="pin-off"
                size={18}
                style={styles.pinIcon}
                onPress={() => handleLocationPin(true, city)}
                color="gray"
              />
            ) : (
              <MaterialCommunityIcons
                size={18}
                name="pin"
                style={styles.pinIcon}
                onPress={() => handleLocationPin(false, city)}
                color="gray"
              />
            )}
            <WeatherIcon
              history
              searchedCityWeather={searchedCityWeather?.data}
            />
          </View>
        </View>
        <Text style={styles.cityName}>{city}</Text>
      </View>
    </View>
  );
};

export default SearchHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // aspectRatio: 1.4,
    // backgroundColor: "red",
    height: "auto",
  },
  wrapper: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    borderWidth: 1.4,
    borderColor: "rgba(135, 135, 135, 0.2)",
    height: "auto",
  },
  weatherInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cityName: {
    color: "white",
    fontWeight: 400,
    fontSize: 18,
    marginTop: 15,
    opacity: 0.8,
  },
  pinIcon: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  marginTop: {
    marginTop: 20,
  },
  marginBottom: {
    marginBottom: 20,
  },
});
